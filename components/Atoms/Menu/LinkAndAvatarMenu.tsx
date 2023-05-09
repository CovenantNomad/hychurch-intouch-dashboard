import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Avatar from "../Avatar";
import { AvatarSize } from "../Avatar";
import { getFirstName } from "../../../utils/utils";
import Link from "next/link";

interface LinkAndAvatarMenuProps {
  title: string;
}

const submited = [
  {
    id: 0,
    name: "강소은셀",
  },
  {
    id: 1,
    name: "김파비오셀",
  },
  {
    id: 2,
    name: "남정훈셀",
  },
  {
    id: 3,
    name: "김별셀",
  },
];

const LinkAndAvatarMenu = ({ title }: LinkAndAvatarMenuProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
      <div>
        <p className="text-sm font-semibold leading-6 text-gray-900">{title}</p>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <Link href={`/reports/cellreports/${2}`}>
            <p>자세히보기</p>
          </Link>
        </div>
      </div>
      <dl className="flex w-full items-center justify-between gap-x-8 sm:w-auto">
        <div className="flex -space-x-1.5">
          <dt className="sr-only">Commenters</dt>
          {submited.map((commenter) => (
            <dd key={commenter.id}>
              <div className="h-8 w-8 flex justify-center items-center rounded-full bg-gray-50 ring-2 ring-white">
                <span className="text-xs font-medium leading-none">
                  {getFirstName(commenter.name)}
                </span>
              </div>
            </dd>
          ))}
        </div>
        <div className="flex w-16 gap-x-2.5">
          <dt>
            <span className="sr-only">Total comments</span>
            <CheckCircleIcon
              className="h-6 w-6 text-green-600"
              aria-hidden="true"
            />
          </dt>
          <dd className="text-sm leading-6 text-gray-900">24</dd>
        </div>
      </dl>
    </div>
  );
};

export default LinkAndAvatarMenu;
