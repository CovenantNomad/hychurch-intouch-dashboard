import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import PageLayout from "../../components/Layout/PageLayout";
import SectionContainer from "../../components/Atoms/Container/SectionContainer";
import TabsWithHeader from "../../components/Atoms/Tabs/TabsWithHeader";
import { useRecoilState } from "recoil";
import { useCallback, useState } from "react";
import { stateSetting } from "../../stores/stateSetting";
import ThisWeekAttendance from "../../components/Templates/Attendance/ThisWeekAttendance";
import AttendanceOverview from "../../components/Templates/Attendance/AttendanceOverview/AttendanceOverview";
import FullScreenLayout from "../../components/Layout/FullScreenLayout";

const AttendancePage = () => {
  const [setting, setSetting] = useRecoilState(stateSetting);
  const [categoryId, setCategoryId] = useState<number>(
    setting.blessingSelectedCategoryId
  );

  const categories = [
    {
      id: 0,
      name: "이번주출석현황",
      component: <AttendanceOverview />,
    },
    {
      id: 1,
      name: "셀별출석현황(실시간)",
      component: <ThisWeekAttendance />,
    },
  ];

  const setSettingHandler = useCallback(
    (id: number) => {
      setSetting({
        ...setting,
        blessingSelectedCategoryId: id,
      });
    },
    [setting, setSetting]
  );


  return (
    <FullScreenLayout>
      <Head>
        <title>출석현황 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <TabsWithHeader
          title={"출석현황"}
          tabs={categories}
          currentTab={categoryId}
          setCurrentTab={setCategoryId}
          setSettingHandler={setSettingHandler}
        />
        <SectionContainer>{categories[categoryId].component}</SectionContainer>
      </PageLayout>
    </FullScreenLayout>
  );
};

export default AttendancePage;
