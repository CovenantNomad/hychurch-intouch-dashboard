import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
// hooks
import useModal from "../../hooks/useModal";
// graphql
import graphlqlRequestClient from "../../client/graphqlRequestClient";
import {
  FindCellsQuery,
  FindCellsQueryVariables,
  useFindCellsQuery,
} from "../../graphql/generated";
// components
import Layout from "../../components/Layout/Layout";
import CellCard from "../../components/Organisms/Cells/CellCard/CellCard";
import Container from "../../components/Atoms/Container/Container";
import Header from "../../components/Atoms/Header";
import Spacer from "../../components/Atoms/Spacer";
import CreateCellModal from "../../components/Organisms/Cells/CreateCellModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { createCellState } from "../../stores/createCellState";
import { FIND_CELL_LIMIT } from "../../constants/constant";
import Footer from "../../components/Atoms/Footer";
import { userState } from "../../stores/userState";
import { SpecialCellIdType } from "../../interface/cell";
import { stateSetting } from "../../stores/stateSetting";

const Cell: NextPage = () => {
  const userInfo = useRecoilValue(userState);
  const setCreateCellInfo = useSetRecoilState(createCellState);
  const [setting, setSetting] = useRecoilState(stateSetting);
  const { modalOpen, onModalOpenHandler, onModalClosehandler } = useModal();
  const { isLoading, data } = useFindCellsQuery<
    FindCellsQuery,
    FindCellsQueryVariables
  >(
    graphlqlRequestClient,
    {
      limit: FIND_CELL_LIMIT,
    },
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
    }
  );

  const onCloseHandler = () => {
    setCreateCellInfo(null);
    onModalClosehandler();
  };

  useEffect(() => {
    setSetting({
      ...setting,
      cellSelectedCategoryId: 0,
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>셀현황 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title={`인터치 셀현황 (${data ? data.findCells.totalCount - 3 : 0}셀)`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onModalOpenHandler}
          className="px-4 py-2 bg-BLUE text-white rounded-md"
        >
          Add Cell
        </motion.button>
      </Header>
      <Spacer size="h-8" background />
      <Container bgWhite>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {Array.from({ length: 6 }, (_, index) => index).map((item) => (
              <div
                key={item}
                className="bg-slate-200 rounded-lg shadow-lg w-30 h-44 lg:h-60 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {data?.findCells.nodes
                .filter(
                  (cell) =>
                    !cell.id.includes(SpecialCellIdType.NewFamily) &&
                    !cell.id.includes(SpecialCellIdType.Blessing) &&
                    !cell.id.includes(SpecialCellIdType.Renew)
                )
                .sort((a, b) => {
                  if (a.name > b.name) return 1;
                  else if (b.name > a.name) return -1;
                  else return 0;
                })
                .map((cell) => (
                  <CellCard
                    key={cell.id}
                    id={cell.id}
                    name={cell.name}
                    community={cell.community}
                    leader={cell.leaders.at(0)?.name!}
                    totalCountOfMembers={cell.statistics.totalCountOfMembers}
                    countOfActiveMembers={cell.statistics.countOfActiveMembers}
                  />
                ))}
            </div>
            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {modalOpen && (
                <CreateCellModal
                  modalOpen={modalOpen}
                  handleClose={onCloseHandler}
                />
              )}
            </AnimatePresence>
          </>
        )}
        <Footer bgWhite />
      </Container>
    </Layout>
  );
};

export default Cell;
