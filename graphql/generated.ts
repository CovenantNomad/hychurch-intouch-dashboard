import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** 셀 */
export type Cell = {
  __typename?: 'Cell';
  /** 비고 */
  description?: Maybe<Scalars['String']>;
  /** 아이디 */
  id: Scalars['ID'];
  /** 셀 이름 */
  name: Scalars['String'];
};

/** 예배 */
export type ChurchService = {
  __typename?: 'ChurchService';
  /** 비고 */
  description?: Maybe<Scalars['String']>;
  /** 아이디 */
  id: Scalars['ID'];
  /** 예배 활성화 여부 */
  isActive: Scalars['Boolean'];
  /** 예배 이름 (1부 예배, 2부 예배, 등) */
  name: Scalars['String'];
  /** 예배 시작 시간 (8:00, 9:30, 11:30, 14:15 등) */
  startAt: Scalars['String'];
};

export type CreateCellInput = {
  /** 셀 리더 ID */
  cellLeaderId: Scalars['ID'];
  /** 비고 */
  description?: InputMaybe<Scalars['String']>;
  /** 셀 이름 */
  name: Scalars['String'];
};

export type CreateCellPayload = {
  __typename?: 'CreateCellPayload';
  cell: Cell;
};

export type DeleteCellInput = {
  /** 셀 아이디 */
  cellId: Scalars['Int'];
};

export type DeleteCellPayload = {
  __typename?: 'DeleteCellPayload';
  /** 삭제된 셀 */
  cell: Cell;
};

export type FindCellsPayload = {
  __typename?: 'FindCellsPayload';
  nodes: Array<Cell>;
  totalCount: Scalars['Int'];
};

export type FindUsersPayload = {
  __typename?: 'FindUsersPayload';
  nodes: Array<User>;
  totalCount: Scalars['Int'];
};

export type LoginInput = {
  /** 로그인 비밀번호 */
  password: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  /** 토큰 */
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCell: CreateCellPayload;
  deleteCell: DeleteCellPayload;
  login: LoginPayload;
  resetUserPassword: ResetUserPasswordPayload;
  signUp: SignUpPayload;
  /** 셀장이 셀원들의 예배 출석 이력 다건을 기록합니다. */
  submitCellMemberChurchServiceAttendanceHistories: SubmitCellMemberChurchServiceAttendanceHistoriesPayload;
};


export type MutationCreateCellArgs = {
  input: CreateCellInput;
};


