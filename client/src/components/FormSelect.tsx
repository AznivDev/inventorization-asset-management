import React from "react";

import { ISelectOption } from "../common/interfaces";

interface IProps {
  name: string;
  value?: string;
  label: string;
  className?: string;
  options: ISelectOption[];
  onChange: (value: string | number) => void;
}

export const FormSelect = (props: IProps) => {
  let { options, value, label, name, className, onChange } = props;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    value = event.target.value;
    onChange(value);
  };

  return (
    <div className={`form-group ${className ?? ""}`}>
      <label htmlFor={name} className="text-uppercase text-secondary">
        {label}
      </label>
      <select
        name={name}
        defaultValue={value ?? ""}
        onChange={handleSelectChange}
        className="form-control shadow-none py-2 px-3"
      >
        <option value="" disabled>
          Select {name}
        </option>
        {options.map((option, i) => (
          <option value={option.value} key={option.value + i.toString()}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
