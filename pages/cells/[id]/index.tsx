import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CellInfomationScreen from "../../../components/Templates/Cells/CellInfomationScreen";
import CellTransferScreen from "../../../components/Templates/Cells/CellTransferScreen";
import CellReportScreen from "../../../components/Templates/Cells/CellReportScreen";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  FindCellQuery,
  FindCellQueryVariables,
  useFindCellQuery,
} from "../../../graphql/generated";
import { useRecoilState } from "recoil";
import { selectedState } from "../../../stores/selectedState";
import Layout from "../../../components/Layout/Layout";
import Footer from "../../../components/Atoms/Footer";
import TabsWithHeader from "../../../components/Atoms/Tabs/TabsWithHeader";
import { stateSetting } from "../../../stores/stateSetting";
import CellDeleteScreen from "../../../components/Templates/Cells/CellDeleteScreen";
import CellEditScreen from "../../../components/Templates/Cells/CellEditScreen";
import Container from "../../../components/Atoms/Container/Container";
import SectionBackground from "../../../components/Atoms/Container/SectionBackground";

const CellDetail = () => {
  const { query } = useRouter();
  const [setting, setSetting] = useRecoilState(stateSetting);
  const [categoryId, setCategoryId] = useState<number>(
    setting.cellSelectedCategoryId
  );
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedState);
  const { isLoading, data } = useFindCellQuery<
    FindCellQuery,
    FindCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(query.id),
    },
    {
      enabled: Boolean(query.id),
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const categories = [
    {
      id: 0,
      name: "셀 정보",
      component: <CellInfomationScreen isLoading={isLoading} data={data} />,
    },
    {
      id: 1,
      name: "셀 보고서",
      component: <CellReportScreen />,
    },
    {
      id: 2,
      name: "셀 편성",
      component: <CellTransferScreen />,
    },
    {
      id: 3,
      name: "셀정보 수정",
      component: (
        <CellEditScreen
          id={data?.findCell.id}
          name={data?.findCell.name}
          community={data?.findCell.community}
        />
      ),
    },
    {
      id: 4,
      name: "셀 삭제",
      component: <CellDeleteScreen data={data} />,
    },
  ];

  const setSettingHandler = useCallback(
    (id: number) => {
      setSetting({
        ...setting,
        cellSelectedCategoryId: id,
      });
    },
    [setting, setSetting]
  );

  useEffect(() => {
    if (data) {
      setSelectedStatus({
        ...selectedStatus,
        selectedCell: {
          cellId: data.findCell.id,
          cellName: data.findCell.name,
        },
      });
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>{query.cellName || data?.findCell.name} | INTOUCH CHURCH</title>
      </Head>

      <Container>
        <SectionBackground>
          <TabsWithHeader
            title={data?.findCell.name || "셀"}
            subtitle={data?.findCell.community + " 공동체"}
            tabs={categories}
            currentTab={categoryId}
            setCurrentTab={setCategoryId}
            setSettingHandler={setSettingHandler}
          />
          <div>{categories[categoryId].component}</div>
        </SectionBackground>
        <Footer />
      </Container>
    </Layout>
  );
};

export default CellDetail;
