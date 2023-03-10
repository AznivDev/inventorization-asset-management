import { FormInput } from "../FormInput";
import { CustomTablePagination } from "./CustomTablePagination";

export interface ITableNavbarProps {
  lastPage?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomTableNavbar = (props: ITableNavbarProps) => {
  const { lastPage, onChange } = props;

  return (
    <div className="table-navbar d-flex justify-space-between align-items-end gap-2">
      <FormInput
        name="search"
        className="w-100 w-lg-50"
        onChange={onChange}
        label="On Page Search"
        placeholder="Enter search keyword..."
      />
      {lastPage && <CustomTablePagination last={lastPage ?? 1} className="d-flex justify-content-end w-100" />}
    </div>
  );
};
