import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";
import { CustomAreaChart } from "../chart/CustomAreaChart";
import { CustomVerticalBarChart } from "../chart/CustomVerticalBarChart";

export const ChartMonitoringRow = () => {
  const { requestsCounts } = useAppSelector(
    (state: RootState) => state.monitoring
  );

  return (
    <div className="row gap-3 gap-lg-0">
      <div className="col-12 col-lg-6">
        <CustomVerticalBarChart
          labels={Object.keys(requestsCounts ?? {})}
          data={Object.values(requestsCounts ?? {})}
          title="Requests Monitoring Bar"
          height={150}
        />
      </div>
      <div className="col-12 col-lg-6">
        <CustomAreaChart
          labels={Object.keys(requestsCounts ?? {})}
          data={Object.values(requestsCounts ?? {})}
          title="Request Monitoring Area"
          color="rgb(92, 184, 92)"
          bgColor="rgb(92, 184, 92, 0.5)"
          height={150}
        />
      </div>
    </div>
  );
};
