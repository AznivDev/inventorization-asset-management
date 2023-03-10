import { useEffect, useMemo } from "react";

import { ISelectOption } from "../../common/interfaces";
import { RootState } from "../../store/store";
import { dispatchAllUsersAction } from "../../store/users/actions";
import { useAppSelector } from "../../utils/hooks/store";
import { CustomButton } from "../CustomButton";
import { FormSelect } from "../FormSelect";

interface IProps {
  className?: string;
  onSubmit?: () => void;
  onSelectUser: (id: any) => void;
}

export const AssignToUserRow = (props: IProps) => {
  const { className, onSelectUser, onSubmit } = props;
  const { users } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatchAllUsersAction();
  }, []);

  const options = useMemo(
    (): ISelectOption[] => users.map((user) => ({ value: user.id, label: `${user.name} ${user.lastname}` })),
    [users]
  );

  return (
    <div className="d-flex align-items-center gap-4">
      <div className={`d-flex justify-content-between gap-2 w-100 ${className ?? ""}`}>
        <FormSelect name="User" label="User" className="w-100" onChange={onSelectUser} options={options} />
      </div>
      <CustomButton label="" icon="check" styleType="success" className="w-25" py={2} onClick={onSubmit} />
    </div>
  );
};
