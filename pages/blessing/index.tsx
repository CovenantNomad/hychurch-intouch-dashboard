import type { NextPage } from "next";
import Head from "next/head";
import { useLayoutEffect, useState } from "react";
import FullWidthTabs from "../../components/Atoms/Tabs/FullWidthTabs";
import Layout from "../../components/Layout/Layout";
import NewFamilyRegister from "../../components/Templates/Blessing/NewFamilyRegister";
import NewFamilyManagement from "../../components/Templates/Blessing/NewFamilyManagement";
import NewFamilyOrganization from "../../components/Templates/Blessing/NewFamilyOrganization";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedState } from "../../stores/selectedState";
import Header from "../../components/Atoms/Header";
import Container from "../../components/Atoms/Container/Container";

const categories = [
  { id: 0, name: "새가족 등록카드", component: <NewFamilyRegister /> },
  {
    id: 1,
    name: "블레싱 명단관리",
    component: <NewFamilyManagement />,
  },
  {
    id: 2,
    name: "셀 편성하기",
    component: <NewFamilyOrganization />,
  },
];

const Register: NextPage = () => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const setSelectedCell = useSetRecoilState(selectedState);

  useLayoutEffect(() => {
    setSelectedCell({
      selectedCell: {
        cellId: "39",
        cellName: "새가족셀",
      },
      selectedMember: {
        memeberId: "",
        memberName: "",
      },
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>새가족등록 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="블레싱팀" />
      <Container>
        <div className="mt-4">
          <FullWidthTabs
            tabs={categories}
            currentTab={categoryId}
            setCurrentTab={setCategoryId}
          />
        </div>

        <div className="pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16">
          {categories[categoryId].component}
        </div>
      </Container>
    </Layout>
  );
};

export default Register;