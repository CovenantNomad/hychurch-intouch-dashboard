import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import EmptyStateSimple from "../../../components/Atoms/EmptyStates/EmptyStateSimple";
import Spinner from "../../../components/Atoms/Spinner";
import UserInfomation from "../../../components/Blocks/Infomation/UserInfomation";
import Layout from "../../../components/Layout/Layout";
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
import ComboBoxImage from "../../../components/Blocks/Combobox/ComboBoxImage";
import { FIND_CELL_LIMIT } from "../../../constants/constant";
import { SelectType } from "../../../interface/common";
import { SpecialCellIdType } from "../../../interface/cell";
import Summary from "../../../components/Blocks/Summary/Summary";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { makeErrorMessage } from "../../../utils/utils";
import { getMostRecentSunday, getTodayString } from "../../../utils/dateUtils";
import dayjs from "dayjs";
import SpecialTypeCellHeader from "../../../components/Blocks/Headers/SpecialTypeCellHeader";
import PageLayout from "../../../components/Layout/PageLayout";
import BlockContainer from "../../../components/Atoms/Container/BlockContainer";
import SectionContainer from "../../../components/Atoms/Container/SectionContainer";
import RemoveUserSection from "../../../components/Organisms/Renew/RemoveUserSection";
import EditUserInfomation from "../../../components/Blocks/Infomation/EditUserInfomation";
import SimpleModal from "../../../components/Blocks/Modals/SimpleModal";
import SkeletonListItem from "../../../components/Atoms/Skeleton/SkeletonListItem";
import SkeletonMemberInfo from "../../../components/Atoms/Skeleton/SkeletonMemberInfo";

interface RenewMemberProps {}

const RenewMember = ({}: RenewMemberProps) => {
  const recentSunday = getMostRecentSunday()
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [cellList, setCellList] = useState<SelectType[]>([]);
  const [selectedCell, setSelectedCell] = useState<SelectType>({
    id: "",
    name: "",
  });
  const [selectedMember, setSelectedMember] = useState<SelectType>({
    id: "",
    name: "",
  });

  const { isLoading, isFetching, data: user } = useFindUserQuery<
    FindUserQuery,
    FindUserQueryVariables
  >(
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

  const { data } = useFindCellListsQuery<
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

  const { isLoading: isAttendanceLoading, isFetching: isAttendanceFetching, data: attendanceStatus } = useFindAttendanceCheckQuery<
    FindAttendanceCheckQuery,
    FindAttendanceCheckQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: recentSunday.format('YYYY-MM-DD'),
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const { mutate } = useCreateUserCellTransferMutation<
    CreateUserCellTransferMutation,
    CreateUserCellTransferMutationVariables
  >(graphlqlRequestClient, {
    onSuccess() {
      toast.success("셀에 편성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["findCellWithTranferData"] });
      queryClient.invalidateQueries({
        queryKey: ["findRenewCell"],
      });
      queryClient.invalidateQueries({
        queryKey: ["findCell", { id: Number(selectedCell.id) }],
      });
      setSelectedCell({
        id: "",
        name: "",
      });
      setOpenModal(false);
      router.push('/renew');
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
          fromCellId: SpecialCellIdType.Renew,
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
        <title>새가족 - {router.query.slug} | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        {isLoading || isFetching ? (
          <SkeletonMemberInfo />
        ) : user ? (
          <>
            <SpecialTypeCellHeader
              cellId={SpecialCellIdType.Renew}
              cellName={"새싹셀"}
              userName={user.user.name}
              href={"/renew"}
              hasActionButton={true}
              editMode={editMode}
              setEditMode={setEditMode}
            />
            <SectionContainer>
              <BlockContainer firstBlock>
                {!editMode ? (
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
                    <div className="border px-4 pt-4 rounded-md md:col-span-1">
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
                              {attendanceStatus && attendanceStatus.attendanceCheck === AttendanceCheckStatus.Completed ? (
                                <>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-1">
                                      <h6 className="pb-3 text-base">블레싱 편성</h6>
                                      <div className="flex-1">
                                        <button
                                          onClick={() => {
                                            setSelectedCell({
                                              id: SpecialCellIdType.Blessing,
                                              name: "블레싱",
                                            });
                                          }}
                                          className="w-full py-2 border rounded-md text-sm hover:bg-GRAY003"
                                        >
                                          블레싱 편성
                                        </button>
                                      </div>
                                    </div>
                                    <div className="md:col-span-1">
                                      <h6 className="pb-2 text-base">기존 셀 편성</h6>
                                      <ComboBoxImage
                                        showLabel={false}
                                        label={"셀선택"}
                                        selected={selectedCell}
                                        setSelected={setSelectedCell}
                                        selectList={cellList}
                                        widthFull
                                      />
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
                  </div>
                ) : (
                  <EditUserInfomation
                    id={user.user.id}
                    name={user.user.name}
                    gender={user.user.gender}
                    grade={user.user.grade}
                    isActive={user.user.isActive}
                    birthday={user.user.birthday}
                    phone={user.user.phone}
                    address={user.user.address}
                    description={user.user.description}
                    cell={user.user.cell}
                    registrationYear={user.user.registrationDate?.split("-")[0]}
                    registrationMonth={
                      user.user.registrationDate?.split("-")[1]
                    }
                    registrationDay={user.user.registrationDate?.split("-")[2]}
                    editModeHandler={setEditMode}
                  />
                )}
              </BlockContainer>
              <BlockContainer>
                <RemoveUserSection id={user.user.id} name={user.user.name} grade={user.user.grade} />
              </BlockContainer>
            </SectionContainer>
          </>
        ) : (
          <EmptyStateSimple />
        )}
        <SimpleModal
          open={openModal}
          setOpen={setOpenModal}
          title={"새싹셀원 이동"}
          description={`새싹셀에 있던 ${selectedMember.name} 청년을 ${selectedCell.name}로 이동하시겠습니까?`}
          actionLabel="Transfer"
          actionHandler={onTransferHandler}
        />
      </PageLayout>
    </Layout>
  );
};

export default RenewMember;
