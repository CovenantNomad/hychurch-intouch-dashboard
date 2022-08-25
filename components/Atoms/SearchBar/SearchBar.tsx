import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"

interface SearchBarForm {
  name: string
}

interface SearchBarProps {
  setName: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ setName }: SearchBarProps) => { 
  const { handleSubmit, register } = useForm<SearchBarForm>()
  const queryClient = useQueryClient() 

  const onSubmitHandler = ({ name }: SearchBarForm) => {
    setName(name)
  }

  return (
    <div className="border border-gray-200 rounded-2xl bg-white px-4 py-2 max-w-xl w-96">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex items-center">
        <svg className="w-5 h-5 mr-2 fill-gray-500" viewBox="0 0 20 20">
          <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
        </svg>
        <input 
          {...register("name")}
          placeholder="searching for member..." 
          className="border-none outline-none w-full"
        />
      </form>
    </div>
  )
}

export default SearchBar