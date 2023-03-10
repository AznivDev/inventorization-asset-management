import { RefObject } from "react";

import { CustomButton } from "../CustomButton";
import { FormInput } from "../FormInput";
import { CreateNewRowWrapper } from "../shared/CreateNewRowWrapper";

interface IProps {
  headers: string[];
  className?: string;
  onSubmit?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export const CreateNewRequestRow = (props: IProps) => {
  const { headers, inputRef, className, onSubmit } = props;

  return (
    <CreateNewRowWrapper>
      <div className={`d-flex justify-content-between gap-2 w-100 ${className ?? ""}`}>
        {headers.map((header) => (
          <FormInput
            key={header}
            type="text"
            name={header}
            label={header}
            className="w-100"
            onChange={() => {}}
            inputRef={inputRef}
            placeholder={`Enter ${header}`}
          />
        ))}
      </div>
      <CustomButton label="" icon="check" styleType="success" className="w-100 w-lg-25" py={2} onClick={onSubmit} />
    </CreateNewRowWrapper>
  );
};
