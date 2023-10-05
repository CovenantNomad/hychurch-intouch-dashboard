import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
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

/** 출석체크 */
export type AttendanceCheck = {
  __typename?: 'AttendanceCheck';
  /** 예배 출석일 (yyyy-MM-dd) */
  attendanceDate: Scalars['String'];
  /** 출석체크 식별자 */
  id: Scalars['ID'];
  /** 출석체크 상태 */
  status: AttendanceCheckStatus;
};

export enum AttendanceCheckStatus {
  /** 출석체크 완료(마감) */
  Completed = 'COMPLETED',
  /** 진행중 */
  InProgress = 'IN_PROGRESS'
}

export type BetweenFilter = {
  max: Scalars['String'];
  min: Scalars['String'];
};

/** 셀 */
export type Cell = {
  __typename?: 'Cell';
  /** 공동체 */
  community: Scalars['String'];
  /** 비고 */
  description?: Maybe<Scalars['String']>;
  /** 아이디 */
  id: Scalars['ID'];
  /** 셀원 */
  leaders: Array<User>;
  /** 셀원 */
  members: Array<User>;
  /** 셀 이름 */
  name: Scalars['String'];
  /** Cell 관련 통계값 */
  statistics: StatisticsOfCell;
  /** 해당 셀로의 셀원 이동 신청 내역 */
  transfersIn: Array<UserCellTransfer>;
  /** 해당 셀로의 셀원 이동 신청 내역 */
  transfersOut: Array<UserCellTransfer>;
};


/** 셀 */
export type CellTransfersInArgs = {
  orderDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<Array<UserCellTransferStatus>>;
};


/** 셀 */
export type CellTransfersOutArgs = {
  orderDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<Array<UserCellTransferStatus>>;
};

export type CellAttendance = {
  submitStatus: CellLeaderAttendanceSubmissionStatus;
};

/** 셀 출석체크 제출 현황 데이터. 마감 여부에 따라 셀 또는 셀 스냅샷 정보가 조회됩니다. */
export type CellAttendanceCheckSubmission = {
  __typename?: 'CellAttendanceCheckSubmission';
  /** 공동체 */
  cellCommunity: Scalars['String'];
  /** 셀 아이디 */
  cellId: Scalars['ID'];
  /** 셀 이름 */
  cellName: Scalars['String'];
  submissionStatus: CellLeaderAttendanceSubmissionStatus;
};

export type CellAttendanceCompleted = CellAttendance & {
  __typename?: 'CellAttendanceCompleted';
  submitStatus: CellLeaderAttendanceSubmissionStatus;
  userChurchServiceHistories: Array<UserChurchServiceHistory>;
};

export type CellAttendanceNotSubmitted = CellAttendance & {
  __typename?: 'CellAttendanceNotSubmitted';
  submitStatus: CellLeaderAttendanceSubmissionStatus;
};

export type CellAttendanceTempSaved = CellAttendance & {
  __typename?: 'CellAttendanceTempSaved';
  submitStatus: CellLeaderAttendanceSubmissionStatus;
  tempSavedAttendanceHistories: Array<TempSavedAttendanceHistory>;
};

export enum CellLeaderAttendanceSubmissionStatus {
  /** 제출 완료 */
  Complete = 'COMPLETE',
  /** 미제출 */
  NotSubmitted = 'NOT_SUBMITTED',
  /** 임시 저장 */
  TemporarySave = 'TEMPORARY_SAVE'
}

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

export type CompleteAttendanceCheckInput = {
  /** 셀원 예배 출석일자(yyyy-MM-dd). 예) 2022년 5월 29일 예배에 대한 제출이면 2022-05-29 로 입력 */
  attendanceDate: Scalars['String'];
};

export type CompleteAttendanceCheckPayload = {
  __typename?: 'CompleteAttendanceCheckPayload';
  attendanceCheck: AttendanceCheck;
};

export type CreateBarnabaMentorInput = {
  /** 바나바 멘토 그룹 기수 (1기, 2기,...) */
  generation: Scalars['Float'];
  userId: Scalars['ID'];
};

