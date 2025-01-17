import BlockContainer from "../../../Atoms/Container/BlockContainer";
import {ComboChart} from "../../../ui/ComboChart";

type AttendanceStatisticProps = {};

const chartdata = [
  {
    date: "Jan 23",
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: "Feb 23",
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: "Mar 23",
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: "Apr 23",
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: "May 23",
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 23",
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: "Jul 23",
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: "Aug 23",
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: "Sep 23",
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: "Oct 23",
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: "Nov 23",
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: "Dec 23",
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

const AttendanceStatistic = ({}: AttendanceStatisticProps) => {
  return (
    <BlockContainer firstBlock>
      {/* <MetricsOverview /> */}
      <div>개발중입니다...</div>
      <ComboChart
        data={chartdata}
        index="date"
        enableBiaxial={true}
        barSeries={{
          categories: ["SolarPanels"],
          yAxisLabel: "Solar Panels (Bars)",
        }}
        lineSeries={{
          categories: ["Inverters"],
          showYAxis: true,
          yAxisLabel: "Inverters (Line)",
          colors: ["amber"],
          yAxisWidth: 60,
        }}
      />
    </BlockContainer>
  );
};

export default AttendanceStatistic;
