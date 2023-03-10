import { RefObject, useEffect, useMemo } from "react";

import { ISelectOption } from "../../common/interfaces";
import { RootState } from "../../store/store";
import { dispatchAllRolesAction } from "../../store/users/actions";
import { useAppSelector } from "../../utils/hooks/store";
import { CustomButton } from "../CustomButton";
import { FormInput } from "../FormInput";
import { FormSelect } from "../FormSelect";
import { CreateNewRowWrapper } from "../shared/CreateNewRowWrapper";

interface IProps {
  headers: string[];
  className?: string;
  onSubmit?: () => void;
  nameRef?: RefObject<HTMLInputElement>;
  lastNameRef?: RefObject<HTMLInputElement>;
  emailRef?: RefObject<HTMLInputElement>;
  passwordRef?: RefObject<HTMLInputElement>;
  onSelectRole: (id: any) => void;
}

export const CreateNewUserRow = (props: IProps) => {
  const { headers, nameRef, lastNameRef, emailRef, passwordRef, onSelectRole, className, onSubmit } = props;

  const { roles } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatchAllRolesAction();
  }, []);

  const options = useMemo((): ISelectOption[] => roles.map((role) => ({ value: role.id, label: role.name })), [roles]);

  const inputsRefs = [nameRef, lastNameRef, emailRef, passwordRef];

  return (
    <>
      <CreateNewRowWrapper>
        <div className={`d-flex justify-content-between gap-2 w-100 flex-column flex-lg-row ${className ?? ""}`}>
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
          <FormSelect name="Role" label="Role" className="w-75" onChange={onSelectRole} options={options} />
        </div>
        <CustomButton label="" icon="check" styleType="success" className="w-100 w-lg-25" py={2} onClick={onSubmit} />
      </CreateNewRowWrapper>
      <div className="d-flex mt-lg-0 mt-4 mb-3">
        Password Minimum Requirements:
        <ul className="d-flex gap-5 text-secondary">
          <li>Minimum Length: 6</li>
          <li>At Least one uppercase</li>
          <li>At Least one lowercase</li>
          <li>At Least one number</li>
        </ul>
      </div>
    </>
  );
};
