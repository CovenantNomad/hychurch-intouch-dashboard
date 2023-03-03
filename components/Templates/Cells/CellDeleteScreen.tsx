import React, { useEffect, useState } from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import { FIND_CELL_LIMIT } from "../../../constants/constant";
import {
  FindCellQuery,
  FindCellsQuery,
  FindCellsQueryVariables,
  RoleType,
  useDeleteCellMutation,
  useFindCellsQuery,
  DeleteCellMutation,
  DeleteCellMutationVariables,
} from "../../../graphql/generated";
import { SpecialCellIdType } from "../../../interface/cell";
import { SelectType } from "../../../interface/common";
import InfoCell from "../../Atoms/InfoCell/InfoCell";
import SectionContainer from "../../Atoms/SectionContainer";
import SectionTitle from "../../Atoms/Typography/SectionTitle";
import ComboBoxImage from "../../Blocks/Combobox/ComboBoxImage";
import Summary from "../../Blocks/Summary/Summary";
import { HiOutlineCheck, HiXMark } from "react-icons/hi2";
import { useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { stateSetting } from "../../../stores/stateSetting";

interface CellDeleteScreenProps {
  data: FindCellQuery | undefined;
}

const CellDeleteScreen = ({ data }: CellDeleteScreenProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [setting, setSetting] = useRecoilState(stateSetting);
  const [validation, setValidation] = useState(false);
  const [numberofMember, setNumberofMember] = useState<number | null>(null);
  const [cellList, setCellList] = useState<SelectType[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<SelectType>({
    id: "",
    name: "",
  });
  const [selectedCell, setSelectedCell] = useState<SelectType>({
    id: "",
    name: "",
  });

  const { isLoading, data: findCells } = useFindCellsQuery<
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

  const { mutate } = useDeleteCellMutation<
    DeleteCellMutation,
    DeleteCellMutationVariables
  >(graphlqlRequestClient, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["findCells"] });
      toast.success(
        `${data.deleteCell.cell.name}이 성공적으로 삭제 되었습니다`
      );
      setSetting({
        ...setting,
        cellSelectedCategoryId: 0,
      });
      router.push("/cells");
    },
    onError(errors: DeleteCellMutation) {
      console.log(errors);
      toast.error(`셀 삭제요청이 실패했습니다.`);
    },
  });

  const onDeleteHandler = () => {
    if (data && validation && selectedCell.id !== "") {
      console.log("삭제가능");
      mutate({
        input: {
          cellId: Number(data.findCell.id),
          targetCellId: Number(selectedCell.id),
        },
      });
    } else {
      if (!validation) {
        toast.error(`셀원이 남아있습니다\n 셀원을 이동하고 삭제해주세요`);
      }
      if (selectedCell.id === "") {
        toast.error(`셀리더가 이동할 셀이 지정되지 않았습니다`);
      }
    }
  };

  useEffect(() => {
    if (findCells && data) {
      const cellList = findCells.findCells.nodes
        .filter(
          (cell) =>
            cell.id !== data.findCell.id &&
            !cell.id.includes(SpecialCellIdType.NewFamily) &&
            !cell.id.includes(SpecialCellIdType.Blessing)
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

      const leader = data.findCell.leaders.filter((member) =>
        member.roles.includes(RoleType.CellLeader)
      )[0];
      setSelectedLeader({
        id: leader.id,
        name: leader.name,
      });
    }
  }, [findCells, data]);

  useEffect(() => {
    if (data) {
      const memberNumber = data.findCell.members.filter(
        (member) =>
          !member.roles.includes(RoleType.CellLeader) &&
          !member.roles.includes(RoleType.ViceLeader)
      ).length;
      setNumberofMember(memberNumber);
      setValidation(memberNumber === 0);
    }
  }, [data]);

  return (
    <div>
      <SectionContainer>
        <SectionTitle>셀 삭제</SectionTitle>
        <p className="whitespace-pre-line bg-GRAY003 text-center py-1">{`<셀 삭제 조건>\n1. 소속된 셀원이 없어야 합니다.\n2. 셀리더를 다른셀로 배정해야 합니다`}</p>
        <div className="grid xl:grid-cols-2 gap-5 mt-5">
          <div className="xl:col-span-1">
            <div className="flex items-center gap-x-3">
              <div
                className={`p-1 rounded-full border ${
                  validation
                    ? "text-teal-600 border-teal-600"
                    : "text-red-500 border-red-500"
                }`}
              >
                {validation ? <HiOutlineCheck /> : <HiXMark />}
              </div>
              <InfoCell title={"소속된 셀원"} value={numberofMember} />
            </div>
            {!validation && (
              <p className="mt-1 ml-9 text-sm text-red-600">
                먼저 셀 편성에서 셀원들을 이동해주시고, 상대 셀에서 승인해야
                합니다.
              </p>
            )}
            <div className="flex items-center gap-x-3 mt-5">
              <div
                className={`p-1 rounded-full border ${
                  selectedCell.id !== ""
                    ? "text-teal-600 border-teal-600"
                    : "text-red-500 border-red-500"
                }`}
              >
                {selectedCell.id !== "" ? <HiOutlineCheck /> : <HiXMark />}
              </div>
              <ComboBoxImage
                label="셀선택"
                selected={selectedCell}
                setSelected={setSelectedCell}
                selectList={cellList}
                widthFull
              />
            </div>
          </div>
          <div className="xl:col-span-1">
            <Summary
              header="Transfer Summary"
              label="Transfer"
              disabled={!validation || selectedCell.id === ""}
              onClick={onDeleteHandler}
            >
              <Summary.Row title="이동 할 리더" value={selectedLeader.name} />
              <Summary.Row title="이동 할 셀" value={selectedCell.name} />
            </Summary>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default CellDeleteScreen;
