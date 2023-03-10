import { LoadingSpinner } from "./LoadingSpinner";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  py?: number;
  icon?: string;
  label: string;
  isLoading?: boolean;
  styleType?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const CustomButton = (props: IProps) => {
  const { className, label, icon, type, isLoading, py, disabled, styleType, onClick } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`btn btn-${styleType ?? "primary"} btn-custom shadow-none text-uppercase py-${py ?? 3} ${
        className ?? ""
      }`}
    >
      {icon && <i className={`fa fa-${icon} mx-3`}></i>}
      {isLoading ? <LoadingSpinner /> : label}
    </button>
  );
};
