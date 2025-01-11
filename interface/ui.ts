import {Color} from "@tremor/react";

export interface trackerType {
  key: string;
  color: Color;
  tooltip: string;
}

export enum VIEW {
  TABLE = "TABLE",
  CHART = "CHART",
}
