export const weeklyRegisterData = {
  labels: ['6월 2주', '6월 3주', '6월 4주', '7월 1주'],
  datasets: [
    {
      data: [0, 4, 2, 6],
      backgroundColor: ["#252B42", "#252B42", "#252B42", "#0B5F59"]
    }
  ]
}

export const monthlyRegisterData = {
  labels: ['3월', '4월', '5월', '6월', '7월'],
  datasets: [
    {
      data: [16, 12, 8, 14, 3],
      backgroundColor: ["#252B42", "#252B42", "#252B42", "#252B42", '#FDCF6F']
    }
  ]
}

export const attendanceData = {
  datasets: [
    {
      type: 'bar' as const,
      label: '출석인원',
      data: [296, 271, 282, 302],
      backgroundColor: "#252B42",
      order: 2,
    },
   {
      type: 'line' as const,
      label: '4주이동평균',
      data: [279, 284, 276, 280],
      backgroundColor: "#FDCF6F",
      borderColor: "#FDCF6F",
      borderWidth: 3,
      order: 1,
    }
  ],
  labels: ['6월 2주', '6월 3주', '6월 4주', '7월 1주'],
}

export const monthlyAverData = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
  datasets: [
    {
      data: [256, 277, 286, 266, 291, 281, 302],
      backgroundColor: ["#252B42", "#252B42", "#252B42", "#252B42", "#252B42", "#252B42", '#FDCF6F']
    }
  ]
}

export const cellMemberData = [
  {
    id: 0,
    name: "남정훈",
  },
  {
    id: 1,
    name: "박미희",
  },
  {
    id: 2,
    name: "정다와",
  },
  {
    id: 3,
    name: "오연재",
  },
  {
    id: 4,
    name: "이범석",
  },
  {
    id: 5,
    name: "정한나",
  },
  {
    id: 6,
    name: "문진철",
  },
  {
    id: 7,
    name: "이예진",
  },
  {
    id: 8,
    name: "이진석",
  },
  {
    id: 9,
    name: "고현선",
  },
]

export const attendanceCellData = [
  {
    id: 0,
    name: '7월 1주',
    attendance: [
      {
        userId: 0,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 3,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 4,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 5,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 6,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 7,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 8,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 9,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 1,
        attendance: true,
        serviceId: 3,
        isOnline: false,
      },
      {
        userId: 2,
        attendance: true,
        serviceId: 3,
        isOnline: false,
      },
    ]
  },
  {
    id: 1,
    name: '6월 4주',
    attendance: [
      {
        userId: 0,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 3,
        attendance: true,
        serviceId: 5,
        isOnline: true,
      },
      {
        userId: 4,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 5,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 6,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 7,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 8,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 9,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 1,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 2,
        attendance: true,
        serviceId: 5,
        isOnline: true,
      },
    ]
  },
  {
    id: 2,
    name: '6월 3주',
    attendance: [
      {
        userId: 0,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 3,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 4,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 5,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 6,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 7,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 8,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 9,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 1,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 2,
        attendance: true,
        serviceId: 5,
        isOnline: true,
      },
    ]
  },
  {
    id: 3,
    name: '6월 2주',
    attendance: [
      {
        userId: 0,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 3,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 4,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 5,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 6,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 7,
        attendance: false,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 8,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 9,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 1,
        attendance: true,
        serviceId: 3,
        isOnline: false,
      },
      {
        userId: 2,
        attendance: true,
        serviceId: 3,
        isOnline: false,
      },
    ]
  },
  {
    id: 4,
    name: '6월 1주',
    attendance: [
      {
        userId: 0,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 3,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 4,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 5,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 6,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 7,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 8,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 9,
        attendance: true,
        serviceId: 5,
        isOnline: false,
      },
      {
        userId: 1,
        attendance: true,
        serviceId: 3,
        isOnline: false,
      },
      {
        userId: 2,
        attendance: true,
        serviceId: 3,
        isOnline: false,
      },
    ]
  }
]