import { DateRangePickerValue } from "@tremor/react";
import { Timestamp } from "firebase/firestore";

export type EvaluationSettingType = {
  isActive: boolean;
  seasonName: string;
  entryPeriod: {
    from?: Timestamp
    to?: Timestamp
  };
  viewingPeriod: {
    from?: Timestamp
    to?: Timestamp
  };
}

export type TEvaluationSettingForm = {
  entryPeriod: DateRangePickerValue;
  viewingPeriod: DateRangePickerValue;
}