export type CreateBarnabaMentorPayload = {
  __typename?: 'CreateBarnabaMentorPayload';
  success: Scalars['Boolean'];
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

export type CreateUserCellTransferInput = {
  /** from 셀 id */
  fromCellId: Scalars['ID'];
  /** 셀원 이동 신청일자 (yyyy-MM-dd) */
  orderDate: Scalars['String'];
  /** to 셀 id */
  toCellId: Scalars['ID'];
  /** 이동할 셀원 id */
  userId: Scalars['ID'];
};

export type CreateUserCellTransferPayload = {
  __typename?: 'CreateUserCellTransferPayload';
  success: Scalars['Boolean'];
};

export type DateFilter = {
  between: BetweenFilter;
};

export type DeleteCellInput = {
  /** 셀 아이디 */
  cellId: Scalars['Int'];
  /** 셀리더를 이동시킬 타겟셀 아이디 */
  targetCellId: Scalars['Int'];
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

export enum Gender {
  /** 남성 */
  Man = 'MAN',
  /** 여성 */
  Woman = 'WOMAN'
}

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
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 출석체크 마감 */
  completeAttendanceCheck: CompleteAttendanceCheckPayload;
  createBarnabaMentor: CreateBarnabaMentorPayload;
  createCell: CreateCellPayload;
  /** 셀원 이동 신청 (단건) */
  createUserCellTransfer: CreateUserCellTransferPayload;
  deleteCell: DeleteCellPayload;
  login: LoginPayload;
  /** 새가족 등록을 처리합니다. */
  registerNewUser: RegisterNewUserPayload;
  removeUserFromSeedlingCell: RemoveUserFromSeedlingCellPayload;
  resetUserPassword: ResetUserPasswordPayload;
  signUp: SignUpPayload;
  /** 셀장이 셀원들의 예배 출석 이력 다건을 기록합니다. */
  submitCellMemberChurchServiceAttendanceHistories: SubmitCellMemberChurchServiceAttendanceHistoriesPayload;
  updateCellFields: UpdateCellFieldsPayload;
  /** 사용자 정보를 업데이트 합니다. */
  updateUser: UpdateUserPayload;
  updateUserCellTransfer: UpdateUserCellTransferPayload;
};


export type MutationCompleteAttendanceCheckArgs = {
  input: CompleteAttendanceCheckInput;
};


export type MutationCreateBarnabaMentorArgs = {
  input: CreateBarnabaMentorInput;
};


export type MutationCreateCellArgs = {
  input: CreateCellInput;
};


export type MutationCreateUserCellTransferArgs = {
  input: CreateUserCellTransferInput;
};


export type MutationDeleteCellArgs = {
  input: DeleteCellInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterNewUserArgs = {
  input: RegisterNewUserInput;
};


export type MutationRemoveUserFromSeedlingCellArgs = {
  input: RemoveUserFromSeedlingCellInput;
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


export type MutationUpdateCellFieldsArgs = {
  input: UpdateCellFieldsInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserCellTransferArgs = {
  input: UpdateUserCellTransferInput;
};

export type Query = {
  __typename?: 'Query';
  /** 셀별 출석체크 제출 현황 조회 */
  cellAttendanceCheckSubmissions: Array<CellAttendanceCheckSubmission>;
  /** 셀 단건 조회 */
  findCell: Cell;
  /** 셀 전체 조회 */
  findCells: FindCellsPayload;
  findChurchServices: Array<ChurchService>;
  /** 전체 사용자 조회 */
  findUsers: FindUsersPayload;
  /** 로그인한 사용자의 정보를 조회합니다. */
  me: User;
  /** 셀 리더의 셀원 출석 체크 제출 정보를 조회합니다. */
  myCellAttendance: CellAttendance;
  /** 셀원 조회. 셀장만 셀원 조회가 가능합니다. */
  myCellMembers?: Maybe<Array<User>>;
  /** 사용자 정보를 조회합니다. */
  user: User;
};


export type QueryCellAttendanceCheckSubmissionsArgs = {
  attendanceDate: Scalars['String'];
};


export type QueryFindCellArgs = {
  id: Scalars['Float'];
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


export type QueryMyCellAttendanceArgs = {
  attendanceDate: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RegisterNewUserInput = {
  /** 주소 */
  address?: InputMaybe<Scalars['String']>;
  /** 생년월일(yyyy-MM-dd) */
  birthday: Scalars['String'];
  /** 비고 */
  description?: InputMaybe<Scalars['String']>;
  /** 성별 */
  gender: Gender;
  /** 이름 */
  name: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 등록일(yyyy-MM-dd) */
  registrationDate: Scalars['String'];
};

export type RegisterNewUserPayload = {
  __typename?: 'RegisterNewUserPayload';
  user: User;
};

export type RemoveUserFromSeedlingCellInput = {
  reason: Scalars['String'];
  userId: Scalars['ID'];
};

export type RemoveUserFromSeedlingCellPayload = {
  __typename?: 'RemoveUserFromSeedlingCellPayload';
  user: User;
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
  /** 바나바 멘토 */
  BarnabaMentor = 'BARNABA_MENTOR',
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

export type StatisticsOfCell = {
  __typename?: 'StatisticsOfCell';
  countOfActiveMembers: Scalars['Int'];
  totalCountOfMembers: Scalars['Int'];
};

export type SubmitCellMemberChurchServiceAttendanceHistoriesInput = {
  /** 셀원 예배 출석일자(yyyy-MM-dd). 예) 2022년 5월 29일 예배에 대한 제출이면 2022-05-29 로 입력 */
  attendanceDate: Scalars['String'];
  /** 제출 상태 */
  submissionStatus: CellLeaderAttendanceSubmissionStatus;
  /** 셀원 출석 이력 목록 */
  userChurchServiceHistories: Array<UserChurchServiceHistoryInput>;
};

export type SubmitCellMemberChurchServiceAttendanceHistoriesPayload = {
  __typename?: 'SubmitCellMemberChurchServiceAttendanceHistoriesPayload';
  success: Scalars['Boolean'];
};

export type TempSavedAttendanceHistory = {
  __typename?: 'TempSavedAttendanceHistory';
  /** 예배 출석일 (yyyy-MM-dd) */
  attendedAt: Scalars['String'];
  /** 예배 아이디 */
  churchServiceId: Scalars['ID'];
  /** 비고 */
  description?: Maybe<Scalars['String']>;
  /** 성전/온라인 여부 (true => 온라인) */
  isOnline: Scalars['Boolean'];
  /** 셀원 아이디 */
  userId: Scalars['ID'];
  /** 셀원 이름 */
  userName: Scalars['String'];
};

export type UpdateCellFieldsInput = {
  /** 공동체 */
  community?: InputMaybe<Scalars['String']>;
  /** 비고 */
  description?: InputMaybe<Scalars['String']>;
  /** 셀 아이디 */
  id: Scalars['ID'];
  /** 셀 이름 */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateCellFieldsPayload = {
  __typename?: 'UpdateCellFieldsPayload';
  /** patch된 셀 */
  cell: Cell;
};

export type UpdateUserCellTransferInput = {
  id: Scalars['ID'];
  /** ORDERED 상태로의 업데이트는 지원하지 않습니다. 오직 CANCELED 또는 CONFIRMED 상태로의 업데이트만 가능합니다. */
  status: UserCellTransferStatus;
};

export type UpdateUserCellTransferPayload = {
  __typename?: 'UpdateUserCellTransferPayload';
  userCellTransfer: UserCellTransfer;
};

export type UpdateUserInput = {
  /** 주소 */
  address?: InputMaybe<Scalars['String']>;
  /** 생년월일(yyyy-MM-dd) */
  birthday: Scalars['String'];
  /** 비고 */
  description?: InputMaybe<Scalars['String']>;
  /** 성별 */
  gender: Gender;
  /** 아이디 */
  id: Scalars['ID'];
  /** 자주 출석하는 지 여부 */
  isActive: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 등록일(yyyy-MM-dd) */
  registrationDate?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user: User;
};

/** 사용자(인터치 소속 성도, 간사님, 목사님) */
export type User = {
  __typename?: 'User';
  /** 주소 */
  address?: Maybe<Scalars['String']>;
  /** 생년월일(yyyy-MM-dd) */
  birthday?: Maybe<Scalars['String']>;
  /** 사용자가 속한 셀 */
  cell?: Maybe<Cell>;
  /** 비고 */
  description?: Maybe<Scalars['String']>;
  /** 성별 */
  gender?: Maybe<Gender>;
  /** 아이디 */
  id: Scalars['ID'];
  /** 자주 출석하는 지 여부 */
  isActive: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 등록일(yyyy-MM-dd) */
  registrationDate?: Maybe<Scalars['String']>;
  /** Roles */
  roles: Array<RoleType>;
  userChurchServiceHistories: Array<UserChurchServiceHistory>;
};


/** 사용자(인터치 소속 성도, 간사님, 목사님) */
export type UserUserChurchServiceHistoriesArgs = {
  baseDate: Scalars['String'];
};

/** 셀원의 셀 이동 신청 내역 */
export type UserCellTransfer = {
  __typename?: 'UserCellTransfer';
  /** 신청처리 완료일자 */
  completeDate?: Maybe<Scalars['String']>;
  fromCell: Cell;
  id: Scalars['ID'];
  /** 신청일자 */
  orderDate: Scalars['String'];
  status: UserCellTransferStatus;
  toCell: Cell;
  /** 셀원 */
  user: User;
};

/** 셀원 이동 신청 상태 */
export enum UserCellTransferStatus {
  /** 거절됨 */
  Canceled = 'CANCELED',
  /** 승인됨 */
  Confirmed = 'CONFIRMED',
  /** 신청됨 */
  Ordered = 'ORDERED'
}

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
  /** 예배 아이디 */
  churchServiceId: Scalars['ID'];
  /** 비고 */
  description?: InputMaybe<Scalars['String']>;
  /** 성전/온라인 여부 (true => 온라인) */
  isOnline: Scalars['Boolean'];
  /** 사용자(셀원) 아이디 */
  userId: Scalars['ID'];
  /** 사용자(셀원) 이름 */
  userName: Scalars['String'];
};

export type CheckCellAttendanceSubmissionsQueryVariables = Exact<{
  attendanceDate: Scalars['String'];
}>;


export type CheckCellAttendanceSubmissionsQuery = { __typename?: 'Query', cellAttendanceCheckSubmissions: Array<{ __typename?: 'CellAttendanceCheckSubmission', cellId: string, cellName: string, cellCommunity: string, submissionStatus: CellLeaderAttendanceSubmissionStatus }> };

export type CompleteAttendanceCheckMutationVariables = Exact<{
  input: CompleteAttendanceCheckInput;
}>;


export type CompleteAttendanceCheckMutation = { __typename?: 'Mutation', completeAttendanceCheck: { __typename?: 'CompleteAttendanceCheckPayload', attendanceCheck: { __typename?: 'AttendanceCheck', id: string, attendanceDate: string, status: AttendanceCheckStatus } } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', accessToken: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpPayload', user: { __typename?: 'User', id: string, name: string } } };

export type FindBlessingCellQueryVariables = Exact<{
  id: Scalars['Float'];
  transferOutStatus?: InputMaybe<Array<UserCellTransferStatus> | UserCellTransferStatus>;
  transferOutDateFilter?: InputMaybe<DateFilter>;
}>;


export type FindBlessingCellQuery = { __typename?: 'Query', findCell: { __typename?: 'Cell', id: string, name: string, leaders: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, members: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, registrationDate?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, transfersOut: Array<{ __typename?: 'UserCellTransfer', id: string, status: UserCellTransferStatus, orderDate: string, completeDate?: string | null, user: { __typename?: 'User', id: string, name: string, gender?: Gender | null }, fromCell: { __typename?: 'Cell', id: string, name: string }, toCell: { __typename?: 'Cell', id: string, name: string } }> } };

export type FindNewFamilyCellQueryVariables = Exact<{
  id: Scalars['Float'];
  transferOutStatus?: InputMaybe<Array<UserCellTransferStatus> | UserCellTransferStatus>;
  transferOutDateFilter?: InputMaybe<DateFilter>;
}>;


export type FindNewFamilyCellQuery = { __typename?: 'Query', findCell: { __typename?: 'Cell', id: string, name: string, leaders: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, members: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, registrationDate?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, transfersOut: Array<{ __typename?: 'UserCellTransfer', id: string, status: UserCellTransferStatus, orderDate: string, completeDate?: string | null, user: { __typename?: 'User', id: string, name: string, gender?: Gender | null }, fromCell: { __typename?: 'Cell', id: string, name: string }, toCell: { __typename?: 'Cell', id: string, name: string } }> } };

export type FindRenewCellQueryVariables = Exact<{
  id: Scalars['Float'];
  transferOutStatus?: InputMaybe<Array<UserCellTransferStatus> | UserCellTransferStatus>;
  transferOutDateFilter?: InputMaybe<DateFilter>;
}>;


export type FindRenewCellQuery = { __typename?: 'Query', findCell: { __typename?: 'Cell', id: string, name: string, leaders: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, members: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, registrationDate?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, transfersOut: Array<{ __typename?: 'UserCellTransfer', id: string, status: UserCellTransferStatus, orderDate: string, completeDate?: string | null, user: { __typename?: 'User', id: string, name: string, gender?: Gender | null }, fromCell: { __typename?: 'Cell', id: string, name: string }, toCell: { __typename?: 'Cell', id: string, name: string } }> } };

export type RemoveUserMutationVariables = Exact<{
  input: RemoveUserFromSeedlingCellInput;
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUserFromSeedlingCell: { __typename?: 'RemoveUserFromSeedlingCellPayload', user: { __typename?: 'User', id: string, name: string, description?: string | null } } };

export type CreateCellMutationVariables = Exact<{
  input: CreateCellInput;
}>;


export type CreateCellMutation = { __typename?: 'Mutation', createCell: { __typename?: 'CreateCellPayload', cell: { __typename?: 'Cell', id: string, name: string } } };

export type DeleteCellMutationVariables = Exact<{
  input: DeleteCellInput;
}>;


export type DeleteCellMutation = { __typename?: 'Mutation', deleteCell: { __typename?: 'DeleteCellPayload', cell: { __typename?: 'Cell', id: string, name: string } } };

export type FindCellQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type FindCellQuery = { __typename?: 'Query', findCell: { __typename?: 'Cell', id: string, name: string, community: string, leaders: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, members: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, statistics: { __typename?: 'StatisticsOfCell', totalCountOfMembers: number, countOfActiveMembers: number } } };

export type FindCellListsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type FindCellListsQuery = { __typename?: 'Query', findCells: { __typename?: 'FindCellsPayload', nodes: Array<{ __typename?: 'Cell', id: string, name: string, community: string, leaders: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType> }> }> } };

export type FindCellWithTranferDataQueryVariables = Exact<{
  id: Scalars['Float'];
  transferInStatus?: InputMaybe<Array<UserCellTransferStatus> | UserCellTransferStatus>;
  transferOutStatus?: InputMaybe<Array<UserCellTransferStatus> | UserCellTransferStatus>;
  transferInDateFilter?: InputMaybe<DateFilter>;
  transferOutDateFilter?: InputMaybe<DateFilter>;
}>;


export type FindCellWithTranferDataQuery = { __typename?: 'Query', findCell: { __typename?: 'Cell', id: string, name: string, community: string, leaders: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, members: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, transfersIn: Array<{ __typename?: 'UserCellTransfer', id: string, status: UserCellTransferStatus, orderDate: string, completeDate?: string | null, user: { __typename?: 'User', id: string, name: string, gender?: Gender | null }, fromCell: { __typename?: 'Cell', id: string, name: string }, toCell: { __typename?: 'Cell', id: string, name: string } }>, transfersOut: Array<{ __typename?: 'UserCellTransfer', id: string, status: UserCellTransferStatus, orderDate: string, completeDate?: string | null, user: { __typename?: 'User', id: string, name: string, gender?: Gender | null }, fromCell: { __typename?: 'Cell', id: string, name: string }, toCell: { __typename?: 'Cell', id: string, name: string } }> } };

export type FindCellsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type FindCellsQuery = { __typename?: 'Query', findCells: { __typename?: 'FindCellsPayload', totalCount: number, nodes: Array<{ __typename?: 'Cell', id: string, name: string, community: string, leaders: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType> }>, statistics: { __typename?: 'StatisticsOfCell', totalCountOfMembers: number, countOfActiveMembers: number } }> } };

export type FindCellsWithMembersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type FindCellsWithMembersQuery = { __typename?: 'Query', findCells: { __typename?: 'FindCellsPayload', nodes: Array<{ __typename?: 'Cell', id: string, name: string, community: string, leaders: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType> }>, members: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }> }> } };

export type FindLeaderQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type FindLeaderQuery = { __typename?: 'Query', findUsers: { __typename?: 'FindUsersPayload', totalCount: number, nodes: Array<{ __typename?: 'User', id: string, name: string, phone: string, birthday?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }> } };

export type FindMyCellMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyCellMembersQuery = { __typename?: 'Query', myCellMembers?: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, description?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }> | null };

export type FindNewTransferUserQueryVariables = Exact<{
  id: Scalars['Float'];
  transferOutStatus?: InputMaybe<Array<UserCellTransferStatus> | UserCellTransferStatus>;
  transferOutDateFilter?: InputMaybe<DateFilter>;
}>;


export type FindNewTransferUserQuery = { __typename?: 'Query', findCell: { __typename?: 'Cell', id: string, name: string, leaders: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, members: Array<{ __typename?: 'User', id: string, name: string, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }>, transfersOut: Array<{ __typename?: 'UserCellTransfer', id: string, status: UserCellTransferStatus, orderDate: string, completeDate?: string | null, user: { __typename?: 'User', id: string, name: string, gender?: Gender | null }, fromCell: { __typename?: 'Cell', id: string, name: string }, toCell: { __typename?: 'Cell', id: string, name: string } }> } };

export type UpdateCellFieldsMutationVariables = Exact<{
  input: UpdateCellFieldsInput;
}>;


export type UpdateCellFieldsMutation = { __typename?: 'Mutation', updateCellFields: { __typename?: 'UpdateCellFieldsPayload', cell: { __typename?: 'Cell', id: string, name: string, community: string } } };

export type UpdateUserCellTransferMutationVariables = Exact<{
  input: UpdateUserCellTransferInput;
}>;


export type UpdateUserCellTransferMutation = { __typename?: 'Mutation', updateUserCellTransfer: { __typename?: 'UpdateUserCellTransferPayload', userCellTransfer: { __typename?: 'UserCellTransfer', id: string, status: UserCellTransferStatus, orderDate: string, completeDate?: string | null, user: { __typename?: 'User', id: string, name: string }, fromCell: { __typename?: 'Cell', id: string, name: string }, toCell: { __typename?: 'Cell', id: string, name: string } } } };

export type CreateUserCellTransferMutationVariables = Exact<{
  input: CreateUserCellTransferInput;
}>;


export type CreateUserCellTransferMutation = { __typename?: 'Mutation', createUserCellTransfer: { __typename?: 'CreateUserCellTransferPayload', success: boolean } };

export type FindUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, registrationDate?: string | null, gender?: Gender | null, address?: string | null, description?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null } };

