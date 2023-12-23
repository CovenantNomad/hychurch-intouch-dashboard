import React from 'react';
import SectionContainer from '../Container/SectionContainer';
import BlockContainer from '../Container/BlockContainer';

const SkeletonMemberInfo = () => {
  return (
    <>
      <div className="px-2 pt-2">
        <div className="flex items-center space-x-5 py-5 px-4 rounded-md bg-white">
          <div className="animate-pulse h-4 w-20 bg-gray-200 rounded-md" />
          <div className="animate-pulse h-4 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
      <SectionContainer>
        <BlockContainer firstBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <div className="border px-4 py-4 rounded-md bg-white space-y-6">
                <div className="flex justify-evenly">
                  <div className="w-full space-y-2">
                    <div className="animate-pulse h-1.5 w-8 bg-gray-200 rounded-md" />
                    <div className="animate-pulse h-2 w-20 bg-gray-200 rounded-md" />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="animate-pulse h-1.5 w-8 bg-gray-200 rounded-md" />
                    <div className="animate-pulse h-2 w-20 bg-gray-200 rounded-md" />
                  </div>
                </div>
                <div className="flex justify-evenly">
                  <div className="w-full space-y-2">
                    <div className="animate-pulse h-1.5 w-8 bg-gray-200 rounded-md" />
                    <div className="animate-pulse h-2 w-20 bg-gray-200 rounded-md" />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="animate-pulse h-1.5 w-8 bg-gray-200 rounded-md" />
                    <div className="animate-pulse h-2 w-20 bg-gray-200 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="h-[102px] flex justify-center items-center border px-4 py-4 rounded-md bg-white space-y-6">
                <div className="animate-pulse h-6 w-36 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>
        </BlockContainer>
      </SectionContainer>
    </>
  );
};

export default SkeletonMemberInfo;
