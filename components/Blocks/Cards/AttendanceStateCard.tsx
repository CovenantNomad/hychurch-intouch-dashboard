import React from 'react';
import { Card, Title, Tracker, Flex, Text } from "@tremor/react";
import { trackerType } from '../../../interface/ui';

interface AttendanceStateCardProps {
  title: string;
  minDate: string;
  maxDate: string;
  numOfattended: number;
  numOfOffline: number;
  searchRange: number;
  data: trackerType[]
}

const AttendanceStateCard = ({ title, minDate, maxDate, numOfattended, numOfOffline, searchRange, data }: AttendanceStateCardProps) => {

  return (
    <Card className="max-w-sm mx-auto">
      <Title>{title}</Title>
      <Text>{minDate} ~ {maxDate}</Text>
      <div className='flex flex-col items-end mt-4'>
        <p className='text-base text-gray-600'>청년예배출석률 : <strong>{((numOfattended / searchRange) * 100 || 0).toFixed(1)}%</strong></p>
        <p className='text-base text-gray-600'>성전예배참석률 : <strong>{((numOfOffline / numOfattended) * 100 || 0).toFixed(1)}%</strong></p>
      </div>
      
      <Tracker data={data} className="mt-2" />
      <div className='flex justify-between mt-1'>
        <span className='text-xs text-gray-500'>{minDate}</span>
        <span className='text-xs text-gray-500'>{maxDate}</span>
      </div>
  </Card>
  );
};

export default AttendanceStateCard;
