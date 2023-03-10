import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { dispatchAuthUpdatePasswordAction } from "../../store/auth/actions";
import { showSuccessToast } from "../../utils/common";
import { CustomButton } from "../CustomButton";
import { FormInput } from "../FormInput";

export const AccountPageUpdatePassword = () => {
  const navigate = useNavigate();

  const [invalidForm, setInvalidForm] = useState(false);

  const oldPassword = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordRepeat = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    if (!invalidForm) {
      e.preventDefault();
      dispatchAuthUpdatePasswordAction({
        oldPassword: oldPassword.current!.value,
        password: password.current!.value,
      }).then(() => {
        showSuccessToast("Password updated successfully, please login again");
        navigate("/");
      });
    }
  };

  const onPasswordChange = () => {
    if (password.current!.value !== passwordRepeat.current!.value || !oldPassword.current?.value) setInvalidForm(true);
    else setInvalidForm(false);
  };

  return (
    <div className="row gap-0 gap-xl-0">
      <div className="col-12 col-xl-6">
        <p>
          Account information is secure and private. Please be careful when changing your credentials. To have privacy
          for account, after changing password, you will be logged out.
        </p>
        Password Minimum Requirements:
        <ul className="text-secondary">
          <li>Minimum Length: 6</li>
          <li>At Least one uppercase</li>
          <li>At Least one lowercase</li>
          <li>At Least one number</li>
        </ul>
      </div>
      <form className="col">
        <FormInput
          className="w-100"
          label="current password"
          type="password"
          name="oldPassword"
          required={true}
          inputRef={oldPassword}
          onChange={onPasswordChange}
          placeholder="Enter current password"
        />
        <div className="d-flex gap-3 my-2">
          <FormInput
            className="w-100"
            label="password"
            type="password"
            name="password"
            required={true}
            inputRef={password}
            onChange={onPasswordChange}
            placeholder="Enter new password"
          />
          <FormInput
            className="w-100"
            required={true}
            type="password"
            name="repeatPassword"
            label="repeat password"
            inputRef={passwordRepeat}
            onChange={onPasswordChange}
            placeholder="Repeat password"
          />
        </div>
        {invalidForm && (
          <small className="text-danger mt-2">
            All passwords are required <br />
            New password and repeat password must be same
          </small>
        )}
        <div className="d-flex mt-3 gap-3">
          <CustomButton
            type="submit"
            className="w-100"
            disabled={!password.current?.value || invalidForm}
            onClick={onSubmit}
            styleType={"success"}
            label="Update Password"
          />
        </div>
      </form>
    </div>
  );
};
