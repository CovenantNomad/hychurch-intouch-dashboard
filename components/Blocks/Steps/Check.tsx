import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { EditCellNameForm, Leader } from "../../../interface/cell"

interface CheckProps {
  leader: Leader
  viceLeader: Leader
  cellName: string
  setCellName: Dispatch<SetStateAction<string>>
}

const Check = ({leader, viceLeader, cellName, setCellName}: CheckProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { handleSubmit, register, getValues} = useForm<EditCellNameForm>({
    defaultValues: {
      name: cellName
    }
  })

  const onSubmitHandler = ({ name }: EditCellNameForm) => {
    setCellName(name)
    setEditMode(false)
  }

  const onClickHandler = () => {
    if (!editMode) {
      setEditMode(true)
    } else {
      setCellName(getValues("name"))
      setEditMode(false)
    }
  }

  console.log(viceLeader)

  return (
    <div className="mt-14 mb-6">
      <div className="border border-gray-300 divide-y-[1px] mb-4 rounded-md">
        <div className="grid grid-cols-3 px-4 py-2">
          <span className="col-span-1 text-gray-500">셀이름 </span>
          <div className="col-span-2 flex justify-between">
            {editMode ? (
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label htmlFor="cellName" className="sr-only">셀이름</label>
                <input id="cellName" {...register("name")} placeholder={cellName} className="border-none outline-none w-[90%]" />
              </form>
            ) : (
              <p className={`${leader.name ? "text-black" : "text-gray-400"}`}>{cellName}</p>
            )}
            {cellName && (
              <button onClick={onClickHandler} className="h-6 w-10">
                <span className="text-sm text-gray-500 font-bold">{editMode ? "완료" : "수정"}</span>
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 px-4 py-2">
          <span className="col-span-1 text-gray-500">셀리더 </span>
          <p className={`col-span-2 text-black`}>{leader.name}</p>
        </div>
        {viceLeader.id && (
          <div className="grid grid-cols-3 px-4 py-2">
            <span className="col-span-1 text-gray-500">부리더</span>
            <p className={`col-span-2 text-black`}>{viceLeader.name}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Check