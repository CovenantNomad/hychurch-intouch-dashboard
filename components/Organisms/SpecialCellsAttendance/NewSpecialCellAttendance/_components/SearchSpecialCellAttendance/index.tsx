import {
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {Dispatch, Fragment, useEffect, useMemo, useState} from "react";
import {selectedAttendanceMember} from "../../../../../../interface/attendance";
import {SimpleMemberWithRole} from "../../../../../../interface/user";
import {
  escapeRegExp,
  getGender,
  normalize,
} from "../../../../../../utils/utils";

type Props = {
  people: SimpleMemberWithRole[];
  selectedMember: selectedAttendanceMember | null;
  onSelectMember: Dispatch<
    React.SetStateAction<selectedAttendanceMember | null>
  >;
};

const highlightText = (text: string, query: string) => {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const regex = new RegExp(`(${escapeRegExp(trimmed)})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={`${part}-${index}`} className="rounded bg-yellow-200 px-0.5">
        {part}
      </span>
    ) : (
      <Fragment key={`${part}-${index}`}>{part}</Fragment>
    ),
  );
};

const SearchSpecialCellAttendance = ({
  people,
  selectedMember,
  onSelectMember,
}: Props) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredPeople = useMemo(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) return [];

    const normalizedQuery = normalize(trimmed);

    return people.filter((person) =>
      normalize(person.name).includes(normalizedQuery),
    );
  }, [people, debouncedQuery]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">1. 인원 선택</h2>
        <p className="mt-1 text-xs text-gray-500">
          이름으로 검색 후 인원을 선택하세요.
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-center rounded-lg border border-gray-300 px-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름으로 검색"
            className="h-10 w-full border-0 bg-transparent pl-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {selectedMember && (
          <div className="mt-3 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
            <div className="text-sm text-blue-700">
              현재 선택:{" "}
              <span className="font-semibold">{selectedMember.userName}</span>
            </div>

            <button
              type="button"
              onClick={() => onSelectMember(null)}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
            >
              <XMarkIcon className="h-4 w-4" />
              선택 취소
            </button>
          </div>
        )}

        {debouncedQuery.trim() !== "" && (
          <div className="mt-3 rounded-lg border border-gray-200">
            {filteredPeople.length > 0 ? (
              <ul className="max-h-[740px] overflow-y-auto">
                {filteredPeople.map((person) => {
                  const isSelected = selectedMember?.userId === person.id;

                  return (
                    <li
                      key={person.id}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onSelectMember({
                            userId: person.id,
                            userName: person.name,
                          })
                        }
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <UserIcon className="h-4 w-4 text-gray-500" />
                        </div>

                        <div className="min-w-0 flex-1 flex ju">
                          <p className="text-sm font-medium text-gray-900">
                            {highlightText(person.name, debouncedQuery)}{" "}
                            {person.gender && getGender(person.gender)}
                          </p>
                          <span className="text-sm ml-2">
                            ({person.birthday?.split("-")[0]} 년생)
                          </span>
                        </div>

                        {isSelected && (
                          <span className="text-xs font-medium text-blue-600">
                            선택됨
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSpecialCellAttendance;
