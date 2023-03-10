import { useEffect, useRef, useState } from "react";

import { CustomButton } from "../../components/CustomButton";
import { CreateNewTypeRow } from "../../components/assets/CreateNewTypeRow";
import { CustomTable } from "../../components/table/CustomTable";
import {
  dispatchAssetTypesAction,
  dispatchBulkDeleteTypesAction,
  dispatchCreateTypeAction,
} from "../../store/assets/actions";
import { RootState } from "../../store/store";
import { showErrorToast, showSuccessToast } from "../../utils/common";
import { useAppSelector } from "../../utils/hooks/store";

const headers = ["id", "name", "description"];
const createHeaders = ["name"];

const AdminTypesPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const { types } = useAppSelector((state: RootState) => state.assets);

  useEffect(() => {
    dispatchAssetTypesAction();
  }, []);

  const onRowSelect = (id: number) => {
    if (selected.includes(id)) setSelected(selected.filter((selectedId) => selectedId !== id));
    else setSelected([...selected, id]);
  };

  const onBulkSelect = () => {
    if (selected.length === types.length) setSelected([]);
    else setSelected(types.map((type) => type.id));
  };

  const onBulkDelete = () => {
    if (selected) dispatchBulkDeleteTypesAction(selected).then(() => showSuccessToast("Types deleted successfully!"));
    setSelected([]);
  };

  const onToggleCreateMode = () => setCreateMode(!createMode);

  const onNewTypeSubmit = () => {
    const name: string = nameRef.current?.value ?? "";
    const description: string = descriptionRef.current?.value ?? "";

    if (!name) return showErrorToast({ type: "required" });

    dispatchCreateTypeAction({ name, description }).then(() => showSuccessToast("Asset created successfully!"));
    onToggleCreateMode();
  };

  return (
    <div className="user-requests-container">
      <CustomTable
        data={types}
        className="mt-4"
        headers={headers}
        multiSelect={true}
        selected={selected}
        onSelect={onRowSelect}
        onBulkSelect={onBulkSelect}
      />
      {createMode && (
        <CreateNewTypeRow
          className="mb-4"
          inputRef={nameRef}
          headers={createHeaders}
          onSubmit={onNewTypeSubmit}
          descInputRef={descriptionRef}
        />
      )}
      <div className="d-flex justify-space-between">
        <div className="w-100 d-flex flex-column flex-lg-row gap-3">
          <CustomButton
            onClick={onToggleCreateMode}
            className="w-25 w-lg-100"
            styleType={createMode ? "secondary" : "success"}
            label={`${createMode ? "discard" : "create"} new type`}
          />
          <CustomButton
            onClick={onBulkDelete}
            styleType="danger"
            className="w-25 w-lg-100"
            label="Delete Selected Types"
            disabled={selected.length <= 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTypesPage;