export type FindUsersQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type FindUsersQuery = { __typename?: 'Query', findUsers: { __typename?: 'FindUsersPayload', totalCount: number, nodes: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, description?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }> } };

export type RegisterNewUserMutationVariables = Exact<{
  input: RegisterNewUserInput;
}>;


export type RegisterNewUserMutation = { __typename?: 'Mutation', registerNewUser: { __typename?: 'RegisterNewUserPayload', user: { __typename?: 'User', id: string, name: string } } };

export type ResetUserPasswordMutationVariables = Exact<{
  input: ResetUserPasswordInput;
}>;


export type ResetUserPasswordMutation = { __typename?: 'Mutation', resetUserPassword: { __typename?: 'ResetUserPasswordPayload', user: { __typename?: 'User', id: string, name: string } } };

export type SearchUsersQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', findUsers: { __typename?: 'FindUsersPayload', totalCount: number, nodes: Array<{ __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, description?: string | null, registrationDate?: string | null, roles: Array<RoleType>, cell?: { __typename?: 'Cell', id: string, name: string } | null }> } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserPayload', user: { __typename?: 'User', id: string, name: string, phone: string, isActive: boolean, birthday?: string | null, gender?: Gender | null, address?: string | null, roles: Array<RoleType>, description?: string | null, cell?: { __typename?: 'Cell', id: string, name: string } | null } } };


