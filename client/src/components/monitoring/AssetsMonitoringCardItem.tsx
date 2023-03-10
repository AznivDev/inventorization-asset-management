import { IMonitoringAssetType } from "../../data/models/monitoring";

interface IProps extends IMonitoringAssetType {}

export const AssetsMonitoringCardItem = (props: IProps) => {
  const { name, description, assetsCount } = props;

  return (
    <li className="list-group-item d-flex justify-content-between py-3">
      <div>
        <div className="card-item-title fs-5 font-weight-bolder">{name}</div>
        <small className="text-muted">{description}</small>
      </div>
      <div className="col"></div>
      <h6 className="text-secondary text-end">Assets Count: {assetsCount}</h6>
    </li>
  );
};
