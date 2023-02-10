import React from 'react';
import { Member } from '../../../interface/user';
import EmptyStateSimple from '../../Atoms/EmptyStates/EmptyStateSimple';
import TableBody from './parts/TableBody';
import TableHeader from './parts/TableHeader';

interface TableProps {
  members: Member[] | undefined
}

const Table = ({ members }: TableProps) => {

  return (
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          {members ? (
            <table className="min-w-full">
              <TableHeader />
              <TableBody members={members}/>
            </table>
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
