import {GraphQLClient} from "graphql-request";
import graphlqlRequestClient from "../../client/graphqlRequestClient";
import {
  FindCellAttendanceDocument,
  FindCellAttendanceQuery,
  FindCellAttendanceQueryVariables,
} from "../../graphql/generated";

export async function fetchFindCellAttendance(params: {
  cellId: number;
  minDate: string;
  maxDate: string;
}): Promise<FindCellAttendanceQuery["findCell"]> {
  const {cellId, minDate, maxDate} = params;

  const client = graphlqlRequestClient as unknown as GraphQLClient;

  const variables: FindCellAttendanceQueryVariables = {
    id: cellId, // Float!
    minDate,
    maxDate,
  };

  const res = await client.request<FindCellAttendanceQuery>(
    FindCellAttendanceDocument,
    variables,
  );

  return res.findCell;
}
