import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";
import { MonitoringRowItem } from "./MonitoringRowItem";

export const MonitoringRow = () => {
  const { counts } = useAppSelector((state: RootState) => state.monitoring);

  return (
    <div className="monitoring-row row flex-column flex-lg-row gap-2">
      <MonitoringRowItem title="Asset Types" value={counts?.assetTypes} />
      <MonitoringRowItem
        title="Available Assets"
        value={counts?.availableAssets}
      />
      <MonitoringRowItem
        title="Pending Requests"
        value={counts?.pendingRequests}
      />
      <MonitoringRowItem
        title="Registered Accounts"
        value={counts?.registeredUsers}
      />
      <MonitoringRowItem title="Roles" value={counts?.roles} />
    </div>
  );
};
