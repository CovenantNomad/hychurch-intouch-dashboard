import dayjs from "dayjs";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useQueryClient} from "react-query";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import BlockContainer from "../../../components/Atoms/Container/BlockContainer";
import SectionContainer from "../../../components/Atoms/Container/SectionContainer";
import EmptyStateSimple from "../../../components/Atoms/EmptyStates/EmptyStateSimple";
import SkeletonListItem from "../../../components/Atoms/Skeleton/SkeletonListItem";
import SkeletonMemberInfo from "../../../components/Atoms/Skeleton/SkeletonMemberInfo";
import ComboBoxImage from "../../../components/Blocks/Combobox/ComboBoxImage";
import SpecialTypeCellHeader from "../../../components/Blocks/Headers/SpecialTypeCellHeader";
import UserInfomation from "../../../components/Blocks/Infomation/UserInfomation";
import SimpleModal from "../../../components/Blocks/Modals/SimpleModal";
import Summary from "../../../components/Blocks/Summary/Summary";
import Layout from "../../../components/Layout/Layout";
import PageLayout from "../../../components/Layout/PageLayout";
import AmazingMenteeBlock from "../../../components/Templates/Blessing/MenteeDetailPage/AmazingMenteeBlock";
import BarnabaMenteeBlock from "../../../components/Templates/Blessing/MenteeDetailPage/BarnabaMenteeBlock";
import {FIND_CELL_LIMIT} from "../../../constants/constant";
import {
  AttendanceCheckStatus,
  CreateUserCellTransferMutation,
  CreateUserCellTransferMutationVariables,
  FindAttendanceCheckQuery,
  FindAttendanceCheckQueryVariables,
  FindCellListsQuery,
  FindCellListsQueryVariables,
  FindUserQuery,
  FindUserQueryVariables,
  useCreateUserCellTransferMutation,
  useFindAttendanceCheckQuery,
  useFindCellListsQuery,
  useFindUserQuery,
  UserCellTransferStatus,
} from "../../../graphql/generated";
import {SpecialCellIdType} from "../../../interface/cell";
import {SelectType} from "../../../interface/common";
import {getMostRecentSunday, getTodayString} from "../../../utils/dateUtils";
import {makeErrorMessage} from "../../../utils/utils";

interface NewFamilyMemberProps {}

