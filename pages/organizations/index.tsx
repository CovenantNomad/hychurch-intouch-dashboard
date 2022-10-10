import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// components
import { AnimatePresence, motion } from 'framer-motion'
import CellCard from '../../components/Blocks/Cards/CellCards'
import AddCellModal from '../../components/Blocks/Modals/AddCellModal'
// graphql
import graphlqlRequestClient from '../../client/graphqlRequestClient'
import { FindCellsQuery, FindCellsQueryVariables, useFindCellsQuery } from '../../graphql/generated'
import Layout from '../../components/Layout/Layout'


const Cell: NextPage = () => {
  const [ modalOpen, setModalOpen ] = useState<boolean>(false)

  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  const { isLoading, data } = useFindCellsQuery<FindCellsQuery, FindCellsQueryVariables>(
    graphlqlRequestClient,
    {
      limit: 40
    }
  )

  return (
    <Layout>
      <Head>
        <title>셀현황 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <header className='flex justify-between mb-6'>
          <h4 className='text-2xl font-bold tracking-wide'>인터치 셀현황 ({data?.findCells.totalCount}셀)</h4>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setModalOpen(!modalOpen)}
            className='px-4 py-2 bg-navy-blue text-white rounded-md'
          >
            Add Cell
          </motion.button>
        </header>
        {isLoading ? (
          <div className='grid grid-cols-2 gap-4 mb-8 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
            {Array.from({ length: 6 }, (_, index) => index).map(item => (
              <div key={item} className="bg-slate-200 rounded-lg shadow-lg w-30 h-44 lg:h-60 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 2xl:grid-cols-6'>
              {data?.findCells.nodes.sort((a, b) => {
                if (a.name > b.name) return 1;
                else if (b.name > a.name) return -1;
                else return 0;
              }).map(cell => (
                <CellCard 
                  key={cell.id} 
                  id={cell.id} 
                  name={cell.name} 
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
              {modalOpen && <AddCellModal modalOpen={modalOpen} handleClose={handleClose} />}
            </AnimatePresence>
          </>
        )}
      </section>
    </Layout>
  )
}

export default Cell
