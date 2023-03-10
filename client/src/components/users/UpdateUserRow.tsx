import { RefObject } from "react";

import { CustomButton } from "../CustomButton";
import { FormInput } from "../FormInput";

interface IProps {
  headers: string[];
  className?: string;
  onSubmit?: () => void;
  nameRef?: RefObject<HTMLInputElement>;
  lastNameRef?: RefObject<HTMLInputElement>;
  emailRef?: RefObject<HTMLInputElement>;
}

export const UpdateUserRow = (props: IProps) => {
  const { headers, nameRef, lastNameRef, emailRef, className, onSubmit } = props;

  const inputsRefs = [nameRef, lastNameRef, emailRef];

  return (
    <div>
      <div className="d-flex align-items-center gap-4">
        <div className={`d-flex justify-content-between gap-2 w-100 ${className ?? ""}`}>
          {headers.map((header) => (
            <FormInput
              key={header}
              type={header}
              name={header}
              label={header}
              className="w-100"
              onChange={() => {}}
              placeholder={`Enter ${header}`}
              inputRef={inputsRefs[headers.indexOf(header)]}
            />
          ))}
        </div>
        <CustomButton label="" icon="check" styleType="success" className="w-25" py={2} onClick={onSubmit} />
      </div>
    </div>
  );
};
