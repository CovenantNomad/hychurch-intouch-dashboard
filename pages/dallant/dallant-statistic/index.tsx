import React from 'react';
import Layout from '../../../components/Layout/Layout';
import Head from 'next/head';
import PageLayout from '../../../components/Layout/PageLayout';
import TabsWithHeader from '../../../components/Atoms/Tabs/TabsWithHeader';
import SectionContainer from '../../../components/Atoms/Container/SectionContainer';
import DallantStatic from '../../../components/Templates/Dallant/DallantStatic';

interface dallantStatisticProps {}

const DallantStatistic = ({}: dallantStatisticProps) => {
  return (
    <Layout>
      <Head>
        <title>달란트 통계 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <SectionContainer>
          <DallantStatic />
        </SectionContainer>
      </PageLayout>
    </Layout>
  );
};

export default DallantStatistic;
