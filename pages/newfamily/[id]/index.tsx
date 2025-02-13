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
import SkeletonMemberInfo from "../../../components/Atoms/Skeleton/SkeletonMemberInfo";
import ComboBoxImage from "../../../components/Blocks/Combobox/ComboBoxImage";
import SpecialTypeCellHeader from "../../../components/Blocks/Headers/SpecialTypeCellHeader";
import EditUserInfomation from "../../../components/Blocks/Infomation/EditUserInfomation";
import UserInfomation from "../../../components/Blocks/Infomation/UserInfomation";
import SimpleModal from "../../../components/Blocks/Modals/SimpleModal";
import Layout from "../../../components/Layout/Layout";
import PageLayout from "../../../components/Layout/PageLayout";
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

const NewFamilyMember = ({}: NewFamilyMemberProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const recentSunday = getMostRecentSunday();
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

  const {isLoading, data: user} = useFindUserQuery<
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

  const {data: attendanceStatus} = useFindAttendanceCheckQuery<
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
      queryClient.invalidateQueries(["findCellWithTranferData"]);
      queryClient.invalidateQueries(["findNewFamilyCell"]);
      queryClient.invalidateQueries(["findCell", Number(selectedCell.id)]);
      setSelectedCell({
        id: "",
        name: "",
      });
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
          fromCellId: SpecialCellIdType.NewFamily,
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
        {isLoading ? (
          <SkeletonMemberInfo />
        ) : user ? (
          <>
            <SpecialTypeCellHeader
              cellId={SpecialCellIdType.NewFamily}
              cellName={"새가족셀"}
              userName={user.user.name}
              href={"/newfamily"}
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
                    {attendanceStatus &&
                    attendanceStatus.attendanceCheck ===
                      AttendanceCheckStatus.Completed ? (
                      <div className="md:col-span-1">
                        {router.query.transferStatus ===
                        UserCellTransferStatus.Ordered ? (
                          <div className="border p-6 rounded-xl shadow">
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
                            <div className="border p-6 rounded-xl shadow">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="">
                                  <h6 className="pb-2 font-medium">
                                    블레싱/새싹 편성
                                  </h6>
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
                                  <div className="mt-2">
                                    <button
                                      onClick={() => {
                                        setSelectedCell({
                                          id: SpecialCellIdType.Renew,
                                          name: "새싹",
                                        });
                                      }}
                                      className="w-full py-2 border rounded-md text-sm hover:bg-GRAY003"
                                    >
                                      새싹셀 편성
                                    </button>
                                  </div>
                                </div>
                                <div className="">
                                  <h6 className="pb-2 font-medium">
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
                              </div>
                              <div className="mt-16">
                                <div className="flex justify-end items-center space-x-6">
                                  <p className="font-medium">
                                    다음 셀을 선택하셨습니다
                                  </p>
                                  <div className="w-[110px] h-[29px] pb-1 text-center border-b border-gray-200">
                                    {selectedCell.name}
                                  </div>
                                </div>
                                <div className="mt-10 flex justify-end space-x-4">
                                  <button
                                    onClick={() =>
                                      setSelectedCell({
                                        id: "",
                                        name: "",
                                      })
                                    }
                                    className="py-2 px-4 ml-2 rounded-md text-sm text-black focus:outline-none hover:bg-gray-100"
                                  >
                                    취소
                                  </button>
                                  <button
                                    onClick={onOpenHandler}
                                    disabled={
                                      selectedMember.id === "" ||
                                      selectedCell.id === "" ||
                                      router.query.transferStatus ===
                                        UserCellTransferStatus.Ordered
                                    }
                                    className="py-2 px-4 ml-2 text-sm text-white bg-emerald-500 border border-transparent rounded-md  focus:outline-none hover:bg-emerald-400 disabled:bg-gray-500"
                                  >
                                    편성
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="border p-6 rounded-xl shadow-sm flex justify-center items-center">
                        <p className="text-sm text-gray-600 text-center">
                          아직 셀리더들이 출석체크 중입니다
                          <br />
                          출석체크가 마감 된 후 새가족 셀편성을 진행해주세요
                        </p>
                      </div>
                    )}
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
            </SectionContainer>
          </>
        ) : (
          <EmptyStateSimple />
        )}
        <SimpleModal
          open={openModal}
          setOpen={setOpenModal}
          title={"새가족 편성하기"}
          description={`${selectedMember.name} 청년을 ${selectedCell.name}로 이동하시겠습니까?`}
          actionLabel="Transfer"
          actionHandler={onTransferHandler}
        />
      </PageLayout>
    </Layout>
  );
};

export default NewFamilyMember;
