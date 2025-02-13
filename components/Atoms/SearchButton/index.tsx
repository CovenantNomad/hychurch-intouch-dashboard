type SearchButtonProps = {
  placeholder: string;
  disabled?: boolean;
  onClickHandler: () => void;
};

const SearchButton = ({
  disabled,
  placeholder,
  onClickHandler,
}: SearchButtonProps) => {
  return (
    <div className="">
      <button
        disabled={disabled}
        onClick={onClickHandler}
        className="w-full flex items-center text-left space-x-3 px-4 h-9 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 md:w-72 lg:w-96"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-none text-slate-300 dark:text-slate-400"
          aria-hidden="true"
        >
          <path d="m19 19-3.5-3.5"></path>
          <circle cx="11" cy="11" r="6"></circle>
        </svg>
        <span>{placeholder}</span>
      </button>
    </div>
  );
};

export default SearchButton;
