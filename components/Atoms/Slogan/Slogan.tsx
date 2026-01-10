interface SloganProps {}

const Slogan = ({}: SloganProps) => {
  return (
    <div className="flex text-right mt-3">
      <p className="whitespace-pre-line text-2xl font-nanumBrush font-semibold text-cyan-700 tracking-wider">
        {`일어나 빛을 발하라`}
      </p>
    </div>
  );
};

export default Slogan;
