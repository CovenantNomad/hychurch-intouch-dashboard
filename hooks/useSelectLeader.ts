import { Leader, Selected } from "./../interface/cell";
import { useRecoilState } from "recoil";
import { createCellState } from "../stores/createCellState";
import { RoleType } from "../graphql/generated";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useSelectLeader = () => {
  const [disableSelectLeader, setDisableSelectLeader] = useState(false);
  const [disableSelectViceLeader, setDisableSelectViceLeader] = useState(false);
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

  const onSetViceLeaderHandler = ({ id, name, roles, cell }: Leader) => {
    if (
      (roles.includes(RoleType.CellLeader) && cell?.id) ||
      (roles.includes(RoleType.ViceLeader) && cell?.id)
    ) {
      setDisableSelectViceLeader(true);
      toast.error("이미 셀 리더/부리더로 섬기고 있습니다.");
    }
    if (
      !roles.includes(RoleType.ViceLeader) &&
      !roles.includes(RoleType.CellLeader)
    ) {
      if (
        createCellInfo?.leader &&
        createCellInfo?.leader.id !== id &&
        createCellInfo?.leader.name !== name
      ) {
        const newCellInfo = {
          cellName: createCellInfo?.cellName,
          leader: {
            id: createCellInfo?.leader.id,
            name: createCellInfo?.leader.name,
          },
          viceLeader: {
            id,
            name,
          },
        };
        setCreateCellInfo(newCellInfo);
      } else {
        const newCellInfo = {
          cellName: "",
          leader: {
            id: "",
            name: "",
          },
          viceLeader: {
            id,
            name,
          },
        };
        setCreateCellInfo(newCellInfo);
      }
    }
  };

  const onResetLeader = () => {
    setCreateCellInfo(null);
  };

  const onResetViceLeader = () => {
    if (createCellInfo?.leader) {
      const newCellInfo = {
        cellName: createCellInfo?.cellName,
        leader: {
          id: createCellInfo?.leader.id,
          name: createCellInfo?.leader.name,
        },
        viceLeader: {
          id: "",
          name: "",
        },
      };
      setCreateCellInfo(newCellInfo);
    }
  };

  return {
    createCellInfo,
    disableSelectLeader,
    disableSelectViceLeader,
    onSetLeaderHandler,
    onSetViceLeaderHandler,
    onResetLeader,
    onResetViceLeader,
    setDisableSelectLeader,
    setDisableSelectViceLeader,
  };
};

export default useSelectLeader;
