import React from 'react';
import { Card, Title, Flex, Text, BarList, Bold } from "@tremor/react";
import { trackerType } from '../../../interface/ui';

interface AttendanceStateCardProps {
  title: string;
  numOfOtherServiceAttended: number;
  numOfattended: number;
  searchRange: number;
}

const AttendanceNumberCard = ({ title, numOfattended, numOfOtherServiceAttended, searchRange }: AttendanceStateCardProps) => {

  return (
    <Card className="max-w-sm mx-auto">
      <Title>{title}</Title>
      <Flex className="mt-4 mb-2">
        <Text>
          <Bold>예배</Bold>
        </Text>
        <Text>
          <Bold>참석</Bold>
        </Text>
      </Flex>
      <BarList 
        data={[
          {
            name: '인터치예배',
            value: numOfattended
          },
          {
            name: '1~4부예배',
            value: numOfOtherServiceAttended
          },
          {
            name: '미출석',
            value: Number(searchRange) - numOfattended - numOfOtherServiceAttended
          },
        ]} 
        className="mt-2" 
      />
  </Card>
  );
};

export default AttendanceNumberCard;
