import {useEffect, useState} from "react";
//data
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {FIND_CELL_LIMIT} from "../../../../constants/constant";
import {
  FindCellsWithMembersQuery,
  FindCellsWithMembersQueryVariables,
  useFindCellsWithMembersQuery,
} from "../../../../graphql/generated";
//types
import {
  CellListWithMemberType,
  SpecialCellIdType,
} from "../../../../interface/cell";
//utils
import {onHandleCopy} from "../../../../utils/utils";
//components
import SimpleAlerts from "../../../Atoms/Alerts/SimpleAlerts";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import Spinner from "../../../Atoms/Spinner";
import UnderlineTabs from "../../../Atoms/Tabs/UnderlineTabs";
import DallantPaymentCommunity from "../DallantPaymentCommunity";
import DallantPaymetOthers from "../DallantPaymetOthers";

const tabs = [
  {
    id: 0,
    name: "길",
  },
  {
    id: 1,
    name: "진리",
  },
  {
    id: 2,
    name: "생명",
  },
  {
    id: 3,
    name: "빛",
  },
  {
    id: 4,
    name: "셀 미포함",
  },
];

const recommendText = [
  {
    id: 0,
    text: "선포빙고 챌린지",
  },
  {
    id: 1,
    text: "캐스트 기도운동",
  },
];

interface DallantPaymentProps {}

const DallantPayment = ({}: DallantPaymentProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  const [lightCommunity, setLightCommunity] = useState<
    CellListWithMemberType[]
  >([]);
  const [wayCommunity, setWayCommunity] = useState<CellListWithMemberType[]>(
    []
  );
  const [lifeCommunity, setLifeCommunity] = useState<CellListWithMemberType[]>(
    []
  );
  const [truthCommunity, setTruthCommunity] = useState<
    CellListWithMemberType[]
  >([]);
  const [otherCells, setOtherCells] = useState<CellListWithMemberType[]>([]);
  const {isLoading: isCellLoading, data: cellData} =
    useFindCellsWithMembersQuery<
      FindCellsWithMembersQuery,
      FindCellsWithMembersQueryVariables
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

  useEffect(() => {
    if (cellData) {
      setLightCommunity(
        cellData.findCells.nodes
          .filter(
            (cell) =>
              !cell.id.includes(SpecialCellIdType.NewFamily) &&
              !cell.id.includes(SpecialCellIdType.NewFamilyTwo) &&
              !cell.id.includes(SpecialCellIdType.Blessing) &&
              !cell.id.includes(SpecialCellIdType.Renew)
          )
          .filter((cell) => cell.community === "빛")
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          })
      );
      setWayCommunity(
        cellData.findCells.nodes
          .filter(
            (cell) =>
              !cell.id.includes(SpecialCellIdType.NewFamily) &&
              !cell.id.includes(SpecialCellIdType.NewFamilyTwo) &&
              !cell.id.includes(SpecialCellIdType.Blessing) &&
              !cell.id.includes(SpecialCellIdType.Renew)
          )
          .filter((cell) => cell.community === "길")
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          })
      );
      setLifeCommunity(
        cellData.findCells.nodes
          .filter(
            (cell) =>
              !cell.id.includes(SpecialCellIdType.NewFamily) &&
              !cell.id.includes(SpecialCellIdType.NewFamilyTwo) &&
              !cell.id.includes(SpecialCellIdType.Blessing) &&
              !cell.id.includes(SpecialCellIdType.Renew)
          )
          .filter((cell) => cell.community === "생명")
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          })
      );
      setTruthCommunity(
        cellData.findCells.nodes
          .filter(
            (cell) =>
              !cell.id.includes(SpecialCellIdType.NewFamily) &&
              !cell.id.includes(SpecialCellIdType.NewFamilyTwo) &&
              !cell.id.includes(SpecialCellIdType.Blessing) &&
              !cell.id.includes(SpecialCellIdType.Renew)
          )
          .filter((cell) => cell.community === "진리")
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          })
      );
      setOtherCells(
        cellData.findCells.nodes
          .filter(
            (cell) =>
              cell.id.includes(SpecialCellIdType.NewFamily) ||
              cell.id.includes(SpecialCellIdType.NewFamilyTwo) ||
              cell.id.includes(SpecialCellIdType.Blessing) ||
              cell.id.includes(SpecialCellIdType.Renew)
          )
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          })
      );
    }
  }, [cellData]);

  return (
    <>
      <BlockContainer firstBlock>
        <div>
          <div className="">
            <SimpleAlerts
              title={"입력시 주의사항"}
              description={`1. 금액을 입력하면 꼭 내역을 입력해주세요.\n2. 금액은 1이상의 양수만 입력해주세요.\n3. 엔터를 누르면 바로 제출됩니다. 탭으로 이동해주세요.\n4. 한번 제출하면 다른 공동체로 갔다와주세요. 데이터가 남아 있어요ㅠ`}
            />
            <div className="h-2" />
            <UnderlineTabs
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
          <div className="flex justify-center items-center py-8">
            <p className="mr-8 text-base text-gray-700">추천 내역</p>
            <div className="flex gap-x-3">
              {recommendText.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onHandleCopy(item.text)}
                  className="px-3 py-1 rounded-2xl border bg-gray-100 text-sm text-gray-700"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8">
            {isCellLoading ? (
              <Spinner />
            ) : (
              <div>
                {currentTab === "길" && (
                  <DallantPaymentCommunity
                    cells={wayCommunity}
                    communityName={"길"}
                  />
                )}
                {currentTab === "진리" && (
                  <DallantPaymentCommunity
                    cells={truthCommunity}
                    communityName={"진리"}
                  />
                )}
                {currentTab === "생명" && (
                  <DallantPaymentCommunity
                    cells={lifeCommunity}
                    communityName={"생명"}
                  />
                )}
                {currentTab === "빛" && (
                  <DallantPaymentCommunity
                    cells={lightCommunity}
                    communityName={"빛"}
                  />
                )}
                {currentTab === "셀 미포함" && (
                  <DallantPaymetOthers cells={otherCells} />
                )}
              </div>
            )}
          </div>
        </div>
      </BlockContainer>
    </>
  );
};

export default DallantPayment;
