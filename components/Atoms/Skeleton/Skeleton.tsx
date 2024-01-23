import React from 'react';
import { classNames } from '../../../utils/utils';

const Skeleton = ({...props}) => {
  return (
    <div className={classNames('animate-pulse bg-gray-100 rounded-lg', props.className)}/>
  );
};

export default Skeleton;
