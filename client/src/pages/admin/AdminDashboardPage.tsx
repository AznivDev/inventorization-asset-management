import { useEffect } from "react";

import "../../assets/style/dashboard.scss";
import { AssetsMonitoringRow } from "../../components/monitoring/AssetsMonitoringRow";
import { ChartMonitoringRow } from "../../components/monitoring/ChartMonitoringRow";
import { MonitoringRow } from "../../components/monitoring/MonitoringRow";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  dispatchMonitoringAssetTypesAction,
  dispatchMonitoringCountsAction,
  dispatchMonitoringRequestsCountsAction,
} from "../../store/monitoring/actions";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";

const AdminDashboardPage = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatchMonitoringCountsAction();
    dispatchMonitoringRequestsCountsAction();
    dispatchMonitoringAssetTypesAction();
  }, []);

  return user ? (
    <DashboardLayout>
      <div className="d-flex flex-column gap-4">
        <MonitoringRow />
        <ChartMonitoringRow />
        <AssetsMonitoringRow />
      </div>
    </DashboardLayout>
  ) : (
    <></>
  );
};

export default AdminDashboardPage;
