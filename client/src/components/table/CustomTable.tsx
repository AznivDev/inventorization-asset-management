import { useCallback, useEffect, useMemo, useState } from "react";

import { showSuccessToast } from "../../utils/common";
import { CustomTableNavbar, ITableNavbarProps } from "./CustomTableNavbar";

type TRow = { id: number; [key: string]: any };

interface IProps extends ITableNavbarProps {
  data: TRow[];
  headers: string[];
  className?: string;
  selected?: number[];
  multiSelect?: boolean;
  onBulkSelect?: () => void;
  onSelect?: (id: number) => void;
  onRowEdit?: (id: number) => void;
}

export const CustomTable = (props: IProps) => {
  const [finalData, setFinalData] = useState<TRow[]>([]);
  const { headers, data, multiSelect, selected, className, onSelect, onRowEdit, onBulkSelect, lastPage } = props;

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const convertHeaders = useCallback((header: string): string => {
    return header
      .split(/(?=[A-Z])/)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ")
      .toUpperCase();
  }, []);

  const handleOnSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;

      const searchedData = data.filter((row: TRow) => {
        const values = Object.values(row);

        return values.some((value) =>
          value ? value.toString().toLowerCase().includes(inputValue.toLowerCase()) : false
        );
      });

      setFinalData(searchedData);
    },
    [data]
  );

  const handleOnCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    showSuccessToast("Copied to clipboard!");
  };

  const convertedHeaders = useMemo(() => headers.map(convertHeaders), [headers, convertHeaders]);

  return (
    <div className="table-container d-flex flex-column mb-4">
      <CustomTableNavbar onChange={handleOnSearchChange} lastPage={lastPage} />

      <div className="table-responsive">
        <table className={`table table-hover table-bordered ${className ?? ""}`}>
          <thead className="text-dark">
            <tr className="text-center">
              {multiSelect && onSelect && (
                <th>
                  <button className="btn btn-outline-success m-0 py-0 px-1 shadow-none" onClick={onBulkSelect}>
                    <i className="fa fa-check"></i>
                  </button>
                </th>
              )}
              {convertedHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {finalData.map((model, _) => (
              <tr key={model.id}>
                {multiSelect && onSelect && (
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-box"
                      onChange={() => onSelect(model.id)}
                      checked={selected?.includes(model.id)}
                    />
                  </td>
                )}
                {Object.values(model)
                  .slice(0, headers.length)
                  .map((value, index) => {
                    const isLong = value?.toString().length > 30;
                    const formattedValue = isLong ? value.slice(0, 25) + "..." : value;

                    return (
                      <td key={index}>
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="col">{formattedValue ?? "-"}</div>{" "}
                          {isLong && (
                            <i
                              className="col-1 fa-regular fa-clone text-success cursor-pointer"
                              onClick={() => handleOnCopy(value)}
                            ></i>
                          )}
                        </div>
                      </td>
                    );
                  })}
                {onRowEdit && (
                  <td onClick={() => onRowEdit(model.id)}>
                    <i className="fa fa-edit text-success cursor-pointer"></i>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
