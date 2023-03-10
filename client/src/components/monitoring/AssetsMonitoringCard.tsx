import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";
import { AssetsMonitoringCardItem } from "./AssetsMonitoringCardItem";

export const AssetsMonitoringCard = () => {
  const { types } = useAppSelector((state: RootState) => state.monitoring);

  return (
    <div className="card">
      <div className="card-nav d-flex align-items-top justify-content-between p-3 py-3">
        <div>
          <h5 className="card-title">Available Assets by Type</h5>
          <small className="text-muted">
            Count: <b>{types && types.length}</b>
          </small>
        </div>
      </div>
      <ul className="card-body list-group list-group-flush pt-0 py-0">
        {types && types.slice(0, 5).map((t) => <AssetsMonitoringCardItem key={t.name} {...t} />)}
      </ul>
    </div>
  );
};
