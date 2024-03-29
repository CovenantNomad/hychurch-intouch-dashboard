import React from 'react';
import Layout from '../../../components/Layout/Layout';
import Head from 'next/head';
import PageLayout from '../../../components/Layout/PageLayout';
import SectionContainer from '../../../components/Atoms/Container/SectionContainer';
import CellDetailSection from '../../../components/Templates/Dallant/CellDetailSection';

interface DallentCellProps {}

const DallentCell = ({}: DallentCellProps) => {

  return (
    <Layout>
      <Head>
        <title>달란트 관리 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <SectionContainer>
          <CellDetailSection />
        </SectionContainer>
      </PageLayout>
    </Layout>
  );
};

export default DallentCell;
