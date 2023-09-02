interface LeaderReportType {
  individualPray: number;
  inplacePray: number;
  manitoPray: number;
  missionBible: string;
  qt: number;
  morningWorship: number;
  wednesdayWorship: string;
  fridayWorship: string;
}

interface PrayType {
  id: number;
  date: string;
  content: string;
}

interface MemberReportType {
  id: number;
  order: number;
  name: string;
  meeting: string;
  cellMeeting: boolean;
  story: string;
  praylist: PrayType[];
}

export interface CellReportType {
  leaderReport: LeaderReportType;
  toPastor: string;
  memberReports: MemberReportType[];
}

export const mockCellRport: CellReportType = {
  leaderReport: {
    individualPray: 12,
    inplacePray: 12,
    manitoPray: 12,
    missionBible: "열왕기상 21장",
    qt: 6,
    morningWorship: 5,
    wednesdayWorship: "성전예배",
    fridayWorship: "온라인예배",
  },
  toPastor: `이번주 셀회식 계획하고 있습니다.\n이번주 셀회식 계획하고 있습니다.`,
  memberReports: [
    {
      id: 1,
      order: 1,
      name: "남정훈",
      meeting: "",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
      ],
    },
    {
      id: 2,
      order: 2,
      name: "남정훈",
      meeting: "",
      cellMeeting: false,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
      ],
    },
    {
      id: 3,
      order: 3,
      name: "남정훈",
      meeting: "전화",
      cellMeeting: false,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
      ],
    },
    {
      id: 4,
      order: 4,
      name: "남정훈",
      meeting: "카톡",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
      ],
    },
    {
      id: 5,
      order: 5,
      name: "남정훈",
      meeting: "",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
        {
          id: 4,
          date: "2023.01.01",
          content: "데스티니를 위해 매일 열심히 일하기",
        },
      ],
    },
    {
      id: 6,
      order: 6,
      name: "남정훈",
      meeting: "",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
        {
          id: 4,
          date: "2023.01.01",
          content: "데스티니를 위해 매일 열심히 일하기",
        },
      ],
    },
    {
      id: 7,
      order: 7,
      name: "남정훈",
      meeting: "",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
        {
          id: 4,
          date: "2023.01.01",
          content: "데스티니를 위해 매일 열심히 일하기",
        },
      ],
    },
    {
      id: 8,
      order: 8,
      name: "남정훈",
      meeting: "카톡",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
        {
          id: 4,
          date: "2023.01.01",
          content: "데스티니를 위해 매일 열심히 일하기",
        },
      ],
    },
    {
      id: 9,
      order: 9,
      name: "남정훈",
      meeting: "전화",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
        {
          id: 4,
          date: "2023.01.01",
          content: "데스티니를 위해 매일 열심히 일하기",
        },
      ],
    },
    {
      id: 10,
      order: 10,
      name: "남정훈",
      meeting: "",
      cellMeeting: true,
      story:
        "이번주에 제자반을 하면서 기도에 대해서 조금더 시간을 낼 수 있었습니다. 하나 또 궁금한 것은 사람들이 하나님의 감동이 있었다고 말하는데 아직 그게 어떤 것인지 잘 모르겠다. 지금은 막연히 내 생각은 이렇다라고 말하는데, 그게 어떤 생각이고 감정인지 잘 모르겠습니다.",
      praylist: [
        {
          id: 1,
          date: "2023.01.01",
          content: "기도로 성장하는 사업이 되기를",
        },
        {
          id: 2,
          date: "2023.01.01",
          content:
            "친밀한 교제 속에서 하나님의 마음을 누구보다 빨리 알아차리는 영민함과 주님 닮은 성실함",
        },
        {
          id: 3,
          date: "2023.01.01",
          content:
            "나는 하나님 나라 중에 가장 예배를 잘드리는 자입니다. 나는 예배자입니다.",
        },
        {
          id: 4,
          date: "2023.01.01",
          content: "데스티니를 위해 매일 열심히 일하기",
        },
      ],
    },
  ],
};