const BlessingMember = ({}: NewFamilyMemberProps) => {
  const recentSunday = getMostRecentSunday();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [cellList, setCellList] = useState<SelectType[]>([]);
  const [selectedCell, setSelectedCell] = useState<SelectType>({
    id: "",
    name: "",
  });
  const [selectedMember, setSelectedMember] = useState<SelectType>({
    id: "",
    name: "",
  });

  const {
    isLoading,
    isFetching,
    data: user,
  } = useFindUserQuery<FindUserQuery, FindUserQueryVariables>(
    graphlqlRequestClient,
    {
      id: userId,
    },
    {
      enabled: userId !== "",
      staleTime: 10 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );

  const {data} = useFindCellListsQuery<
    FindCellListsQuery,
    FindCellListsQueryVariables
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

  const {
    isLoading: isAttendanceLoading,
    isFetching: isAttendanceFetching,
    data: attendanceStatus,
  } = useFindAttendanceCheckQuery<
    FindAttendanceCheckQuery,
    FindAttendanceCheckQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: recentSunday.format("YYYY-MM-DD"),
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const {mutate} = useCreateUserCellTransferMutation<
    CreateUserCellTransferMutation,
    CreateUserCellTransferMutationVariables
  >(graphlqlRequestClient, {
    onSuccess() {
      toast.success("셀에 편성되었습니다.");
      queryClient.invalidateQueries({queryKey: ["findCellWithTranferData"]});
      queryClient.invalidateQueries({
        queryKey: ["findBlessingCell"],
      });
      queryClient.invalidateQueries({
        queryKey: ["findCell", {id: Number(selectedCell.id)}],
      });
      setSelectedCell({
        id: "",
        name: "",
      });
      setOpenModal(false);
      router.back();
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(
          `셀원이동 신청에 실패했습니다.\n${makeErrorMessage(error.message)}`
        );
      }
    },
  });

  const onTransferHandler = () => {
    if (selectedMember.id && selectedCell.id) {
      mutate({
        input: {
          userId: selectedMember.id,
          fromCellId: SpecialCellIdType.Blessing,
          toCellId: selectedCell.id,
          orderDate: getTodayString(dayjs()),
        },
      });
    } else {
      toast.error("Error! 잘못된 접근입니다.");
    }
  };

  const onOpenHandler = () => setOpenModal(true);

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.id === "string") {
        setUserId(router.query.id);
      } else {
        setUserId("");
      }
    }
  }, [router]);

  useEffect(() => {
    if (data) {
      const cellList = data.findCells.nodes
        .filter(
          (cell) =>
            !cell.id.includes(SpecialCellIdType.NewFamily) &&
            !cell.id.includes(SpecialCellIdType.Blessing) &&
            !cell.id.includes(SpecialCellIdType.Renew)
        )
        .map((cell) => {
          return {
            id: cell.id,
            name: cell.name,
          };
        })
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (b.name > a.name) return -1;
          else return 0;
        });
      setCellList(cellList);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      setSelectedMember({
        id: user.user.id,
        name: user.user.name,
      });
    }
  }, [user]);

  return (
    <Layout>
      <Head>
        <title>블레싱 - {router.query.slug} | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        {isLoading || isFetching ? (
          <SkeletonMemberInfo />
        ) : user ? (
          <>
            <SpecialTypeCellHeader
              cellId={SpecialCellIdType.Blessing}
              cellName={"블레싱셀"}
              userName={user.user.name}
              href={"/blessing"}
              hasActionButton={false}
            />
            <SectionContainer>
              <BlockContainer firstBlock>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-1">
                    <UserInfomation
                      name={user.user.name}
                      gender={user.user.gender}
                      grade={user.user.grade}
                      isActive={user.user.isActive}
                      birthday={user.user.birthday}
                      registrationDate={user.user.registrationDate}
                      phone={user.user.phone}
                      address={user.user.address}
                      description={user.user.description}
                      hasHeader={false}
                    />
                  </div>
                  <div className="space-y-4 md:col-span-1">
                    <BarnabaMenteeBlock userId={userId} />
                    <AmazingMenteeBlock userId={userId} />
                  </div>
                </div>
              </BlockContainer>
              <BlockContainer>
                <div>
                  {router.query.transferStatus ===
                  UserCellTransferStatus.Ordered ? (
                    <div>
                      <h6 className="pb-5 text-base">
                        셀편성 상태 :{" "}
                        <strong className="bg-teal-600 text-white px-1 ml-1">
                          승인대기중
                        </strong>
                      </h6>
                      <div className="bg-GRAY003 text-center py-3">
                        <p className="font-bold">
                          편성셀 :{" "}
                          <span className="text-BLUE">
                            {router.query.toCellName}
                          </span>
                          <br />
                          승인대기중
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {isAttendanceLoading || isAttendanceFetching ? (
                        <SkeletonListItem />
                      ) : (
                        <>
                          {attendanceStatus &&
                          attendanceStatus.attendanceCheck ===
                            AttendanceCheckStatus.Completed ? (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-1">
                                  <h6 className="pb-4 text-base">
                                    기존 셀 편성
                                  </h6>
                                  <ComboBoxImage
                                    showLabel={false}
                                    label={"셀선택"}
                                    selected={selectedCell}
                                    setSelected={setSelectedCell}
                                    selectList={cellList}
                                    widthFull
                                  />
                                </div>
                                <div className="md:col-span-1">
                                  <h6 className="pb-5 text-base">
                                    새싹셀 편성
                                  </h6>
                                  <div className="flex-1">
                                    <button
                                      onClick={() => {
                                        setSelectedCell({
                                          id: String(44),
                                          name: "새싹",
                                        });
                                      }}
                                      className="w-full py-2 border rounded-md text-sm hover:bg-GRAY003"
                                    >
                                      새싹셀 편성
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-8">
                                <Summary
                                  header="Transfer Summary"
                                  label="Transfer"
                                  disabled={
                                    selectedMember.id === "" ||
                                    selectedCell.id === "" ||
                                    router.query.transferStatus ===
                                      UserCellTransferStatus.Ordered
                                  }
                                  onClick={onOpenHandler}
                                >
                                  <Summary.Row
                                    title="새가족 이름"
                                    value={selectedMember.name}
                                  />
                                  <Summary.Row
                                    title="편성 셀"
                                    value={selectedCell.name}
                                  />
                                </Summary>
                              </div>
                            </>
                          ) : (
                            <div className="h-full flex justify-center items-center mt-6 py-6">
                              <p className="whitespace-pre-line text-center">
                                {`아직 셀리더들이 출석체크 중입니다.\n`}
                                {`출석체크가 마감 된 후 새가족 셀편성을 진행해주세요.`}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </BlockContainer>
            </SectionContainer>
          </>
        ) : (
          <EmptyStateSimple />
        )}
        <SimpleModal
          open={openModal}
          setOpen={setOpenModal}
          title={"블레싱셀원 이동"}
          description={`${selectedMember.name} 청년을 ${selectedCell.name}로 이동하시겠습니까?`}
          actionLabel="Transfer"
          actionHandler={onTransferHandler}
        />
      </PageLayout>
    </Layout>
  );
};

export default BlessingMember;
