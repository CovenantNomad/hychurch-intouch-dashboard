import { FaUser, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import StaticList from '../../../Atoms/StackedLists/StaticList';

interface MemberStaticProps {
  totalMembers: number
  activceMembers: number
}

const MemberStatic = ({ totalMembers, activceMembers }: MemberStaticProps) => {

  return (
    <div className='h-full'>
      <div className=' px-4 divide-y rounded-md bg-white'>
        <StaticList 
          icon={<FaUser size={16} />} 
          number={totalMembers} 
          title={'셀원총원'}
        />
        <StaticList 
          icon={<FaUserCheck size={20} />} 
          number={activceMembers} 
          percentage={Math.round(activceMembers/totalMembers*100)}
          title={'활동셀원'}
        />
        <StaticList 
          icon={<FaUserTimes size={20} />} 
          number={totalMembers-activceMembers} 
          percentage={Math.round((totalMembers-activceMembers)/totalMembers*100)}
          title={'비활동셀원'}
        />
      </div>
    </div>
  );
};

export default MemberStatic;
