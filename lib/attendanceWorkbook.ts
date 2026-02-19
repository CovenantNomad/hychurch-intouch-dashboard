import dayjs, {Dayjs} from "dayjs";
import * as XLSX from "xlsx-js-style";
import {UserGrade} from "../graphql/generated";
import {
  AttendanceCell,
  AttendanceHistoryForPrint,
  CheongSheetData,
  PersonWithHistories,
} from "../interface/attendance";
import {getSundaysOfMonthContainingMostRecentSunday} from "../utils/dateUtils";

type ServiceId = "1" | "2" | "3" | "4" | "5"; // 7:10, 8:00, 9:30, 11:30, 청년예배
type Mode = "OFFLINE" | "ONLINE";
type DayAttendance = Partial<Record<ServiceId, Mode>>;
type DayByService = Partial<Record<ServiceId, Mode>>;
type Stats = Record<
  string, // day YYYY-MM-DD
  Partial<Record<ServiceId, {OFFLINE: number; ONLINE: number}>>
>;
type RGB = {r: number; g: number; b: number};

/**
 * 기호 규칙:
 * - 청년예배(5): offline "/" , online "○"
 * - 11:30(4): offline "11", online "⑪"
 * - 9:30(3): offline "9", online "⑨"
 **/

const GLYPH_BY_SERVICE: Partial<Record<ServiceId, Record<Mode, string>>> = {
  "1": {OFFLINE: "7", ONLINE: "⑦"},
  "2": {OFFLINE: "8", ONLINE: "⑧"},
  "3": {OFFLINE: "9", ONLINE: "⑨"},
  "4": {OFFLINE: "11", ONLINE: "⑪"},
  "5": {OFFLINE: "/", ONLINE: "〇"},
};

/** ====== Util ====== **/

function modeOf(isOnline: boolean): Mode {
  return isOnline ? "ONLINE" : "OFFLINE";
}

function normalizeDateOnly(attendedAt: string): string {
  // ISO든 YYYY-MM-DD든 앞 10자리로 날짜 통일
  return String(attendedAt).slice(0, 10);
}

function buildDayAttendance(
  histories: AttendanceHistoryForPrint[],
  day: string,
): DayAttendance {
  const byService: DayAttendance = {};

  for (const h of histories) {
    const d = normalizeDateOnly(h.attendedAt);
    if (d !== day) continue;

    const sid = String(h.churchService.id) as ServiceId;

    // 관심 서비스(3,4,5)만 처리 (7:10/8:00은 현재 출력 규칙 없어서 스킵)
    if (!GLYPH_BY_SERVICE[sid]) continue;

    const m = modeOf(h.isOnline);

    // OFFLINE이 ONLINE보다 우선
    const prev = byService[sid];
    if (!prev) {
      byService[sid] = m;
    } else if (prev === "ONLINE" && m === "OFFLINE") {
      byService[sid] = "OFFLINE";
    }
  }

  return byService;
}

function renderDayCell(byService: DayAttendance): string {
  const parts: string[] = [];

  // 9:30(3), 11:30(4) 먼저
  (["1", "2", "3", "4"] as const).forEach((sid) => {
    const mode = byService[sid];
    if (!mode) return;
    parts.push(GLYPH_BY_SERVICE[sid]![mode]);
  });

  // 청년예배(5)는 마지막
  const youth = byService["5"];
  if (youth) parts.push(GLYPH_BY_SERVICE["5"]![youth]);

  return parts.join(" ");
}

function initStatCell(): {OFFLINE: number; ONLINE: number} {
  return {OFFLINE: 0, ONLINE: 0};
}

/** 같은 날짜/같은 예배가 여러 개면 OFFLINE 우선으로 1개만 남김 */
function buildDayByService(
  histories: AttendanceHistoryForPrint[],
  day: string,
): DayByService {
  const by: DayByService = {};

  for (const h of histories) {
    const d = normalizeDateOnly(h.attendedAt);
    if (d !== day) continue;

    const sid = String(h.churchService.id) as ServiceId;
    if (!["1", "2", "3", "4", "5"].includes(sid)) continue;

    const m = modeOf(h.isOnline);
    const prev = by[sid];

    if (!prev) by[sid] = m;
    else if (prev === "ONLINE" && m === "OFFLINE") by[sid] = "OFFLINE";
  }

  return by;
}

/** 시트 전체(리더+멤버) 출석을 날짜별/서비스별/모드별로 집계 */
function buildSheetStats(params: {
  sheetData: any; // CheongSheetData
  sundayDates: string[];
}): Stats {
  const {sheetData, sundayDates} = params;

  const stats: Stats = {};
  for (const day of sundayDates) stats[day] = {};

  const people: PersonWithHistories[] = [];
  for (const cell of sheetData.cells) {
    people.push(cell.leader);
    for (const m of cell.members) people.push(m);
  }

  for (const day of sundayDates) {
    for (const p of people) {
      const by = buildDayByService(p.histories ?? [], day);
      (Object.keys(by) as ServiceId[]).forEach((sid) => {
        const mode = by[sid]!;
        stats[day][sid] = stats[day][sid] ?? initStatCell();
        stats[day][sid]![mode] += 1;
      });
    }
  }

  return stats;
}

