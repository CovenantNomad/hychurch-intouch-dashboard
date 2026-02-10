import {useMemo} from "react";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import {
  FindCellListsQuery,
  FindCellListsQueryVariables,
  useFindCellListsQuery,
} from "../graphql/generated";
//types
import {useQuery} from "react-query";
import {FIND_CELL_LIMIT} from "../constants/constant";
import {getIntegratedCommunities} from "../firebase/CMS/CommunityCMS";
import {
  CellListType,
  CommunityType,
  SpecialCellIdType,
} from "../interface/cell";
import {isSpecialCell, sortByName, sortCommunityNames} from "../utils/utils";

const useCommunity = () => {
  const {
    isLoading: isCellLoading,
    isFetching: isCellFetching,
    data: cellListData,
    isError: isCellError,
    error: cellError,
  } = useFindCellListsQuery<FindCellListsQuery, FindCellListsQueryVariables>(
    graphlqlRequestClient,
    {
      limit: FIND_CELL_LIMIT,
    },
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
    },
  );

  const {
    isLoading: isCommunityLoading,
    data: communities,
    isError: isCommunityError,
    error: communityError,
  } = useQuery(["getIntegratedCommunities"], () => getIntegratedCommunities(), {
    staleTime: 10 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const isLoading = isCellLoading || isCellFetching || isCommunityLoading;
  const isError = isCellError || isCommunityError;
  const error = (cellError ?? communityError) as unknown;

  const nodes = useMemo(
    () => cellListData?.findCells?.nodes ?? [],
    [cellListData],
  );

  const {specialCells, commonCells} = useMemo(() => {
    const special: CellListType[] = [];
    const common: CellListType[] = [];

    for (const cell of nodes) {
      if (isSpecialCell(cell)) special.push(cell);
      else common.push(cell);
    }

    special.sort(sortByName);
    common.sort(sortByName);

    return {specialCells: special, commonCells: common};
  }, [nodes]);

  // commonCells를 community 이름으로 그룹핑
  const commonByCommunityName = useMemo(() => {
    const map = new Map<string, CellListType[]>();

    for (const cell of commonCells) {
      const key = cell.community ?? ""; // 혹시 null이면 빈값
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(cell);
    }

    // 각 그룹 내부 정렬
    map.forEach((arr) => {
      arr.sort(sortByName);
    });

    return map;
  }, [commonCells]);

  const filterByCellName = (a: CellListType, b: CellListType) => {
    if (a.name > b.name) return 1;
    else if (b.name > a.name) return -1;
    else return 0;
  };

  // 커뮤니티 목록(유동)을 기준으로 결과 구성
  const data: CommunityType[] | null = useMemo(() => {
    // 셀 데이터를 못 받았으면 null
    if (!cellListData?.findCells) return null;

    const listFromDb = (communities ?? [])
      .map((c: any) => ({id: c.id as string, name: c.name as string}))
      .filter((c) => !!c.name);

    // "순서"는 DB에 없으니 name 기반 자연정렬로 안정화
    const orderedCommunities = [...listFromDb].sort(sortCommunityNames);

    // 커뮤니티별 cellList 생성 (없으면 빈 배열)
    const communitySections: CommunityType[] = orderedCommunities.map((c) => ({
      id: c.id,
      communityName: c.name,
      cellList: commonByCommunityName.get(c.name) ?? [],
    }));

    // 스페셜은 항상 마지막에 붙임 (원하면 옵션으로)
    const specialSection: CommunityType = {
      id: "SPECIAL",
      communityName: "스페셜",
      cellList: specialCells,
    };

    return [...communitySections, specialSection];
  }, [cellListData, communities, commonByCommunityName, specialCells]);

  // 기존 반환을 최대한 유지: newFamily/blessing/renew 필요하면 여기서 찾아서 반환
  const newFamily = useMemo(
    () =>
      specialCells.find((c) => c.id.includes(SpecialCellIdType.NewFamily)) ??
      null,
    [specialCells],
  );
  const blessing = useMemo(
    () =>
      specialCells.find((c) => c.id.includes(SpecialCellIdType.Blessing)) ??
      null,
    [specialCells],
  );
  const renew = useMemo(
    () =>
      specialCells.find((c) => c.id.includes(SpecialCellIdType.Renew)) ?? null,
    [specialCells],
  );

  return {
    isLoading,
    isError,
    error,
    data,
    newFamily,
    blessing,
    renew,
  };
};

export default useCommunity;
