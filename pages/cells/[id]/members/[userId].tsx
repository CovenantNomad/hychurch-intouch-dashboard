import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
// components
import Layout from "../../../../components/Layout/Layout";
import Spinner from "../../../../components/Atoms/Spinner";
import MemberHeader from "../../../../components/Blocks/Headers/MemberHeader";
import UserInfomation from "../../../../components/Blocks/Infomation/UserInfomation";
import EditUserInfomation from "../../../../components/Blocks/Infomation/EditUserInfomation";
import EmptyStateSimple from "../../../../components/Atoms/EmptyStates/EmptyStateSimple";
// api
import {
  FindUserQuery,
  FindUserQueryVariables,
  useFindUserQuery,
} from "../../../../graphql/generated";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import Footer from "../../../../components/Atoms/Footer";
import Container from "../../../../components/Atoms/Container/Container";
import SectionBackground from "../../../../components/Atoms/Container/SectionBackground";
import SectionContainer from "../../../../components/Atoms/Container/SectionContainer";
import BlockContainer from "../../../../components/Atoms/Container/BlockContainer";

interface MemberDetailPage {}

const MemberDetailPage: NextPage<MemberDetailPage> = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [editMode, setEditMode] = useState(false);

  const { isLoading, data } = useFindUserQuery<
    FindUserQuery,
    FindUserQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: userId,
    },
    {
      enabled: userId !== "",
      staleTime: 3 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.userId === "string") {
        setUserId(router.query.userId);
      } else {
        setUserId("");
      }
    }
  }, [router]);

  return (
    <Layout>
      <Head>
        <title>청년정보 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <SectionBackground>
          {isLoading ? (
            <div className="w-full h-screen flex justify-center">
              <Spinner />
            </div>
          ) : (
            <SectionContainer>
              {data ? (
                <div>
                  <MemberHeader
                    cellId={data.user.cell?.id}
                    cellName={data.user.cell?.name}
                    userName={data.user.name}
                    editMode={editMode}
                    setEditMode={setEditMode}
                  />
                  <BlockContainer>
                    {!editMode ? (
                      <section className="grid grid-cols-1 md:grid-cols-6 gap-6 py-5 px-4 rounded-md bg-white">
                        <div className="md:col-span-2">
                          <UserInfomation
                            name={data.user.name}
                            gender={data.user.gender}
                            isActive={data.user.isActive}
                            birthday={data.user.birthday}
                            phone={data.user.phone}
                            address={data.user.address}
                            description={data.user.description}
                            editModeHandler={() => setEditMode(true)}
                            hasHeader={false}
                          />
                        </div>
                        <div className="md:col-span-4">
                          <div className="flex gap-4 mb-4">
                            <div className="flex-1 h-[120px] border">
                              올해 예배 출석
                            </div>
                            <div className="flex-1 h-[120px] border">
                              올해 셀모임 출석
                            </div>
                          </div>
                          <div className="h-[240px] border">
                            예배출석 그래프
                          </div>
                        </div>
                      </section>
                    ) : (
                      <section className="py-5 px-4 rounded-md bg-white">
                        <EditUserInfomation
                          id={data.user.id}
                          name={data.user.name}
                          gender={data.user.gender}
                          isActive={data.user.isActive}
                          birthday={data.user.birthday}
                          phone={data.user.phone}
                          address={data.user.address}
                          description={data.user.description}
                          cell={data.user.cell}
                        />
                      </section>
                    )}
                  </BlockContainer>
                </div>
              ) : (
                <div className="w-full h-screen flex justify-center items-center">
                  <EmptyStateSimple warning />
                </div>
              )}
            </SectionContainer>
          )}
        </SectionBackground>
        <Footer />
      </Container>
    </Layout>
  );
};

// export  const getServerSideProps = async (context: GetServerSidePropsContext)=> {
//   const { data } = await graphlqlRequestClient.request(SearchUsersDocument)

//   console.log(data)
//   return {
//     props: {}
//   }

// }

export default MemberDetailPage;
