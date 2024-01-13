import { DateRangePickerValue } from "@tremor/react";
import { Timestamp } from "firebase/firestore";

export enum EvaluationSubmissionStatus {
  NOTSUBMITTED = 'NOTSUBMITTED',
  INPROGRESS = 'INPROGRESS',
  COMPLETE = 'COMPLETE',
}

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



export type TEvaluationSubmission = {
  cellId: string;
  cellName: string;
  submissionStatus: EvaluationSubmissionStatus;
  submissionDate?: Timestamp;
}

export type IndividualEvaluationDataType = {
  userId: string
  userName: string
  previousCellId: string
  previousCellName: string
  worship: string
  meeting: string
  description: string
}

export type TCellEvaluationFrom = {
  cellId: string;
  cellName: string;
  submissionStatus: EvaluationSubmissionStatus;
  submissionDate?: Timestamp;
  memberList: IndividualEvaluationDataType[]
}