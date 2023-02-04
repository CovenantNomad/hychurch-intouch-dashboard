import React from "react";

interface SimpleStatProps {
  header?: string;
  row?: boolean;
  stats: {
    name: string;
    number: number;
  }[];
}

const SimpleStat = ({ stats, header, row, ...props }: SimpleStatProps) => {
  return (
    <div>
      {header && (
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {header}
        </h3>
      )}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className={`${
              row ? "flex items-center justify-between" : "block"
            } overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6`}
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.number}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default SimpleStat;
