type Props = {
  toCellName: string;
};

const TransferTooltip = ({toCellName}: Props) => {
  return (
    <span className="text-white bg-emerald-500 px-2 py-1 rounded-full text-xs">
      {`셀편성중 - ${toCellName}`}
    </span>
  );
};

export default TransferTooltip;
