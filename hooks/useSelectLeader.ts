import { Leader, Selected } from "./../interface/cell";
import { useRecoilState } from "recoil";
import { createCellState } from "../stores/createCellState";
import { RoleType } from "../graphql/generated";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

const useSelectLeader = () => {
  const [disableSelectLeader, setDisableSelectLeader] = useState(false);
  const [createCellInfo, setCreateCellInfo] = useRecoilState(createCellState);

  const onSetLeaderHandler = ({ id, name, roles, cell }: Leader) => {
    if (roles.includes(RoleType.CellLeader) && cell?.id) {
      setDisableSelectLeader(true);
      toast.error("이미 셀 리더로 섬기고 있습니다.");
    }

    if (!roles.includes(RoleType.CellLeader)) {
      const newCellInfo = {
        cellName: name + "셀",
        leader: {
          id,
          name,
        },
      };
      setCreateCellInfo(newCellInfo);
    }
  };

  const onResetLeader = useCallback(() => {
    setCreateCellInfo(null);
  }, [setCreateCellInfo]);

  return {
    createCellInfo,
    disableSelectLeader,
    onSetLeaderHandler,
    onResetLeader,
    setDisableSelectLeader,
  };
};

export default useSelectLeader;
