import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";
import { CustomDoughnutChart } from "../chart/CustomDoughnutChart";
import { AssetsMonitoringCard } from "./AssetsMonitoringCard";

export const AssetsMonitoringRow = () => {
  const { types, requestsCounts } = useAppSelector(
    (state: RootState) => state.monitoring
  );

  return (
    <div className="monitoring-row row gap-3 gap-lg-0">
      <div className="col-12 col-lg-6">
        <AssetsMonitoringCard />
      </div>
      <div className="col-12 col-lg-6 row gap-4 gap-lg-0">
        <div className="col-12 col-lg-6">
          <CustomDoughnutChart
            title="Count"
            labels={types?.map((t) => t.name) ?? []}
            data={types?.map((t) => t.assetsCount) ?? []}
          />
        </div>
        <div className="col-12 col-lg-6">
          <CustomDoughnutChart
            title="Requsts"
            labels={Object.keys(requestsCounts ?? {})}
            data={Object.values(requestsCounts ?? {})}
          />
        </div>
      </div>
    </div>
  );
};
