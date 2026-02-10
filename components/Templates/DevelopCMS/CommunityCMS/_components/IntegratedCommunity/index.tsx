import {useMemo, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {
  createIntegratedCommunity,
  deleteIntegratedCommunity,
  getIntegratedCommunities,
} from "../../../../../../firebase/CMS/CommunityCMS";

type Props = {};

const IntegratedCommunity = ({}: Props) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const {isLoading, data, isError, error} = useQuery(
    ["getIntegratedCommunities"],
    () => getIntegratedCommunities(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  );

  const createMutation = useMutation({
    mutationFn: createIntegratedCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getIntegratedCommunities"]});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIntegratedCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getIntegratedCommunities"]});
    },
  });

  const normalizedName = useMemo(() => name.trim(), [name]);

  const sorted = useMemo(() => {
    const list = data ?? [];
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  const nameExists = useMemo(() => {
    if (!normalizedName) return false;
    return (data ?? []).some((c) => c.name === normalizedName);
  }, [data, normalizedName]);

  const onAdd = () => {
    if (!normalizedName) return;
    if (nameExists) return;

    createMutation.mutate(normalizedName, {
      onSuccess: () => setName(""),
    });
  };

  const onDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") onAdd();
  };

  return (
    <div className="w-full">
      <div className="text-lg font-semibold text-gray-900">공동체 관리</div>
      <p className="mt-1 text-sm text-gray-600">
        공동체를 추가/삭제하고 관리해주세요. <br /> (주의!!) 셀정보의 공동체
        이름을 꼭 맞춰주세요.
      </p>

      <div className="w-full grid grid-cols-2 mt-6">
        <div className="">
          <div className="flex items-end gap-2">
            <div className="basis-2/4">
              <label className="block text-sm text-gray-700 mb-1">이름</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder='예: "빛8"'
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                disabled={createMutation.isLoading}
              />
            </div>

            <button
              type="button"
              onClick={onAdd}
              disabled={
                createMutation.isLoading || !normalizedName || nameExists
              }
              className="px-4 py-2 rounded-md bg-gray-900 text-white disabled:opacity-50"
            >
              {createMutation.isLoading ? "등록중" : "등록"}
            </button>
          </div>
          <div className="mt-1 text-xs">
            {!normalizedName ? (
              <span className="text-gray-500">이름을 입력해주세요.</span>
            ) : nameExists ? (
              <span className="text-red-600">이미 존재하는 공동체입니다.</span>
            ) : (
              <span className="text-gray-500">Enter로 등록할 수 있습니다.</span>
            )}
          </div>

          <>
            {(createMutation.error ||
              deleteMutation.error ||
              (isError && error)) && (
              <div className="mt-3 text-sm text-red-600">
                "에러가 발생했어요."
              </div>
            )}
          </>
        </div>

        <div className="w-full border border-gray-200 rounded-md overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 text-sm text-gray-700">
            목록{" "}
            {isLoading ? (
              <span className="text-gray-500">(불러오는 중)</span>
            ) : (
              <span className="text-gray-500">({sorted.length})</span>
            )}
          </div>

          <ul>
            {isLoading && (
              <li className="px-4 py-6 text-sm text-gray-500">
                불러오는 중...
              </li>
            )}

            {!isLoading && sorted.length === 0 && (
              <li className="px-4 py-6 text-sm text-gray-500">
                아직 등록된 공동체가 없습니다.
              </li>
            )}

            {!isLoading &&
              sorted.map((it) => {
                const isDeleting = deleteMutation.isLoading
                  ? deleteMutation.variables === it.id
                  : false;

                return (
                  <li
                    key={it.id}
                    className="px-4 py-3 flex items-center justify-between border-t border-gray-200"
                  >
                    <span className="text-sm text-gray-900">{it.name}</span>

                    <button
                      type="button"
                      onClick={() => onDelete(it.id)}
                      disabled={deleteMutation.isLoading}
                      className="text-sm text-red-600 disabled:opacity-50"
                      title={it.id}
                    >
                      {isDeleting ? "삭제중" : "삭제"}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntegratedCommunity;