function addStat(dst: Stats, src: Stats) {
  for (const day of Object.keys(src)) {
    dst[day] = dst[day] ?? {};
    const sDay = src[day] ?? {};
    for (const sid of Object.keys(sDay) as ServiceId[]) {
      dst[day][sid] = dst[day][sid] ?? initStatCell();
      dst[day][sid]!.OFFLINE += sDay[sid]?.OFFLINE ?? 0;
      dst[day][sid]!.ONLINE += sDay[sid]?.ONLINE ?? 0;
    }
  }
}

// 총원 시트 계산 함수
function buildAllCheongStats(params: {
  allSheets: CheongSheetData[];
  sundayDates: string[];
}): Stats {
  const {allSheets, sundayDates} = params;

  const total: Stats = {};
  for (const day of sundayDates) total[day] = {};

  for (const sheet of allSheets) {
    const s = buildSheetStats({sheetData: sheet, sundayDates}); // ✅ 기존 함수 재사용
    addStat(total, s);
  }

  return total;
}

function getCount(stats: Stats, day: string, sid: ServiceId, mode: Mode) {
  return stats[day]?.[sid]?.[mode] ?? 0;
}

// 배경색 관련 함수
function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return {r, g, b};
}

function rgbToHex({r, g, b}: RGB): string {
  const to = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

// pct=0.4 => 40% 더 밝게 (white와 40% 믹스)
function lighten(hex: string, pct: number): string {
  const c = hexToRgb(hex);
  return rgbToHex({
    r: c.r + (255 - c.r) * pct,
    g: c.g + (255 - c.g) * pct,
    b: c.b + (255 - c.b) * pct,
  });
}

// pct=0.25 => 25% 더 어둡게 (black과 25% 믹스)
function darken(hex: string, pct: number): string {
  const c = hexToRgb(hex);
  return rgbToHex({
    r: c.r * (1 - pct),
    g: c.g * (1 - pct),
    b: c.b * (1 - pct),
  });
}

function getCheongPalette(cheongNumber: number): {
  titleRgb: string;
  menuRgb: string;
} {
  // 기본값(1청 등)
  let titleRgb = "8DB4E2";
  let menuRgb = "DCE6F1";

  switch (cheongNumber) {
    case 2: {
      const base = THEME_BASE.accent4_purple;
      titleRgb = lighten(base, 0.4); // 40% 더 밝게
      menuRgb = lighten(base, 0.8); // 80% 더 밝게
      break;
    }
    case 3: {
      const base = THEME_BASE.accent2_red;
      titleRgb = lighten(base, 0.6);
      menuRgb = lighten(base, 0.8);
      break;
    }
    case 4: {
      const base = THEME_BASE.accent3_yg;
      titleRgb = lighten(base, 0.4);
      menuRgb = lighten(base, 0.8);
      break;
    }
    case 5: {
      const base = THEME_BASE.accent6_orange;
      titleRgb = lighten(base, 0.4);
      menuRgb = lighten(base, 0.8);
      break;
    }
    case 6: {
      const base = THEME_BASE.accent5_sea;
      titleRgb = lighten(base, 0.6);
      menuRgb = lighten(base, 0.8);
      break;
    }
    case 7: {
      const base = THEME_BASE.background2_tan;
      titleRgb = darken(base, 0.25);
      menuRgb = darken(base, 0.1);
      break;
    }
    case 8: {
      const base = THEME_BASE.accent3_yg;
      titleRgb = lighten(base, 0.6);
      menuRgb = lighten(base, 0.8);
      break;
    }
  }

  return {titleRgb, menuRgb};
}

/** ====== 스타일 ====== **/
const THEME_BASE = {
  // “자주, 강조4”
  accent4_purple: "8064A2",
  // “빨강, 강조2”
  accent2_red: "C0504D",
  // “황록색, 강조3”
  accent3_yg: "9BBB59",
  // “바다색, 강조5”
  accent5_sea: "4BACC6",
  // “주황, 강조6”
  accent6_orange: "F79646",
  // “황갈색, 배경2” (Office 기본 Background 2 느낌)
  background2_tan: "EEECE1",
} as const;

const borderThin = {
  top: {style: "thin", color: {rgb: "000000"}},
  bottom: {style: "thin", color: {rgb: "000000"}},
  left: {style: "thin", color: {rgb: "000000"}},
  right: {style: "thin", color: {rgb: "000000"}},
} as const;

const borderMedium = {
  top: {style: "medium", color: {rgb: "000000"}},
  bottom: {style: "medium", color: {rgb: "000000"}},
  left: {style: "medium", color: {rgb: "000000"}},
  right: {style: "medium", color: {rgb: "000000"}},
} as const;

function cloneBorder(b: any) {
  return {
    top: {...b.top},
    bottom: {...b.bottom},
    left: {...b.left},
    right: {...b.right},
  };
}

function setCell(ws: XLSX.WorkSheet, r: number, c: number, v: any, s?: any) {
  const addr = XLSX.utils.encode_cell({r, c});

  // 값이 없으면 빈 문자열
  const value = v ?? "";

  // 타입 결정
  const cell: any = {v: value};
  if (typeof value === "number") cell.t = "n";
  else cell.t = "s";

  if (s) {
    if (s.border) s.border = cloneBorder(s.border);
    cell.s = s;
  }

  ws[addr] = cell;
}

/** 묶음당 열 수 = ["#","셀","이름",일요일들...] */
function getGroupCols(headers: string[]) {
  return headers.length;
}

export function buildAttendanceHeaders(ref: Dayjs = dayjs()): string[] {
  const {sundays} = getSundaysOfMonthContainingMostRecentSunday(ref);

  const sundayLabels = sundays.map((d) => d.format("M.D"));

  return ["#", "셀", "이름", ...sundayLabels];
}

/** 시트 한 장 만들기 */
function buildCheongSheet(params: {ref: Dayjs; sheetData: CheongSheetData}) {
  const {ref, sheetData} = params;

  const {titleRgb, menuRgb} = getCheongPalette(sheetData.cheongNumber);

  const {year, month, sundays} =
    getSundaysOfMonthContainingMostRecentSunday(ref);
  const sundayDates = sundays.map((d) => d.format("YYYY-MM-DD"));
  const headers = buildAttendanceHeaders(ref);

  const groupCols = getGroupCols(headers);
  const totalCols = groupCols * 3; // 3묶음
  const lastColLetter = XLSX.utils.encode_col(totalCols - 1);

  // 워크시트 기본 객체
  const ws: XLSX.WorkSheet = {};

  /** ====== 1) 제목 (A1 ~ lastCol 1 병합) ====== */
  setCell(
    ws,
    0,
    0,
    `${year}년 성전계수 ${month}월 (${sheetData.cheongNumber}청)`,
    {
      font: {name: "210 맨발의청춘 L", sz: 48, bold: true},
      alignment: {horizontal: "center", vertical: "center"},
      fill: {patternType: "solid", fgColor: {rgb: titleRgb}},
      border: borderThin,
    },
  );

  ws["!merges"] = [XLSX.utils.decode_range(`A1:${lastColLetter}1`)];

  /** ====== 2) 헤더 3묶음(2행) ====== */
  for (let g = 0; g < 3; g++) {
    for (let i = 0; i < headers.length; i++) {
      setCell(ws, 1, g * groupCols + i, headers[i], {
        font: {name: "210 맨발의청춘 L", sz: 14, bold: true},
        alignment: {horizontal: "center", vertical: "center"},
        fill: {patternType: "solid", fgColor: {rgb: menuRgb}},
        border: borderThin,
      });
    }
  }

  const headerRow = 1;
  const leftCol = 0;
  const rightCol = totalCols - 1;

  // (중요) ws[addr].s와 ws[addr].s.border가 존재한다고 가정(헤더 셀 setCell에서 borderThin 넣었으니 존재함)
  for (let c = leftCol; c <= rightCol; c++) {
    const addr = XLSX.utils.encode_cell({r: headerRow, c});
    const cellObj = ws[addr];
    if (!cellObj) continue;

    cellObj.s = cellObj.s ?? {};
    cellObj.s.border = cellObj.s.border ?? borderThin;

    // 헤더 행의 위/아래 라인을 전부 medium으로 통일
    cellObj.s.border = cellObj.s.border
      ? cloneBorder(cellObj.s.border)
      : cloneBorder(borderThin);
    cellObj.s.border.top = borderMedium.top;
    cellObj.s.border.bottom = borderMedium.bottom;
  }

  // 양끝만 left/right를 medium으로
  {
    const leftAddr = XLSX.utils.encode_cell({r: headerRow, c: leftCol});
    const rightAddr = XLSX.utils.encode_cell({r: headerRow, c: rightCol});

    if (ws[leftAddr]) {
      ws[leftAddr].s = ws[leftAddr].s ?? {};
      ws[leftAddr].s.border = ws[leftAddr].s.border
        ? cloneBorder(ws[leftAddr].s.border)
        : cloneBorder(borderThin);

      ws[leftAddr].s.border.left = borderMedium.left;
    }

    if (ws[rightAddr]) {
      ws[rightAddr].s = ws[rightAddr].s ?? {};
      ws[rightAddr].s.border = ws[rightAddr].s.border
        ? cloneBorder(ws[rightAddr].s.border)
        : cloneBorder(borderThin);

      ws[rightAddr].s.border.right = borderMedium.right;
    }
  }

  /** ====== 3) 셀 블록 배치 (3열 그리드, 3~8개) ====== */
  const startRow = 2; // 0-index 기준: 3행이 시작이니까 r=2
  const blockGap = 0; // 블록 간 간격(원하면 0)
  let maxUsedRow = startRow;

  // 블록 높이: (리더 1줄 + 셀원 줄 수)
  const getBlockHeight = (cell: AttendanceCell) =>
    1 + Math.max(cell.members.length, 0);

  sheetData.cells.forEach((cell, idx) => {
    const gridRow = Math.floor(idx / 3);
    const gridCol = idx % 3;

    const baseRow = startRow + gridRow * /*블록높이 가변이라*/ 0;
    // 가변 높이 때문에 "행 누적" 방식이 더 안전:
  });

  // 가변 높이를 위해: "그리드 행별로 최대 높이"를 구해 누적 배치
  const rows: AttendanceCell[][] = [];
  for (let i = 0; i < sheetData.cells.length; i += 3) {
    rows.push(sheetData.cells.slice(i, i + 3));
  }

  let cursorRow = startRow; // 현재 배치 시작 row
  const cellCountsForSummary: {name: string; count: number}[] = [];

  // ✅ row별 높이 미리 계산
  const rowHeights = rows.map((rowCells) => {
    const heights = rowCells.map(getBlockHeight);
    return Math.max(...heights, 2);
  });

  // ✅ 각 row 시작 cursorRow를 미리 계산
  const rowStartRows: number[] = [];
  let tmp = startRow;
  for (const h of rowHeights) {
    rowStartRows.push(tmp);
    tmp += h + blockGap;
  }

  for (const rowCells of rows) {
    const heights = rowCells.map(getBlockHeight);
    const rowHeight = Math.max(...heights, 2); // 최소 2줄 정도는 확보

    // 한 줄(그리드Row) 안에 최대 3개 블록 배치
    rowCells.forEach((cell, colIdx) => {
      const startCol = colIdx * groupCols;

      // (1) 리더 행: #=1, 셀=cellName, 이름=leaderName
      setCell(ws, cursorRow, startCol + 0, "1", {
        alignment: {horizontal: "center", vertical: "center"},
        border: borderThin,
        font: {name: "210 맨발의청춘 L", sz: 14},
      });
      setCell(ws, cursorRow, startCol + 1, cell.cellName, {
        alignment: {horizontal: "center", vertical: "center"},
        border: borderThin,
        font: {name: "210 맨발의청춘 L", sz: 14, bold: true},
      });
      setCell(ws, cursorRow, startCol + 2, cell.leader.name, {
        alignment: {horizontal: "center", vertical: "center"},
        border: borderThin,
        font: {name: "210 맨발의청춘 L", sz: 14, bold: true},
      });

      // 출석 칸(빈칸)
      for (let k = 3; k < groupCols; k++) {
        const day = sundayDates[k - 3]; // k=3 -> 0번째 주일
        const byService = buildDayAttendance(cell.leader.histories, day);
        const text = renderDayCell(byService);

        setCell(ws, cursorRow, startCol + k, text, {
          border: borderThin,
          alignment: {horizontal: "center", vertical: "center"},
          font: {name: "210 맨발의청춘 L", sz: 14},
        });
      }

      // (2) 셀원들
      cell.members.forEach((m, i) => {
        const r = cursorRow + 1 + i;
        const isNonA = m.grade && m.grade !== UserGrade.A;
        setCell(ws, r, startCol + 0, String(2 + i), {
          alignment: {horizontal: "center", vertical: "center"},
          border: borderThin,
          font: {name: "210 맨발의청춘 L", sz: 14},
        });
        setCell(ws, r, startCol + 1, "", {border: borderThin});
        setCell(ws, r, startCol + 2, m.name, {
          alignment: {horizontal: "center", vertical: "center"},
          border: borderThin,
          font: {
            name: "210 맨발의청춘 L",
            sz: 14,
            ...(isNonA ? {color: {rgb: "4B5563"}} : {}), // ✅ 진한 회색
          },
        });
        for (let k = 3; k < groupCols; k++) {
          const day = sundayDates[k - 3];
          const byService = buildDayAttendance(m.histories, day);
          const text = renderDayCell(byService);

          setCell(ws, r, startCol + k, text, {
            border: borderThin,
            alignment: {horizontal: "center", vertical: "center"},
            font: {name: "210 맨발의청춘 L", sz: 14},
          });
        }
      });

      // 블록의 남는 줄(행 높이 맞추기)도 테두리 채우기
      for (
        let rr = cursorRow + 1 + cell.members.length;
        rr < cursorRow + rowHeight;
        rr++
      ) {
        setCell(ws, rr, startCol + 0, "", {border: borderThin});
        for (let cc = 1; cc < groupCols; cc++) {
          setCell(ws, rr, startCol + cc, "", {border: borderThin});
        }
      }

      cellCountsForSummary.push({
        name: cell.cellName,
        count: 1 + cell.members.length, // 리더 포함 총원
      });

      // 테두리 굵은선
      const top = cursorRow;
      const bottom = cursorRow + rowHeight - 1;
      const left = startCol;
      const right = startCol + groupCols - 1;

      for (let r = top; r <= bottom; r++) {
        for (let c = left; c <= right; c++) {
          const addr = XLSX.utils.encode_cell({r, c});
          const cellObj = ws[addr];
          if (!cellObj) continue;

          cellObj.s = cellObj.s ?? {};
          const prev = cellObj.s.border ?? borderThin;

          cellObj.s.border = {
            top: r === top ? borderMedium.top : (prev.top ?? borderThin.top),
            bottom:
              r === bottom
                ? borderMedium.bottom
                : (prev.bottom ?? borderThin.bottom),
            left:
              c === left ? borderMedium.left : (prev.left ?? borderThin.left),
            right:
              c === right
                ? borderMedium.right
                : (prev.right ?? borderThin.right),
          };
        }
      }
    });

    // 굵은 구분선(행) 넣고 싶으면 row 끝에 medium border 처리 가능
    // 여기서는 간단히 다음 줄로 이동
    maxUsedRow = Math.max(maxUsedRow, cursorRow + rowHeight - 1);
    cursorRow = cursorRow + rowHeight + blockGap;
  }

  /** ====== 4) 총원 집계 표 (#/셀/이름/주일컬럼 정렬) ====== */
  /**
   * 레이아웃(대략):
   *  - A~B: "총원" (세로 병합)
   *  - C~D: "성전" (위) / "온라인" (아래) (각각 세로 병합)
   *  - E~G: 시간 리스트(행별)
   *
   * 배치는 'cursorRow' 이후 아래쪽에 고정 박스로 놓는다고 가정.
   * 필요하면 summaryStartRow / summaryStartCol만 조절하면 됨.
   */
  // ✅ 집계 (시트 전체 리더+멤버)
  const stats = buildSheetStats({sheetData, sundayDates});

  // 박스 시작 위치
  // ✅ 총원 위치 규칙:
  // - 1~5개: 3번째 셀 아래(= 1번째 row 아래)
  // - 6개 이상: 6번째 셀 아래(= 2번째 row 아래)
  const cellCount = sheetData.cells.length;
  const targetRowIndex = cellCount >= 6 ? 1 : 0;

  // rows가 1개뿐인데 targetRowIndex=1이면 0으로 보정
  const safeRowIndex =
    rows.length === 0 ? 0 : Math.min(targetRowIndex, rows.length - 1);

  const summaryStartRow =
    rows.length === 0
      ? startRow
      : rowStartRows[safeRowIndex] + rowHeights[safeRowIndex];

  const summaryStartCol = groupCols * 2; // ✅ 3번째 묶음(오른쪽) 아래

  // 행 구성
  const sanctuaryRows: Array<{sid: ServiceId; label: string}> = [
    {sid: "1", label: "7:10"},
    {sid: "2", label: "8:00"},
    {sid: "3", label: "9:30"},
    {sid: "4", label: "11:30"},
    {sid: "5", label: "청년예배"},
  ];

  const onlineRows: Array<{sid: ServiceId; label: string}> = [
    {sid: "1", label: "7:10"},
    {sid: "3", label: "9:30"},
    {sid: "4", label: "11:30"},
    {sid: "5", label: "청년예배"},
  ];

  const totalRows = sanctuaryRows.length + onlineRows.length; // 9
  const boxTop = summaryStartRow;
  const boxBottom = summaryStartRow + totalRows - 1;
  const boxLeft = summaryStartCol;
  const boxRight = summaryStartCol + (groupCols - 1); // ✅ 주일 컬럼 끝까지

  // 전체 영역 기본 셀 생성
  for (let r = boxTop; r <= boxBottom; r++) {
    for (let c = boxLeft; c <= boxRight; c++) {
      setCell(ws, r, c, "", {border: borderThin});
    }
  }

  // (1) 총원(= #컬럼, c=0) 세로 병합
  setCell(ws, boxTop, boxLeft + 0, "총원", {
    font: {name: "210 맨발의청춘 L", sz: 14, bold: true},
    alignment: {horizontal: "center", vertical: "center"},
    fill: {patternType: "solid", fgColor: {rgb: titleRgb}},
    border: {
      top: borderMedium.top,
      bottom: borderMedium.bottom,
      left: borderMedium.left,
      right: borderThin.right, // ✅ 오른쪽은 thin
    },
  });

  ws["!merges"] = [
    ...(ws["!merges"] ?? []),
    XLSX.utils.decode_range(
      `${XLSX.utils.encode_cell({r: boxTop, c: boxLeft + 0})}:${XLSX.utils.encode_cell(
        {
          r: boxBottom,
          c: boxLeft + 0,
        },
      )}`,
    ),
  ];

  // (2) 성전(= 셀컬럼, c=1) 병합
  const sanctuaryTop = boxTop;
  const sanctuaryBottom = boxTop + sanctuaryRows.length - 1;

  setCell(ws, sanctuaryTop, boxLeft + 1, "성전", {
    font: {name: "210 맨발의청춘 L", sz: 14, bold: true},
    alignment: {horizontal: "center", vertical: "center"},
    fill: {patternType: "solid", fgColor: {rgb: menuRgb}},
    border: borderThin,
  });

  ws["!merges"] = [
    ...(ws["!merges"] ?? []),
    XLSX.utils.decode_range(
      `${XLSX.utils.encode_cell({r: sanctuaryTop, c: boxLeft + 1})}:${XLSX.utils.encode_cell(
        {
          r: sanctuaryBottom,
          c: boxLeft + 1,
        },
      )}`,
    ),
  ];

  // (3) 온라인(= 셀컬럼, c=1) 병합
  const onlineTop = sanctuaryBottom + 1;
  const onlineBottom = boxBottom;

  setCell(ws, onlineTop, boxLeft + 1, "온라인", {
    font: {name: "210 맨발의청춘 L", sz: 14, bold: true},
    alignment: {horizontal: "center", vertical: "center"},
    fill: {patternType: "solid", fgColor: {rgb: menuRgb}},
    border: borderThin,
  });

  ws["!merges"] = [
    ...(ws["!merges"] ?? []),
    XLSX.utils.decode_range(
      `${XLSX.utils.encode_cell({r: onlineTop, c: boxLeft + 1})}:${XLSX.utils.encode_cell(
        {
          r: onlineBottom,
          c: boxLeft + 1,
        },
      )}`,
    ),
  ];

  // (4) 예배시간 라벨(= 이름컬럼, c=2) + 날짜별 숫자(= c>=3)
  function writeRow(r: number, label: string, sid: ServiceId, mode: Mode) {
    // 예배시간(이름 컬럼)
    setCell(ws, r, boxLeft + 2, label, {
      font: {name: "210 맨발의청춘 L", sz: 14, bold: label === "청년예배"},
      alignment: {horizontal: "center", vertical: "center"},
      border: borderThin,
    });

    // 주일별 집계 숫자 (k=3..)
    for (let i = 0; i < sundayDates.length; i++) {
      const day = sundayDates[i];
      const val = getCount(stats, day, sid, mode);
      setCell(ws, r, boxLeft + 3 + i, val === 0 ? "" : val, {
        font: {name: "210 맨발의청춘 L", sz: 14},
        alignment: {horizontal: "center", vertical: "center"},
        border: borderThin,
      });
    }
  }

  // 성전: OFFLINE만 집계
  sanctuaryRows.forEach((x, idx) => {
    writeRow(sanctuaryTop + idx, x.label, x.sid, "OFFLINE");
  });

  // 온라인: ONLINE만 집계
  onlineRows.forEach((x, idx) => {
    writeRow(onlineTop + idx, x.label, x.sid, "ONLINE");
  });

  // (5) 박스 외곽만 굵게 (내부는 thin 유지)
  for (let r = boxTop; r <= boxBottom; r++) {
    for (let c = boxLeft; c <= boxRight; c++) {
      const isTop = r === boxTop;
      const isBottom = r === boxBottom;
      const isLeft = c === boxLeft;
      const isRight = c === boxRight;

      const addr = XLSX.utils.encode_cell({r, c});
      const cell = ws[addr];
      if (!cell) continue;

      cell.s = cell.s ?? {};
      const prev = cell.s.border ?? borderThin;

      cell.s.border = {
        top: isTop ? borderMedium.top : (prev.top ?? borderThin.top),
        bottom: isBottom
          ? borderMedium.bottom
          : (prev.bottom ?? borderThin.bottom),
        left: isLeft ? borderMedium.left : (prev.left ?? borderThin.left),
        right: isRight ? borderMedium.right : (prev.right ?? borderThin.right),
      };
    }
  }

  /** ====== 5) 열너비, 행높이, 범위 ====== */
  // ✅ 전체 열너비 11
  ws["!cols"] = Array.from({length: totalCols}, () => ({
    wch: 11,
  }));

  // ✅ #열 열너비 6
  for (let g = 0; g < 3; g++) {
    ws["!cols"][g * groupCols] = {wch: 6};
  }

  // !ref 계산(제목~예배시간표까지)
  const lastUsedRow0 = Math.max(boxBottom, maxUsedRow); // 0-index

  // 행높이(대략)
  ws["!rows"] = Array.from({length: lastUsedRow0 + 1}, () => ({
    hpt: 35,
  }));

  ws["!rows"][0] = {hpt: 100};

  const lastRow1 = lastUsedRow0 + 1; // 1-index로 변환
  ws["!ref"] = `A1:${lastColLetter}${lastRow1}`;

  return ws;
}

/** 총원 시트 만들기 */
function buildFinalSheet(params: {ref: Dayjs; allSheets: CheongSheetData[]}) {
  const {ref, allSheets} = params;

  const {year, month, sundays} =
    getSundaysOfMonthContainingMostRecentSunday(ref);
  const sundayDates = sundays.map((d) => d.format("YYYY-MM-DD"));
  const sundayLabels = sundays.map((d) => d.format("M.D"));

  // ✅ 전체(8개 공동체) 합산 집계
  const stats = buildAllCheongStats({allSheets, sundayDates});

  const ws: XLSX.WorkSheet = {};

  // 블록 스펙
  const COLS = 14; // 14 columns
  const ROWS_PER_BLOCK = 5;

  // 컬럼 인덱스(0-based)
  const COL_DATE = 0; // 1번째 컬럼
  const COL_START = 1; // 2번째 컬럼 시작
  const COL_END = 13; // 14번째 컬럼 끝

  // 헤더(3번째 로우) 텍스트: 2~14열 = 13개
  const headerLabels = [
    "8:00",
    "9:30",
    "11:30",
    "성전계수",
    "청년예배",
    "새가족",
    "어메이징",
    "어메이징 외",
    "멘티",
    "무명",
    "9:30",
    "11:30",
    "청년예배",
  ] as const;

  // 컬럼 매핑(4번째 로우에 값 넣을 위치)
  // 2~14열이 1..13 이므로 label index 0..12 => col = 1 + idx
  const colOf = (labelIdx: number) => COL_START + labelIdx;

  // 집계값 계산 helpers
  const offlineCount = (day: string, sid: "2" | "3" | "4" | "5") =>
    getCount(stats, day, sid, "OFFLINE");
  const onlineCount = (day: string, sid: "3" | "4" | "5") =>
    getCount(stats, day, sid, "ONLINE");

  // 시트 전체 폭 last col
  const lastColLetter = XLSX.utils.encode_col(COLS - 1);

  /** ====== 제목행 (A1 ~ N1 병합) ====== */
  const title = `${year} 인터치 주일예배 출석현황 계수 (${month}월)`;

  setCell(ws, 0, 0, title, {
    font: {name: "210 맨발의청춘 L", sz: 18, bold: true},
    alignment: {horizontal: "center", vertical: "center"},
    fill: {patternType: "solid", fgColor: {rgb: "8DB4E2"}},
    border: borderThin,
  });

  ws["!merges"] = [
    ...(ws["!merges"] ?? []),
    XLSX.utils.decode_range(`A1:${XLSX.utils.encode_col(COLS - 1)}1`),
  ];

  // 블록을 아래로 쌓기
  for (let b = 0; b < sundayDates.length; b++) {
    const day = sundayDates[b];
    const dayLabel = sundayLabels[b];

    // 블록 시작 row (0-based)
    const baseR = 1 + b * ROWS_PER_BLOCK;

    const r1 = baseR + 0; // 1번째 로우
    const r2 = baseR + 1; // 2번째 로우
    const r3 = baseR + 2; // 3번째 로우(헤더)
    const r4 = baseR + 3; // 4번째 로우(값)
    const r5 = baseR + 4; // 5번째 로우(빈)

    // 0) 블록 영역 셀 기본 생성(테두리 thin)
    for (let r = baseR; r < baseR + ROWS_PER_BLOCK; r++) {
      for (let c = 0; c < COLS; c++) {
        setCell(ws, r, c, "", {
          border: borderThin,
          alignment: {horizontal: "center", vertical: "center"},
        });
      }
    }

    // 1) 날짜 컬럼(1열) 5로우 병합
    setCell(ws, r1, COL_DATE, dayLabel, {
      font: {name: "210 맨발의청춘 L", sz: 12, bold: true},
      alignment: {horizontal: "center", vertical: "center"},
      border: borderThin,
    });

    ws["!merges"] = [
      ...(ws["!merges"] ?? []),
      XLSX.utils.decode_range(
        `${XLSX.utils.encode_cell({r: r1, c: COL_DATE})}:${XLSX.utils.encode_cell(
          {
            r: r5,
            c: COL_DATE,
          },
        )}`,
      ),
    ];

    // 2) 1로우: 2~14열 "총 000 명" 병합
    setCell(ws, r1, COL_START, `총 000 명`, {
      font: {name: "210 맨발의청춘 L", sz: 12, bold: true},
      alignment: {horizontal: "center", vertical: "center"},
      fill: {patternType: "solid", fgColor: {rgb: "DCE6F1"}},
      border: borderThin,
    });
    ws["!merges"] = [
      ...(ws["!merges"] ?? []),
      XLSX.utils.decode_range(
        `${XLSX.utils.encode_cell({r: r1, c: COL_START})}:${XLSX.utils.encode_cell(
          {
            r: r1,
            c: COL_END,
          },
        )}`,
      ),
    ];

    // 3) 2로우:
    //  - 2~11열: "성전 000명"
    //  - 12~14열: "온라인 000명"
    setCell(ws, r2, COL_START, `성전 000명`, {
      font: {name: "210 맨발의청춘 L", sz: 12, bold: true},
      alignment: {horizontal: "center", vertical: "center"},
      border: borderThin,
    });
    ws["!merges"] = [
      ...(ws["!merges"] ?? []),
      XLSX.utils.decode_range(
        `${XLSX.utils.encode_cell({r: r2, c: 1})}:${XLSX.utils.encode_cell({r: r2, c: 10})}`,
      ),
    ];

    setCell(ws, r2, 11, `온라인 000명`, {
      font: {name: "210 맨발의청춘 L", sz: 12, bold: true},
      alignment: {horizontal: "center", vertical: "center"},
      border: borderThin,
    });
    ws["!merges"] = [
      ...(ws["!merges"] ?? []),
      XLSX.utils.decode_range(
        `${XLSX.utils.encode_cell({r: r2, c: 11})}:${XLSX.utils.encode_cell({r: r2, c: 13})}`,
      ),
    ];

    // 4) 3로우: 헤더(2~14열)
    headerLabels.forEach((txt, idx) => {
      setCell(ws, r3, colOf(idx), txt, {
        font: {name: "210 맨발의청춘 L", sz: 11, bold: true},
        alignment: {horizontal: "center", vertical: "center"},
        border: borderThin,
      });
    });

    // 5) 4로우: 값 넣기 규칙
    // 오프라인: 8:00(2), 9:30(3), 11:30(4), 청년예배(5)
    // 온라인: 9:30(3), 11:30(4), 청년예배(5)
    // 위치:
    //  - 오프라인 8:00/9:30/11:30 => 헤더 idx 0,1,2
    //  - 오프라인 청년예배 => 헤더 idx 4
    //  - 온라인 9:30/11:30/청년예배 => 헤더 idx 10,11,12
    const v_off_800 = offlineCount(day, "2");
    const v_off_930 = offlineCount(day, "3");
    const v_off_1130 = offlineCount(day, "4");
    const v_off_youth = offlineCount(day, "5");

    const v_on_930 = onlineCount(day, "3");
    const v_on_1130 = onlineCount(day, "4");
    const v_on_youth = onlineCount(day, "5");

    const putNum = (col: number, n: number) => {
      setCell(ws, r4, col, n === 0 ? "" : n, {
        font: {name: "210 맨발의청춘 L", sz: 12, bold: true},
        alignment: {horizontal: "center", vertical: "center"},
        border: borderThin,
      });
    };

    putNum(colOf(0), v_off_800);
    putNum(colOf(1), v_off_930);
    putNum(colOf(2), v_off_1130);
    putNum(colOf(4), v_off_youth);

    putNum(colOf(10), v_on_930);
    putNum(colOf(11), v_on_1130);
    putNum(colOf(12), v_on_youth);

    // (선택) 나중에 총/성전/온라인 000명 자동 채우고 싶으면 여기서 계산 가능

    // 6) 블록 외곽선만 medium (원하면)
    for (let r = baseR; r < baseR + ROWS_PER_BLOCK; r++) {
      for (let c = 0; c < COLS; c++) {
        const isTop = r === baseR;
        const isBottom = r === baseR + ROWS_PER_BLOCK - 1;
        const isLeft = c === 0;
        const isRight = c === COLS - 1;

        const addr = XLSX.utils.encode_cell({r, c});
        const cell = ws[addr];
        if (!cell) continue;

        cell.s = cell.s ?? {};
        const prev = cell.s.border ?? borderThin;

        cell.s.border = {
          top: isTop ? borderMedium.top : (prev.top ?? borderThin.top),
          bottom: isBottom
            ? borderMedium.bottom
            : (prev.bottom ?? borderThin.bottom),
          left: isLeft ? borderMedium.left : (prev.left ?? borderThin.left),
          right: isRight
            ? borderMedium.right
            : (prev.right ?? borderThin.right),
        };
      }
    }
  }

  // ref
  const lastRow0 = 1 + sundayDates.length * ROWS_PER_BLOCK - 1; // 0-index 마지막 row

  // 열 너비/행 높이 (원하면 조절)
  ws["!cols"] = Array.from({length: COLS}, (_, idx) => ({
    wch: idx === 0 ? 6 : 10,
  }));
  ws["!rows"] = Array.from({length: lastRow0 + 1}, () => ({hpt: 22}));

  ws["!rows"][0] = {hpt: 60};

  const lastRow1 = lastRow0 + 1; // 엑셀용 1-index
  ws["!ref"] = `A1:${lastColLetter}${lastRow1}`;

  return ws;
}

/** ====== 1청~8청 워크북 다운로드 ====== */
export async function downloadAttendanceWorkbook(params: {
  refDate?: string; // "YYYY-MM-DD"
  dataByCheong: CheongSheetData[]; // 1~8청 데이터
}) {
  const {refDate, dataByCheong} = params;
  const ref = refDate ? dayjs(refDate) : dayjs();

  const {year, month} = getSundaysOfMonthContainingMostRecentSunday(ref);
  const fileName = `${year}년_성전계수_${month}월.xlsx`;

  const wb = XLSX.utils.book_new();

  // ✅ 최종 시트 먼저
  const finalWs = buildFinalSheet({ref, allSheets: dataByCheong});
  XLSX.utils.book_append_sheet(wb, finalWs, "최종");

  // 1~8청 시트
  for (const sheetData of dataByCheong) {
    const ws = buildCheongSheet({ref, sheetData});
    XLSX.utils.book_append_sheet(wb, ws, `${sheetData.cheongNumber}청`);
  }

  XLSX.writeFile(wb, fileName);
}
