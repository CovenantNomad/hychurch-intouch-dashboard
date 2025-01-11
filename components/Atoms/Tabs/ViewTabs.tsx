import {Dispatch, SetStateAction} from "react";
import {VIEW} from "../../../interface/ui";

type ViewTabsProps = {
  activeView: string;
  setActiveView: Dispatch<SetStateAction<VIEW>>;
  viewOptions: {index: number; label: string; value: VIEW}[];
};

const ViewTabs = ({activeView, setActiveView, viewOptions}: ViewTabsProps) => {
  return (
    <div className="flex justify-end">
      {viewOptions.map((option) => (
        <button
          key={option.index}
          onClick={() => setActiveView(option.value)}
          className={`px-3 py-2 text-sm border rounded-lg transition-all duration-150 mr-2 ${
            activeView === option.value
              ? "bg-gray-100 text-gray-800 border-gray-800"
              : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ViewTabs;
