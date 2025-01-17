interface SloganProps {}

const Slogan = ({}: SloganProps) => {
  return (
    <div className="flex text-right mt-3">
      <p className="whitespace-pre-line text-2xl font-nanumBrush font-semibold text-cyan-700 tracking-wider">
        {`내 삶의 주인 예수 그리스도!`}
      </p>
    </div>
  );
};

export default Slogan;
