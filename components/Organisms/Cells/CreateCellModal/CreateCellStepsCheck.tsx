import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { EditCellNameForm, Leader } from "../../../../interface/cell";
import { createCellState } from "../../../../stores/createCellState";

interface CreateCellStepsCheckProps {}

const CreateCellStepsCheck = ({}: CreateCellStepsCheckProps) => {
  const [createCellInfo, setCreateCellInfo] = useRecoilState(createCellState);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { handleSubmit, register, getValues } = useForm<EditCellNameForm>({
    defaultValues: {
      name: createCellInfo.cellName,
    },
  });

  const onSubmitHandler = ({ name }: EditCellNameForm) => {
    const newCellInfo = {
      ...createCellInfo,
      cellName: name,
    };
    setCreateCellInfo(newCellInfo);
    setEditMode(false);
  };

  const onClickHandler = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      const newCellInfo = {
        ...createCellInfo,
        cellName: getValues("name"),
      };
      setCreateCellInfo(newCellInfo);
      setEditMode(false);
    }
  };

  return (
    <div className="mt-14 mb-6">
      <div className="border border-gray-300 divide-y-[1px] mb-4 rounded-md">
        <div className="grid grid-cols-3 px-4 py-2">
          <span className="col-span-1 text-gray-500">셀이름 </span>
          <div className="col-span-2 flex justify-between">
            {editMode ? (
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label htmlFor="cellName" className="sr-only">
                  셀이름
                </label>
                <input
                  id="cellName"
                  {...register("name")}
                  placeholder={createCellInfo.cellName}
                  className="border-none outline-none w-[90%]"
                />
              </form>
            ) : (
              <p
                className={`${
                  createCellInfo.leader.name ? "text-black" : "text-gray-400"
                }`}
              >
                {createCellInfo.cellName}
              </p>
            )}
            {createCellInfo.cellName && (
              <button onClick={onClickHandler} className="h-6 w-10">
                <span className="text-sm text-gray-500 font-bold">
                  {editMode ? "완료" : "수정"}
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 px-4 py-2">
          <span className="col-span-1 text-gray-500">셀리더 </span>
          <p className={`col-span-2 text-black`}>
            {createCellInfo.leader.name}
          </p>
        </div>
        {createCellInfo.viceLeader?.id && (
          <div className="grid grid-cols-3 px-4 py-2">
            <span className="col-span-1 text-gray-500">부리더</span>
            <p className={`col-span-2 text-black`}>
              {createCellInfo.viceLeader.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCellStepsCheck;
