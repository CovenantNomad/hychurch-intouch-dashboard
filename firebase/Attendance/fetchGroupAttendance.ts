import dayjs from "dayjs";
import {UserGrade} from "../../graphql/generated";
import {
  AttendanceCell,
  AttendanceHistoryForPrint,
  AttendanceMember,
  CheongSheetData,
  GroupPlan,
} from "../../interface/attendance";
import {getSundaysOfMonthContainingMostRecentSunday} from "../../utils/dateUtils";
import {fetchFindCellAttendance} from "./fetchFindCellAttendance";

type RawHistory = {
  attendedAt: string;
  isOnline: boolean;
  churchService: {id: string; name: string};
};
type RawMember = {
  id: string;
  name: string;
  grade: UserGrade;
  userChurchServiceHistories: RawHistory[];
};

const gradeOrder: UserGrade[] = [
  UserGrade.A,
  UserGrade.B,
  UserGrade.C,
  UserGrade.D,
  UserGrade.E,
  UserGrade.F,
  UserGrade.G,
];

function gradeRank(g?: UserGrade | null) {
  if (!g) return 999;
  const idx = gradeOrder.indexOf(g);
  return idx === -1 ? 999 : idx;
}

function compareMembers(a: RawMember, b: RawMember) {
  const ga = a.grade ?? null;
  const gb = b.grade ?? null;

  const aIsA = ga === UserGrade.A;
  const bIsA = gb === UserGrade.A;

  // 1) A 우선
  if (aIsA !== bIsA) return aIsA ? -1 : 1;

  // 2) A가 아니면 grade 순서(B→C→...→G), grade 없는 건 맨 뒤
  if (!aIsA) {
    const ra = gradeRank(ga);
    const rb = gradeRank(gb);
    if (ra !== rb) return ra - rb;
  }

  // 3) 이름 오름차순
  return a.name.localeCompare(b.name);
}

function toPerson(m: RawMember): AttendanceMember {
  return {
    id: m.id,
    name: m.name,
    grade: m.grade,
    histories: (m.userChurchServiceHistories ?? []).map((h) => ({
      attendedAt: h.attendedAt,
      isOnline: h.isOnline,
      churchService: {id: h.churchService.id, name: h.churchService.name},
    })) as AttendanceHistoryForPrint[],
  };
}

export function toAttendanceCell(findCell: any): AttendanceCell {
  const membersRaw = (findCell?.members ?? []) as RawMember[];

  // ✅ 리더: 현재는 0번째를 리더로 간주(네 기존 규칙 유지)
  const leaderRaw = membersRaw[0];
  const leader = toPerson(leaderRaw);

  // ✅ 리더 제외 + 정렬
  const rest = membersRaw.slice(1);
  const sorted = [...rest].sort(compareMembers);

  return {
    cellName: String(findCell?.name ?? ""),
    leader,
    members: sorted.map(toPerson),
  };
}

export async function fetchGroupAttendanceReal(params: {
  group: GroupPlan;
  refDate: string; // "YYYY-MM-DD"
}): Promise<CheongSheetData> {
  const {group, refDate} = params;

  const ref = dayjs(refDate);
  const {sundays} = getSundaysOfMonthContainingMostRecentSunday(ref);

  const minDate = sundays[0].format("YYYY-MM-DD");
  const maxDate = sundays[sundays.length - 1].format("YYYY-MM-DD");

  const cells: AttendanceCell[] = [];

  // 지금은 단순/안전하게 순차 호출
  // (나중에 cellIds가 많아지면 동시성 제한 병렬로 바꾸자)
  for (const cellId of group.cellIds) {
    const findCell = await fetchFindCellAttendance({cellId, minDate, maxDate});
    cells.push(toAttendanceCell(findCell));
  }

  return {
    cheongNumber: group.cheongNumber,
    cells,
  };
}
