type Props = {
  userId: string;
};

const AmazingMenteeBlock = ({userId}: Props) => {
  return (
    <div className="border px-4 py-4 rounded-md">
      <h3 className="text-base font-medium">어메이징 과정</h3>
      <div className="mt-4">현재 개발중..</div>
    </div>
  );
};

export default AmazingMenteeBlock;
