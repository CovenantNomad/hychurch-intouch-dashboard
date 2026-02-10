//hooks
import {useQuery} from "react-query";
import {getIntegratedCommunities} from "../../../../firebase/CMS/CommunityCMS";
import useCellDallants from "../../../../hooks/useCellDallants";
//components
import {useMemo} from "react";
import {sortCommunityNames} from "../../../../utils/utils";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import CellDallantList from "../CellDallantList";
import CellDallantListItem from "../CellDallantListItem";

type IntegratedCommunity = {id: string; name: string};

const COMMUNITY_STYLE = [
  {bgColor: "bg-[#FF808B]/30", titleColor: "text-rose-500"},
  {bgColor: "bg-orange-100/80", titleColor: "text-orange-500"},
  {bgColor: "bg-amber-100/80", titleColor: "text-amber-500"},
  {bgColor: "bg-teal-100/80", titleColor: "text-teal-500"},
  {bgColor: "bg-sky-100/80", titleColor: "text-sky-500"},
  {bgColor: "bg-indigo-100/80", titleColor: "text-indigo-500"},
  {bgColor: "bg-emerald-100/80", titleColor: "text-emerald-500"},
] as const;

const CellDallantSection = () => {
  const {isLoading, cellDallants} = useCellDallants();

  const {isLoading: isCommunityLoading, data: communities} = useQuery(
    ["getIntegratedCommunities"],
    () => getIntegratedCommunities(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  );

  const orderedCommunities = useMemo(() => {
    const list = (communities ?? []) as IntegratedCommunity[];
    return [...list].sort(sortCommunityNames);
  }, [communities]);

  // cellDallants를 communityName 기준으로 그룹핑
  const dallantsByCommunity = useMemo(() => {
    const grouped: Record<string, typeof cellDallants> = {};
    (cellDallants ?? []).forEach((item) => {
      const key = item.community?.trim() || "미분류";
      (grouped[key] ??= []).push(item);
    });

    // 각 그룹 내부 정렬
    Object.keys(grouped).forEach((key) => {
      const arr = grouped[key];
      if (!arr) return; // TS 안심 + 방어
      arr.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    });

    return grouped as Record<string, NonNullable<typeof cellDallants>>;
  }, [cellDallants]);

  const isPageLoading = isLoading || isCommunityLoading;

  return (
    <div>
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          셀별 달란트 현황
        </h2>
        {isPageLoading ? (
          <div className="grid grid-cols-5 gap-x-4 mt-4">
            {Array.from({length: 4}).map((_, index) => (
              <div
                key={index}
                className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]"
              >
                <div className="h-[8px] w-1/2 bg-slate-200 rounded justify-items-end"></div>
                <div className="h-[6px] w-1/3 bg-slate-200 rounded"></div>
                <div className="h-[6px] w-1/3 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {cellDallants ? (
              <div className="grid grid-cols-5 gap-x-4 mt-4">
                {orderedCommunities.map((c, idx) => {
                  const style = COMMUNITY_STYLE[idx % COMMUNITY_STYLE.length];
                  const communityCells = dallantsByCommunity[c.name] ?? [];

                  return (
                    <CellDallantList
                      key={c.id}
                      cellName={c.name}
                      bgColor={style.bgColor}
                      titleColor={style.titleColor}
                    >
                      {communityCells.map((item) => (
                        <CellDallantListItem
                          key={item.id}
                          cellId={item.id}
                          cellName={item.name}
                          participants={item.participants}
                          totalAmount={item.totalAmount}
                        />
                      ))}
                    </CellDallantList>
                  );
                })}
              </div>
            ) : (
              <div className="py-8">
                <EmptyStateSimple />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CellDallantSection;
