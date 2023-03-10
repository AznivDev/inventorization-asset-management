interface IProps {
  className?: string;
}

export const LoadingSpinner = (props: IProps) => {
  const { className } = props;

  return (
    <div
      className={`spinner-grow text-light ${className ?? ""}`}
      role="status"
    ></div>
  );
};