export type MutationDeleteCellArgs = {
  input: DeleteCellInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationResetUserPasswordArgs = {
  input: ResetUserPasswordInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationSubmitCellMemberChurchServiceAttendanceHistoriesArgs = {
  input: SubmitCellMemberChurchServiceAttendanceHistoriesInput;
};

export type Query = {
  __typename?: 'Query';
  /** 셀 전체 조회 */
  findCells: FindCellsPayload;
  findChurchServices: Array<ChurchService>;
  /** 전체 사용자 조회 */
  findUsers: FindUsersPayload;
  /** 셀원 조회. 셀장만 셀원 조회가 가능합니다. */
  myCellMembers?: Maybe<Array<User>>;
};


export type QueryFindCellsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryFindUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ResetUserPasswordInput = {
  userId: Scalars['ID'];
};

export type ResetUserPasswordPayload = {
  __typename?: 'ResetUserPasswordPayload';
  user: User;
};

export enum RoleType {
  /** 관리자 (목사님, 간사님) */
  Admin = 'ADMIN',
  /** 셀 리더 */
  CellLeader = 'CELL_LEADER',
  /** 운영자 (개발자 등) */
  Operator = 'OPERATOR',
  /** 부 리더 */
  ViceLeader = 'VICE_LEADER'
}

export type SignUpInput = {
  /** 회원 가입 인증 번호 */
  authenticationNumber: Scalars['String'];
  /** 비고 */
  description?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name: Scalars['String'];
  /** 로그인 비밀번호 */
  password: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  user: User;
};

export type SubmitCellMemberChurchServiceAttendanceHistoriesInput = {
  /** 셀원 예배 출석이력 제출 기준일자(yyyy-MM-dd). 예) 2022년 5월 29일 예배에 대한 제출이면 2022-05-29 로 입력 */
  baseDate: Scalars['String'];
  /** 셀원 출석 이력 목록 */
  userChurchServiceHistories: Array<UserChurchServiceHistoryInput>;
};

export type SubmitCellMemberChurchServiceAttendanceHistoriesPayload = {
  __typename?: 'SubmitCellMemberChurchServiceAttendanceHistoriesPayload';
  /** 처리된 출석이력 건수 */
  processedAttendanceHistoryCount: Scalars['Int'];
  /** 출석이력 제출요청 건수 */
  requestedAttendanceHistoryCount: Scalars['Int'];
};

/** 사용자(인터치 소속 성도, 간사님, 목사님) */
export type User = {
  __typename?: 'User';
  /** 사용자가 속한 셀 */
  cell?: Maybe<Cell>;
  /** 비고 */
  description?: Maybe<Scalars['String']>;
  /** 아이디 */
  id: Scalars['ID'];
  /** 자주 출석하는 지 여부 */
  isActive: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** Roles */
  roles: Array<RoleType>;
  userChurchServiceHistories: Array<UserChurchServiceHistory>;
};


/** 사용자(인터치 소속 성도, 간사님, 목사님) */
export type UserUserChurchServiceHistoriesArgs = {
  baseDate: Scalars['String'];
};

/** 셀원 예배 출석 이력 */
export type UserChurchServiceHistory = {
  __typename?: 'UserChurchServiceHistory';
  /** 예배 출석일 (yyyy-MM-dd) */
  attendedAt: Scalars['String'];
  churchService: ChurchService;
  /** 비고 */
  description?: Maybe<Scalars['String']>;
  /** 셀원 예배 출석 이력 식별자 */
  id: Scalars['ID'];
  /** 성전/온라인 여부 (true => 온라인) */
  isOnline: Scalars['Boolean'];
  user: User;
};

export type UserChurchServiceHistoryInput = {
  /** 예배 출석일 (yyyy-MM-dd) */
  attendedAt: Scalars['String'];
  /** 예배 아이디 */
  churchServiceId: Scalars['ID'];
  /** 비고 */
  description?: InputMaybe<Scalars['String']>;
  /** 성전/온라인 여부 (true => 온라인) */
  isOnline: Scalars['Boolean'];
  /** 사용자(셀원) 아이디 */
  userId: Scalars['ID'];
};

export type CreateCellMutationVariables = Exact<{
  input: CreateCellInput;
}>;


export type CreateCellMutation = { __typename?: 'Mutation', createCell: { __typename?: 'CreateCellPayload', cell: { __typename?: 'Cell', id: string, name: string } } };

export type FindCellsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type FindCellsQuery = { __typename?: 'Query', findCells: { __typename?: 'FindCellsPayload', totalCount: number, nodes: Array<{ __typename?: 'Cell', id: string, name: string }> } };

export type FindLeaderQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type FindLeaderQuery = { __typename?: 'Query', findUsers: { __typename?: 'FindUsersPayload', totalCount: number, nodes: Array<{ __typename?: 'User', id: string, name: string, phone: string }> } };


export const CreateCellDocument = `
    mutation createCell($input: CreateCellInput!) {
  createCell(input: $input) {
    cell {
      id
      name
    }
  }
}
    `;
export const useCreateCellMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCellMutation, TError, CreateCellMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCellMutation, TError, CreateCellMutationVariables, TContext>(
      ['createCell'],
      (variables?: CreateCellMutationVariables) => fetcher<CreateCellMutation, CreateCellMutationVariables>(client, CreateCellDocument, variables, headers)(),
      options
    );
export const FindCellsDocument = `
    query findCells($limit: Int) {
  findCells(limit: $limit) {
    totalCount
    nodes {
      id
      name
    }
  }
}
    `;
export const useFindCellsQuery = <
      TData = FindCellsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindCellsQueryVariables,
      options?: UseQueryOptions<FindCellsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindCellsQuery, TError, TData>(
      variables === undefined ? ['findCells'] : ['findCells', variables],
      fetcher<FindCellsQuery, FindCellsQueryVariables>(client, FindCellsDocument, variables, headers),
      options
    );
export const FindLeaderDocument = `
    query findLeader($name: String) {
  findUsers(name: $name) {
    totalCount
    nodes {
      id
      name
      phone
    }
  }
}
    `;
export const useFindLeaderQuery = <
      TData = FindLeaderQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindLeaderQueryVariables,
      options?: UseQueryOptions<FindLeaderQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindLeaderQuery, TError, TData>(
      variables === undefined ? ['findLeader'] : ['findLeader', variables],
      fetcher<FindLeaderQuery, FindLeaderQueryVariables>(client, FindLeaderDocument, variables, headers),
      options
    );