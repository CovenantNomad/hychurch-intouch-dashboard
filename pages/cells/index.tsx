import {AnimatePresence, motion} from "framer-motion";
import type {NextPage} from "next";
import Head from "next/head";
import {useEffect, useState} from "react";
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
import {useRecoilState, useSetRecoilState} from "recoil";
import Container from "../../components/Atoms/Container/Container";
import Footer from "../../components/Atoms/Footer";
import Header from "../../components/Atoms/Header";
import Spacer from "../../components/Atoms/Spacer";
import UnderlineBoxTabs from "../../components/Atoms/Tabs/UnderlineBoxTabs";
import Layout from "../../components/Layout/Layout";
import CellCard from "../../components/Organisms/Cells/CellCard/CellCard";
import CreateCellModal from "../../components/Organisms/Cells/CreateCellModal";
import {FIND_CELL_LIMIT} from "../../constants/constant";
import {communityTabs} from "../../constants/tabs";
import {CellType, SpecialCellIdType} from "../../interface/cell";
import {CommunityFilter, communityFilterState} from "../../stores/cellState";
import {createCellState} from "../../stores/createCellState";

const Cell: NextPage = () => {
  const setCreateCellInfo = useSetRecoilState(createCellState);
  const [filter, setFilter] = useRecoilState(communityFilterState);
  const [filterdList, setFilterdList] = useState<CellType[]>([]);
  const {modalOpen, onModalOpenHandler, onModalClosehandler} = useModal();
  const {isLoading, data} = useFindCellsQuery<
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
    if (data) {
      if (filter === CommunityFilter.SHOW_ALL) {
        const filterList = data?.findCells.nodes
          .filter(
            (cell) =>
              !cell.id.includes(SpecialCellIdType.NewFamily) &&
              !cell.id.includes(SpecialCellIdType.Blessing) &&
              !cell.id.includes(SpecialCellIdType.Renew)
          )
          .sort((a, b) => a.name.localeCompare(b.name));
        setFilterdList(filterList);
      } else {
        const filterList = data?.findCells.nodes
          .filter((cell) => cell.community === filter)
          .sort((a, b) => a.name.localeCompare(b.name));
        setFilterdList(filterList);
      }
    }
  }, [data, filter]);

  return (
    <Layout>
      <Head>
        <title>셀현황 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header
          title={`인터치 셀현황 (${
            filter === "전체" ? "전체" : `${filter} 공동체`
          }: ${filterdList ? filterdList.length : 0}셀)`}
        >
          <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onClick={onModalOpenHandler}
            className="px-4 py-2 bg-BLUE text-white text-sm rounded-md lg:text-base"
          >
            Add Cell
          </motion.button>
        </Header>
        <Spacer size="h-8" background />
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {Array.from({length: 6}, (_, index) => index).map((item) => (
                <div
                  key={item}
                  className="bg-slate-200 rounded-lg shadow-lg w-30 h-44 lg:h-60 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <>
              <UnderlineBoxTabs
                tabs={communityTabs}
                currentTab={filter}
                setCurrentTab={setFilter}
              />
              <Spacer size="h-8 lg:h-16" />
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {filterdList.map((cell) => (
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
            </>
          )}
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
        <Footer />
      </Container>
    </Layout>
  );
};

export default Cell;
