import {cx} from "../../../utils/utils";

type Props = {
  className?: string;
};

const Skeleton = ({className}: Props) => {
  return (
    <div className={cx("animate-pulse bg-gray-100 rounded-lg", className)} />
  );
};

export default Skeleton;