export const CheckCellAttendanceSubmissionsDocument = `
    query checkCellAttendanceSubmissions($attendanceDate: String!) {
  cellAttendanceCheckSubmissions(attendanceDate: $attendanceDate) {
    cellId
    cellName
    cellCommunity
    submissionStatus
  }
}
    `;
export const useCheckCellAttendanceSubmissionsQuery = <
      TData = CheckCellAttendanceSubmissionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CheckCellAttendanceSubmissionsQueryVariables,
      options?: UseQueryOptions<CheckCellAttendanceSubmissionsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CheckCellAttendanceSubmissionsQuery, TError, TData>(
      ['checkCellAttendanceSubmissions', variables],
      fetcher<CheckCellAttendanceSubmissionsQuery, CheckCellAttendanceSubmissionsQueryVariables>(client, CheckCellAttendanceSubmissionsDocument, variables, headers),
      options
    );

useCheckCellAttendanceSubmissionsQuery.getKey = (variables: CheckCellAttendanceSubmissionsQueryVariables) => ['checkCellAttendanceSubmissions', variables];
;

export const CompleteAttendanceCheckDocument = `
    mutation completeAttendanceCheck($input: CompleteAttendanceCheckInput!) {
  completeAttendanceCheck(input: $input) {
    attendanceCheck {
      id
      attendanceDate
      status
    }
  }
}
    `;
export const useCompleteAttendanceCheckMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CompleteAttendanceCheckMutation, TError, CompleteAttendanceCheckMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CompleteAttendanceCheckMutation, TError, CompleteAttendanceCheckMutationVariables, TContext>(
      ['completeAttendanceCheck'],
      (variables?: CompleteAttendanceCheckMutationVariables) => fetcher<CompleteAttendanceCheckMutation, CompleteAttendanceCheckMutationVariables>(client, CompleteAttendanceCheckDocument, variables, headers)(),
      options
    );
useCompleteAttendanceCheckMutation.getKey = () => ['completeAttendanceCheck'];

export const LoginDocument = `
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
useLoginMutation.getKey = () => ['login'];

export const MeDocument = `
    query me {
  me {
    id
    name
    roles
    cell {
      id
      name
    }
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me'] : ['me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );

useMeQuery.getKey = (variables?: MeQueryVariables) => variables === undefined ? ['me'] : ['me', variables];
;

export const SignUpDocument = `
    mutation signUp($input: SignUpInput!) {
  signUp(input: $input) {
    user {
      id
      name
    }
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['signUp'],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
useSignUpMutation.getKey = () => ['signUp'];

export const FindBlessingCellDocument = `
    query findBlessingCell($id: Float!, $transferOutStatus: [UserCellTransferStatus!], $transferOutDateFilter: DateFilter) {
  findCell(id: $id) {
    id
    name
    leaders {
      id
      name
      phone
      isActive
      birthday
      gender
      address
      cell {
        id
        name
      }
      roles
    }
    members {
      id
      name
      phone
      isActive
      birthday
      registrationDate
      gender
      address
      cell {
        id
        name
      }
      roles
    }
    transfersOut(status: $transferOutStatus, orderDate: $transferOutDateFilter) {
      id
      status
      orderDate
      completeDate
      user {
        id
        name
        gender
      }
      fromCell {
        id
        name
      }
      toCell {
        id
        name
      }
    }
  }
}
    `;
export const useFindBlessingCellQuery = <
      TData = FindBlessingCellQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindBlessingCellQueryVariables,
      options?: UseQueryOptions<FindBlessingCellQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindBlessingCellQuery, TError, TData>(
      ['findBlessingCell', variables],
      fetcher<FindBlessingCellQuery, FindBlessingCellQueryVariables>(client, FindBlessingCellDocument, variables, headers),
      options
    );

useFindBlessingCellQuery.getKey = (variables: FindBlessingCellQueryVariables) => ['findBlessingCell', variables];
;

export const FindNewFamilyCellDocument = `
    query findNewFamilyCell($id: Float!, $transferOutStatus: [UserCellTransferStatus!], $transferOutDateFilter: DateFilter) {
  findCell(id: $id) {
    id
    name
    leaders {
      id
      name
      phone
      isActive
      birthday
      gender
      address
      cell {
        id
        name
      }
      roles
    }
    members {
      id
      name
      phone
      isActive
      birthday
      registrationDate
      gender
      address
      cell {
        id
        name
      }
      roles
    }
    transfersOut(status: $transferOutStatus, orderDate: $transferOutDateFilter) {
      id
      status
      orderDate
      completeDate
      user {
        id
        name
        gender
      }
      fromCell {
        id
        name
      }
      toCell {
        id
        name
      }
    }
  }
}
    `;
export const useFindNewFamilyCellQuery = <
      TData = FindNewFamilyCellQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindNewFamilyCellQueryVariables,
      options?: UseQueryOptions<FindNewFamilyCellQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindNewFamilyCellQuery, TError, TData>(
      ['findNewFamilyCell', variables],
      fetcher<FindNewFamilyCellQuery, FindNewFamilyCellQueryVariables>(client, FindNewFamilyCellDocument, variables, headers),
      options
    );

useFindNewFamilyCellQuery.getKey = (variables: FindNewFamilyCellQueryVariables) => ['findNewFamilyCell', variables];
;

export const FindRenewCellDocument = `
    query findRenewCell($id: Float!, $transferOutStatus: [UserCellTransferStatus!], $transferOutDateFilter: DateFilter) {
  findCell(id: $id) {
    id
    name
    leaders {
      id
      name
      phone
      isActive
      birthday
      gender
      address
      cell {
        id
        name
      }
      roles
    }
    members {
      id
      name
      phone
      isActive
      birthday
      registrationDate
      gender
      address
      cell {
        id
        name
      }
      roles
    }
    transfersOut(status: $transferOutStatus, orderDate: $transferOutDateFilter) {
      id
      status
      orderDate
      completeDate
      user {
        id
        name
        gender
      }
      fromCell {
        id
        name
      }
      toCell {
        id
        name
      }
    }
  }
}
    `;
export const useFindRenewCellQuery = <
      TData = FindRenewCellQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindRenewCellQueryVariables,
      options?: UseQueryOptions<FindRenewCellQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindRenewCellQuery, TError, TData>(
      ['findRenewCell', variables],
      fetcher<FindRenewCellQuery, FindRenewCellQueryVariables>(client, FindRenewCellDocument, variables, headers),
      options
    );

useFindRenewCellQuery.getKey = (variables: FindRenewCellQueryVariables) => ['findRenewCell', variables];
;

export const RemoveUserDocument = `
    mutation removeUser($input: RemoveUserFromSeedlingCellInput!) {
  removeUserFromSeedlingCell(input: $input) {
    user {
      id
      name
      description
    }
  }
}
    `;
export const useRemoveUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RemoveUserMutation, TError, RemoveUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RemoveUserMutation, TError, RemoveUserMutationVariables, TContext>(
      ['removeUser'],
      (variables?: RemoveUserMutationVariables) => fetcher<RemoveUserMutation, RemoveUserMutationVariables>(client, RemoveUserDocument, variables, headers)(),
      options
    );
useRemoveUserMutation.getKey = () => ['removeUser'];

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
useCreateCellMutation.getKey = () => ['createCell'];

export const DeleteCellDocument = `
    mutation deleteCell($input: DeleteCellInput!) {
  deleteCell(input: $input) {
    cell {
      id
      name
    }
  }
}
    `;
export const useDeleteCellMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCellMutation, TError, DeleteCellMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCellMutation, TError, DeleteCellMutationVariables, TContext>(
      ['deleteCell'],
      (variables?: DeleteCellMutationVariables) => fetcher<DeleteCellMutation, DeleteCellMutationVariables>(client, DeleteCellDocument, variables, headers)(),
      options
    );
useDeleteCellMutation.getKey = () => ['deleteCell'];

export const FindCellDocument = `
    query findCell($id: Float!) {
  findCell(id: $id) {
    id
    name
    leaders {
      id
      name
      roles
      cell {
        id
        name
      }
    }
    members {
      id
      name
      phone
      isActive
      birthday
      gender
      address
      cell {
        id
        name
      }
      roles
    }
    community
    statistics {
      totalCountOfMembers
      countOfActiveMembers
    }
  }
}
    `;
export const useFindCellQuery = <
      TData = FindCellQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindCellQueryVariables,
      options?: UseQueryOptions<FindCellQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindCellQuery, TError, TData>(
      ['findCell', variables],
      fetcher<FindCellQuery, FindCellQueryVariables>(client, FindCellDocument, variables, headers),
      options
    );

useFindCellQuery.getKey = (variables: FindCellQueryVariables) => ['findCell', variables];
;

export const FindCellListsDocument = `
    query findCellLists($limit: Int) {
  findCells(limit: $limit) {
    nodes {
      id
      name
      community
      leaders {
        id
        name
        roles
      }
    }
  }
}
    `;
export const useFindCellListsQuery = <
      TData = FindCellListsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindCellListsQueryVariables,
      options?: UseQueryOptions<FindCellListsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindCellListsQuery, TError, TData>(
      variables === undefined ? ['findCellLists'] : ['findCellLists', variables],
      fetcher<FindCellListsQuery, FindCellListsQueryVariables>(client, FindCellListsDocument, variables, headers),
      options
    );

useFindCellListsQuery.getKey = (variables?: FindCellListsQueryVariables) => variables === undefined ? ['findCellLists'] : ['findCellLists', variables];
;

export const FindCellWithTranferDataDocument = `
    query findCellWithTranferData($id: Float!, $transferInStatus: [UserCellTransferStatus!], $transferOutStatus: [UserCellTransferStatus!], $transferInDateFilter: DateFilter, $transferOutDateFilter: DateFilter) {
  findCell(id: $id) {
    id
    name
    leaders {
      id
      name
      roles
      cell {
        id
        name
      }
    }
    members {
      id
      name
      roles
      cell {
        id
        name
      }
    }
    community
    transfersIn(status: $transferInStatus, orderDate: $transferInDateFilter) {
      id
      status
      orderDate
      completeDate
      user {
        id
        name
        gender
      }
      fromCell {
        id
        name
      }
      toCell {
        id
        name
      }
    }
    transfersOut(status: $transferOutStatus, orderDate: $transferOutDateFilter) {
      id
      status
      orderDate
      completeDate
      user {
        id
        name
        gender
      }
      fromCell {
        id
        name
      }
      toCell {
        id
        name
      }
    }
  }
}
    `;
export const useFindCellWithTranferDataQuery = <
      TData = FindCellWithTranferDataQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindCellWithTranferDataQueryVariables,
      options?: UseQueryOptions<FindCellWithTranferDataQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindCellWithTranferDataQuery, TError, TData>(
      ['findCellWithTranferData', variables],
      fetcher<FindCellWithTranferDataQuery, FindCellWithTranferDataQueryVariables>(client, FindCellWithTranferDataDocument, variables, headers),
      options
    );

useFindCellWithTranferDataQuery.getKey = (variables: FindCellWithTranferDataQueryVariables) => ['findCellWithTranferData', variables];
;

export const FindCellsDocument = `
    query findCells($limit: Int) {
  findCells(limit: $limit) {
    totalCount
    nodes {
      id
      name
      leaders {
        id
        name
        roles
      }
      community
      statistics {
        totalCountOfMembers
        countOfActiveMembers
      }
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

useFindCellsQuery.getKey = (variables?: FindCellsQueryVariables) => variables === undefined ? ['findCells'] : ['findCells', variables];
;

export const FindCellsWithMembersDocument = `
    query findCellsWithMembers($limit: Int) {
  findCells(limit: $limit) {
    nodes {
      id
      name
      leaders {
        id
        name
        roles
      }
      community
      members {
        id
        name
        roles
        cell {
          id
          name
        }
      }
    }
  }
}
    `;
export const useFindCellsWithMembersQuery = <
      TData = FindCellsWithMembersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindCellsWithMembersQueryVariables,
      options?: UseQueryOptions<FindCellsWithMembersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindCellsWithMembersQuery, TError, TData>(
      variables === undefined ? ['findCellsWithMembers'] : ['findCellsWithMembers', variables],
      fetcher<FindCellsWithMembersQuery, FindCellsWithMembersQueryVariables>(client, FindCellsWithMembersDocument, variables, headers),
      options
    );

useFindCellsWithMembersQuery.getKey = (variables?: FindCellsWithMembersQueryVariables) => variables === undefined ? ['findCellsWithMembers'] : ['findCellsWithMembers', variables];
;

export const FindLeaderDocument = `
    query findLeader($name: String, $limit: Int, $offset: Int) {
  findUsers(name: $name, limit: $limit, offset: $offset) {
    totalCount
    nodes {
      id
      name
      phone
      birthday
      roles
      cell {
        id
        name
      }
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

useFindLeaderQuery.getKey = (variables?: FindLeaderQueryVariables) => variables === undefined ? ['findLeader'] : ['findLeader', variables];
;

export const FindMyCellMembersDocument = `
    query findMyCellMembers {
  myCellMembers {
    id
    name
    phone
    isActive
    birthday
    gender
    address
    description
    roles
    cell {
      id
      name
    }
  }
}
    `;
export const useFindMyCellMembersQuery = <
      TData = FindMyCellMembersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindMyCellMembersQueryVariables,
      options?: UseQueryOptions<FindMyCellMembersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindMyCellMembersQuery, TError, TData>(
      variables === undefined ? ['findMyCellMembers'] : ['findMyCellMembers', variables],
      fetcher<FindMyCellMembersQuery, FindMyCellMembersQueryVariables>(client, FindMyCellMembersDocument, variables, headers),
      options
    );

useFindMyCellMembersQuery.getKey = (variables?: FindMyCellMembersQueryVariables) => variables === undefined ? ['findMyCellMembers'] : ['findMyCellMembers', variables];
;

export const FindNewTransferUserDocument = `
    query findNewTransferUser($id: Float!, $transferOutStatus: [UserCellTransferStatus!], $transferOutDateFilter: DateFilter) {
  findCell(id: $id) {
    id
    name
    leaders {
      id
      name
      roles
      cell {
        id
        name
      }
    }
    members {
      id
      name
      roles
      cell {
        id
        name
      }
    }
    transfersOut(status: $transferOutStatus, orderDate: $transferOutDateFilter) {
      id
      status
      orderDate
      completeDate
      user {
        id
        name
        gender
      }
      fromCell {
        id
        name
      }
      toCell {
        id
        name
      }
    }
  }
}
    `;
export const useFindNewTransferUserQuery = <
      TData = FindNewTransferUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindNewTransferUserQueryVariables,
      options?: UseQueryOptions<FindNewTransferUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindNewTransferUserQuery, TError, TData>(
      ['findNewTransferUser', variables],
      fetcher<FindNewTransferUserQuery, FindNewTransferUserQueryVariables>(client, FindNewTransferUserDocument, variables, headers),
      options
    );

useFindNewTransferUserQuery.getKey = (variables: FindNewTransferUserQueryVariables) => ['findNewTransferUser', variables];
;

export const UpdateCellFieldsDocument = `
    mutation updateCellFields($input: UpdateCellFieldsInput!) {
  updateCellFields(input: $input) {
    cell {
      id
      name
      community
    }
  }
}
    `;
export const useUpdateCellFieldsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCellFieldsMutation, TError, UpdateCellFieldsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCellFieldsMutation, TError, UpdateCellFieldsMutationVariables, TContext>(
      ['updateCellFields'],
      (variables?: UpdateCellFieldsMutationVariables) => fetcher<UpdateCellFieldsMutation, UpdateCellFieldsMutationVariables>(client, UpdateCellFieldsDocument, variables, headers)(),
      options
    );
useUpdateCellFieldsMutation.getKey = () => ['updateCellFields'];

export const UpdateUserCellTransferDocument = `
    mutation updateUserCellTransfer($input: UpdateUserCellTransferInput!) {
  updateUserCellTransfer(input: $input) {
    userCellTransfer {
      id
      user {
        id
        name
      }
      status
      fromCell {
        id
        name
      }
      toCell {
        id
        name
      }
      orderDate
      completeDate
    }
  }
}
    `;
export const useUpdateUserCellTransferMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserCellTransferMutation, TError, UpdateUserCellTransferMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserCellTransferMutation, TError, UpdateUserCellTransferMutationVariables, TContext>(
      ['updateUserCellTransfer'],
      (variables?: UpdateUserCellTransferMutationVariables) => fetcher<UpdateUserCellTransferMutation, UpdateUserCellTransferMutationVariables>(client, UpdateUserCellTransferDocument, variables, headers)(),
      options
    );
useUpdateUserCellTransferMutation.getKey = () => ['updateUserCellTransfer'];

export const CreateUserCellTransferDocument = `
    mutation createUserCellTransfer($input: CreateUserCellTransferInput!) {
  createUserCellTransfer(input: $input) {
    success
  }
}
    `;
export const useCreateUserCellTransferMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserCellTransferMutation, TError, CreateUserCellTransferMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserCellTransferMutation, TError, CreateUserCellTransferMutationVariables, TContext>(
      ['createUserCellTransfer'],
      (variables?: CreateUserCellTransferMutationVariables) => fetcher<CreateUserCellTransferMutation, CreateUserCellTransferMutationVariables>(client, CreateUserCellTransferDocument, variables, headers)(),
      options
    );
useCreateUserCellTransferMutation.getKey = () => ['createUserCellTransfer'];

export const FindUserDocument = `
    query findUser($id: ID!) {
  user(id: $id) {
    id
    name
    phone
    isActive
    birthday
    registrationDate
    gender
    address
    description
    roles
    cell {
      id
      name
    }
  }
}
    `;
export const useFindUserQuery = <
      TData = FindUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindUserQueryVariables,
      options?: UseQueryOptions<FindUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindUserQuery, TError, TData>(
      ['findUser', variables],
      fetcher<FindUserQuery, FindUserQueryVariables>(client, FindUserDocument, variables, headers),
      options
    );

useFindUserQuery.getKey = (variables: FindUserQueryVariables) => ['findUser', variables];
;

export const FindUsersDocument = `
    query findUsers($name: String, $limit: Int, $offset: Int) {
  findUsers(name: $name, limit: $limit, offset: $offset) {
    totalCount
    nodes {
      id
      name
      phone
      isActive
      birthday
      gender
      address
      description
      roles
      cell {
        id
        name
      }
    }
  }
}
    `;
export const useFindUsersQuery = <
      TData = FindUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindUsersQueryVariables,
      options?: UseQueryOptions<FindUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindUsersQuery, TError, TData>(
      variables === undefined ? ['findUsers'] : ['findUsers', variables],
      fetcher<FindUsersQuery, FindUsersQueryVariables>(client, FindUsersDocument, variables, headers),
      options
    );

useFindUsersQuery.getKey = (variables?: FindUsersQueryVariables) => variables === undefined ? ['findUsers'] : ['findUsers', variables];
;

export const RegisterNewUserDocument = `
    mutation registerNewUser($input: RegisterNewUserInput!) {
  registerNewUser(input: $input) {
    user {
      id
      name
    }
  }
}
    `;
export const useRegisterNewUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterNewUserMutation, TError, RegisterNewUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterNewUserMutation, TError, RegisterNewUserMutationVariables, TContext>(
      ['registerNewUser'],
      (variables?: RegisterNewUserMutationVariables) => fetcher<RegisterNewUserMutation, RegisterNewUserMutationVariables>(client, RegisterNewUserDocument, variables, headers)(),
      options
    );
useRegisterNewUserMutation.getKey = () => ['registerNewUser'];

export const ResetUserPasswordDocument = `
    mutation resetUserPassword($input: ResetUserPasswordInput!) {
  resetUserPassword(input: $input) {
    user {
      id
      name
    }
  }
}
    `;
export const useResetUserPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ResetUserPasswordMutation, TError, ResetUserPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ResetUserPasswordMutation, TError, ResetUserPasswordMutationVariables, TContext>(
      ['resetUserPassword'],
      (variables?: ResetUserPasswordMutationVariables) => fetcher<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>(client, ResetUserPasswordDocument, variables, headers)(),
      options
    );
useResetUserPasswordMutation.getKey = () => ['resetUserPassword'];

export const SearchUsersDocument = `
    query searchUsers($name: String, $limit: Int, $offset: Int) {
  findUsers(name: $name, limit: $limit, offset: $offset) {
    totalCount
    nodes {
      id
      name
      phone
      isActive
      birthday
      gender
      address
      description
      registrationDate
      roles
      cell {
        id
        name
      }
    }
  }
}
    `;
export const useSearchUsersQuery = <
      TData = SearchUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SearchUsersQueryVariables,
      options?: UseQueryOptions<SearchUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchUsersQuery, TError, TData>(
      variables === undefined ? ['searchUsers'] : ['searchUsers', variables],
      fetcher<SearchUsersQuery, SearchUsersQueryVariables>(client, SearchUsersDocument, variables, headers),
      options
    );

useSearchUsersQuery.getKey = (variables?: SearchUsersQueryVariables) => variables === undefined ? ['searchUsers'] : ['searchUsers', variables];
;

export const UpdateUserDocument = `
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
      id
      name
      phone
      isActive
      birthday
      gender
      address
      cell {
        id
        name
      }
      roles
      description
    }
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['updateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
useUpdateUserMutation.getKey = () => ['updateUser'];
