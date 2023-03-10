import { FormEvent, useRef, useState } from "react";

import { CustomButton } from "../../components/CustomButton";
import { FormInput } from "../../components/FormInput";
import { AuthLayout } from "../../layouts/AuthLayout";
import { dispatchAuthLoginAction } from "../../store/auth/actions";
import { showErrorToast, showSuccessToast } from "../../utils/common";

const SigninPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setIsLoading(false);
      return showErrorToast({ type: "required" });
    }

    dispatchAuthLoginAction({ email, password })
      .then(() => showSuccessToast("Welcome to Platform!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthLayout>
      <form className="mt-3">
        <FormInput
          label="email"
          type="email"
          name="email"
          placeholder="Email address"
          inputRef={emailRef}
          required={true}
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          placeholder="Password"
          className="mt-3"
          required={true}
          inputRef={passwordRef}
        />
        <CustomButton className="w-100 mt-4" type="submit" label="Log In" isLoading={isLoading} onClick={onSubmit} />
      </form>
    </AuthLayout>
  );
};

export default SigninPage;
