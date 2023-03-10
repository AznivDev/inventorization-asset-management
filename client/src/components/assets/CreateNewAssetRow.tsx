import { RefObject, useEffect, useMemo } from "react";

import { ISelectOption } from "../../common/interfaces";
import { dispatchAssetTypesAction } from "../../store/assets/actions";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";
import { CustomButton } from "../CustomButton";
import { FormInput } from "../FormInput";
import { FormSelect } from "../FormSelect";
import { CreateNewRowWrapper } from "../shared/CreateNewRowWrapper";

interface IProps {
  headers: string[];
  className?: string;
  onSubmit?: () => void;
  onSelectType: (id: any) => void;
  inputRef?: RefObject<HTMLInputElement>;
  countRef?: RefObject<HTMLInputElement>;
}

export const CreateNewAssetRow = (props: IProps) => {
  const { headers, inputRef, countRef, className, onSelectType, onSubmit } = props;
  const { types } = useAppSelector((state: RootState) => state.assets);

  useEffect(() => {
    dispatchAssetTypesAction();
  }, []);

  const options = useMemo((): ISelectOption[] => types.map((type) => ({ value: type.id, label: type.name })), [types]);

  return (
    <CreateNewRowWrapper>
      <div className={`d-flex justify-content-between flex-column flex-lg-row gap-2 w-100 ${className ?? ""}`}>
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
        <FormSelect name="Type" label="Type" className="w-100 w-lg-50" onChange={onSelectType} options={options} />
        <FormInput
          min="1"
          type="number"
          name="count"
          label="Count"
          className="w-25"
          defaultValue={1}
          onChange={() => {}}
          inputRef={countRef}
          placeholder="Enter Count"
        />
      </div>
      <CustomButton label="" icon="check" styleType="success" className="w-100 w-lg-25" py={2} onClick={onSubmit} />
    </CreateNewRowWrapper>
  );
};
