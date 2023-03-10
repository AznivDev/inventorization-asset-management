import { RefObject } from "react";

import "../assets/style/forms.scss";

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  min?: string;
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  validationMessage?: string;
  inputRef?: RefObject<HTMLInputElement>;
}

export const FormInput = (props: IProps) => {
  const {
    label,
    name,
    type,
    required,
    inputRef,
    disabled,
    className,
    placeholder,
    defaultValue,
    validationMessage,
    min,
    onChange,
  } = props;

  return (
    <div className={`form-group ${className ?? ""}`}>
      <label htmlFor={name} className="text-uppercase text-secondary">
        {label}
      </label>
      <input
        min={min}
        id={name}
        name={name}
        type={type}
        ref={inputRef}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="form-control shadow-none py-2 px-3"
      />
      {validationMessage && <small className="text-danger">{validationMessage}</small>}
    </div>
  );
};
