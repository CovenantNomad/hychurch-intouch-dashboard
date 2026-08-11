import dayjs from "dayjs";
import {RoleType, UserGrade} from "../../graphql/generated";
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
  birthday?: string | null | undefined;
  grade: UserGrade;
  userChurchServiceHistories: RawHistory[];
  roles: RoleType[];
};

const gradeOrder: UserGrade[] = [
  UserGrade.A,
  UserGrade.B,
  UserGrade.C,
  UserGrade.D,
  UserGrade.E,
  UserGrade.F,
  UserGrade.G,
  UserGrade.H,
  UserGrade.I,
];

function gradeRank(g?: UserGrade | null) {
  if (!g) return 999;
  const idx = gradeOrder.indexOf(g);
  return idx === -1 ? 999 : idx;
}

const compareCellsByLeaderBirthday = (a: AttendanceCell, b: AttendanceCell) => {
  const aBirthday = a.leader.birthday;
  const bBirthday = b.leader.birthday;

  // 둘 다 생일 없음
  if (!aBirthday && !bBirthday) return 0;

  // 생일 없는 사람은 뒤로
  if (!aBirthday) return 1;
  if (!bBirthday) return -1;

  // YYYY-MM-DD이므로 빠른 생일 = 나이가 많음
  return aBirthday.localeCompare(bBirthday);
};

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
    birthday: m.birthday,
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
  const cellLeader = findCell?.leaders?.find((leader: any) =>
    leader.roles?.includes(RoleType.CellLeader),
  );

  if (!cellLeader) {
    throw new Error(
      `${String(findCell?.name ?? "")} 셀의 셀리더를 찾을 수 없습니다.`,
    );
  }

  // 2. members에서 동일한 ID를 가진 리더 찾기
  // members에는 출석 이력(userChurchServiceHistories)이 있으므로
  // 실제 출력용 데이터는 여기서 가져옴
  const leaderRaw = membersRaw.find(
    (member) => String(member.id) === String(cellLeader.id),
  );

  if (!leaderRaw) {
    throw new Error(
      `${String(findCell?.name ?? "")} 셀의 셀리더(${cellLeader.name})가 멤버 명단에 없습니다.`,
    );
  }

  const leader = toPerson(leaderRaw);

  // ✅ 리더 제외 + 정렬
  const rest = membersRaw.filter(
    (member) => String(member.id) !== String(cellLeader.id),
  );
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

  const sortedCells = [...cells].sort(compareCellsByLeaderBirthday);

  return {
    cheongNumber: group.cheongNumber,
    cells: sortedCells,
  };
}
