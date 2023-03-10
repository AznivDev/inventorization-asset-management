import { LoadingSpinner } from "../LoadingSpinner";

interface IProps {
  title: string;
  value?: number;
}

export const MonitoringRowItem = (props: IProps) => {
  const { title, value } = props;

  return (
    <div className="col">
      <div className="card rounded py-4 d-flex flex-column align-items-center justify-content-center">
        <h6 className="text-darker text-uppercase font-weight-bolder">
          {title}
        </h6>
        <h1 className="font-weight-bold text-dark">
          {value ?? <LoadingSpinner />}
        </h1>
      </div>
    </div>
  );
};
