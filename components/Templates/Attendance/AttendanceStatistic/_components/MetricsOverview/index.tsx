import MetricBox from "./_components/MetricBox";

type Props = {};

const MetricsOverview = ({}: Props) => {
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <MetricBox
        title="인터치예배 성전 출석"
        number="387"
        compare="-10명 지난주대비"
      />
      <MetricBox
        title="인터치예배 성전 출석 (셀편성)"
        number="311"
        compare="-3명 지난주대비"
      />
      <MetricBox
        title="인터치예배 성전 출석 (셀미편성)"
        number="76"
        compare="-7명 지난주대비"
      />
      <MetricBox
        title="출석체크인원 (3부~5부)"
        number="330"
        compare="+5명 지난주대비"
      />
    </div>
  );
};

export default MetricsOverview;
