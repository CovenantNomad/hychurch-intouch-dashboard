import React from 'react';
import { classNames } from '../../../utils/utils';

const Skeleton = ({...props}) => {
  return (
    <div className={classNames('animate-pulse bg-slate-200 rounded-lg', props.className)}/>
  );
};

export default Skeleton;
