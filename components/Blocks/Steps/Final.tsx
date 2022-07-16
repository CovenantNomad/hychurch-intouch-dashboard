import graphlqlRequestClient from "../../../client/graphqlRequestClient"
import { CreateCellMutation, CreateCellMutationVariables, useCreateCellMutation } from "../../../graphql/generated"
import { Leader } from "../../../interface/cell"

interface FinalProps {
  leader: Leader
  viceLeader: Leader
  cellName: string
}

const Final = ({ leader, viceLeader, cellName }: FinalProps) => {

  const { mutateAsync, isError, isSuccess, isLoading, data } = useCreateCellMutation<CreateCellMutation, CreateCellMutationVariables>(graphlqlRequestClient)

  const onCreateHandler = () =>{
    mutateAsync({
      input: {
        name: cellName,
        cellLeaderId: leader.id
      }
    })
  }

  return (
    <div className="mt-14 mb-6">
      <p className="text-sm text-center">생성하기 버튼을 눌러 셀을 생성해주세요<br/>생성 후 결과를 확인할 때까지 팝업창을 닫지 마세요!</p>
      <div className="mt-8">
        {isLoading && (
          <div className="flex">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
            <p>Processing</p>
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center">
            <svg className="h-16 w-16 fill-red-600" viewBox="0 0 20 20">
              <path d="M13.864,6.136c-0.22-0.219-0.576-0.219-0.795,0L10,9.206l-3.07-3.07c-0.219-0.219-0.575-0.219-0.795,0
								c-0.219,0.22-0.219,0.576,0,0.795L9.205,10l-3.07,3.07c-0.219,0.219-0.219,0.574,0,0.794c0.22,0.22,0.576,0.22,0.795,0L10,10.795
								l3.069,3.069c0.219,0.22,0.575,0.22,0.795,0c0.219-0.22,0.219-0.575,0-0.794L10.794,10l3.07-3.07
								C14.083,6.711,14.083,6.355,13.864,6.136z M10,0.792c-5.086,0-9.208,4.123-9.208,9.208c0,5.085,4.123,9.208,9.208,9.208
								s9.208-4.122,9.208-9.208C19.208,4.915,15.086,0.792,10,0.792z M10,18.058c-4.451,0-8.057-3.607-8.057-8.057
								c0-4.451,3.606-8.057,8.057-8.057c4.449,0,8.058,3.606,8.058,8.057C18.058,14.45,14.449,18.058,10,18.058z"></path>
            </svg>
            <p className="text-lg text-center mt-3">셀 생성에 실패하였습니다</p>
          </div>
        )}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center">
            <svg className="h-16 w-16 fill-green-600" viewBox="0 0 20 20">
              <path d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
                C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
                c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
                c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
                c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
                c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
            </svg>
            <p className="text-lg text-center mt-3"><strong>{data.createCell.cell.name}</strong>을 성공적으로 생성하였습니다</p>
          </div>
        ) : (
          <button 
            onClick={onCreateHandler}
            className="w-full py-3 rounded-lg bg-teal-600 text-center text-white"
          >
            생성하기
          </button>
        )}
      </div>
    </div>
  )
}

export default Final