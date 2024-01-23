import React from "react";
import SectionContainer from "../../Atoms/Container/SectionContainer";
import SectionTitle from "../../Atoms/Typography/SectionTitle";
import BlockContainer from "../../Atoms/Container/BlockContainer";
import Skeleton from "../../Atoms/Skeleton/Skeleton";


const CellEditLoadingScreen = () => {

  return (
    <SectionContainer>
      <BlockContainer firstBlock>
        <SectionTitle>셀정보 수정</SectionTitle>
          <div className="py-5 bg-white sm:py-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  셀이름
                </label>
                <Skeleton className="w-full h-[38px]" />
              </div>

              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  공동체
                </label>
                <Skeleton className="w-full h-[38px]" />
              </div>
            </div>
          </div>
          <div className="flex justify-end py-3">
            <Skeleton className="w-[82.45px] h-[38px]" />
          </div>
      </BlockContainer>
    </SectionContainer>
  );
};

export default CellEditLoadingScreen;
