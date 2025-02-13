import {CalendarIcon} from "@heroicons/react/24/outline";
import {Dayjs} from "dayjs";
import {Dispatch, SetStateAction, useState} from "react";
import Calendar from "../../../../../ui/Calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../ui/Dialog";

type Props = {
  title: string;
  recentSunday: string;
  selectedDate: Dayjs;
  currentDate: Dayjs;
  setCurrentDate: Dispatch<SetStateAction<Dayjs>>;
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>;
};

const HeaderWithCalendar = ({
  title,
  recentSunday,
  currentDate,
  selectedDate,
  setCurrentDate,
  setSelectedDate,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickDate = (day: Dayjs) => {
    setSelectedDate(day);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div className="flex space-x-2 items-baseline">
        <h4 className="text-xl font-bold">{title}</h4>
        <span className="text-sm">(조회일자: {recentSunday})</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm">날짜검색</div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center text-sm text-gray-400 border px-2 py-1 rounded-md outline-none ring-0">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {selectedDate.format("YYYY. MM. DD.")}
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>날짜를 선택해주세요</DialogTitle>
            </DialogHeader>
            <div className="mt-8">
              <Calendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                setCurrentDate={setCurrentDate}
                onClickDate={onClickDate}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HeaderWithCalendar;
