import { useEffect, useRef, useState } from "react";

import { CustomButton } from "../../components/CustomButton";
import { AssignToUserRow } from "../../components/assets/AssignToUserRow";
import { CreateNewAssetRow } from "../../components/assets/CreateNewAssetRow";
import { CustomTable } from "../../components/table/CustomTable";
import {
  dispatchAllAssetsAction,
  dispatchBulkAssignAssetsAction,
  dispatchBulkDeleteAssetsAction,
  dispatchBulkUnassignAssetsAction,
  dispatchCreateAssetAction,
  dispatchCreateAssetsAction,
} from "../../store/assets/actions";
import { RootState } from "../../store/store";
import { showErrorToast, showSuccessToast } from "../../utils/common";
import { useAppSelector } from "../../utils/hooks/store";

const headers = ["id", "uuid", "name", "type", "createdAt", "user"];
const createHeaders = ["name"];

const AdminAssetsPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [assignMode, setAssignMode] = useState<boolean>(false);
  const { assets } = useAppSelector((state: RootState) => state.assets);

  useEffect(() => {
    dispatchAllAssetsAction();
  }, []);

  const onRowSelect = (id: number) => {
    if (selected.includes(id)) setSelected(selected.filter((selectedId) => selectedId !== id));
    else setSelected([...selected, id]);
  };

  const onBulkSelect = () => {
    if (selected.length === assets.length) setSelected([]);
    else setSelected(assets.map((asset) => asset.id));
  };

  const onBulkDelete = () => {
    if (selected)
      dispatchBulkDeleteAssetsAction(selected).then(() => {
        showSuccessToast("Assets deleted successfully!");
      });

    setSelected([]);
  };

  const onBulkUnassign = () => {
    if (selected)
      dispatchBulkUnassignAssetsAction(selected).then(() => {
        showSuccessToast("Assets unassigned successfully!");
        setSelected([]);
        dispatchAllAssetsAction();
      });
  };

  const onToggleAssignMode = () => setAssignMode(!assignMode);

  const onToggleCreateMode = () => setCreateMode(!createMode);

  const onNewAssetSubmit = () => {
    const name: string = nameRef.current?.value ?? "";
    const count: string = countRef.current?.value ?? "1";

    if (!name || !type || !count) return showErrorToast({ type: "required" });

    const numCount = +count;
    if (numCount < 1) return showErrorToast({ type: "invalid" });

    if (numCount === 1)
      dispatchCreateAssetAction({ name, typeId: type }).then(() => showSuccessToast("Asset created successfully!"));
    else
      dispatchCreateAssetsAction({ name, typeId: type, count: numCount }).then(() => {
        showSuccessToast("Assets created successfully!");

        dispatchAllAssetsAction();
      });

    onToggleCreateMode();
  };

  const onAssignSubmit = () => {
    if (!user) return showErrorToast({ type: "required" });

    dispatchBulkAssignAssetsAction({ userId: user, ids: selected }).then(() => {
      showSuccessToast("Assets assigned successfully!");
      onToggleAssignMode();
      setSelected([]);

      dispatchAllAssetsAction();
    });
  };

  const onSelectType = (id: number | string) => setType(+id);

  const onSelectUser = (id: number | string) => setUser(+id);

  return (
    <div className="user-requests-container">
      <CustomTable
        data={assets}
        className="mt-4"
        headers={headers}
        multiSelect={true}
        selected={selected}
        onSelect={onRowSelect}
        onBulkSelect={onBulkSelect}
      />
      {createMode && (
        <CreateNewAssetRow
          className="mb-4"
          inputRef={nameRef}
          countRef={countRef}
          headers={createHeaders}
          onSubmit={onNewAssetSubmit}
          onSelectType={onSelectType}
        />
      )}
      {assignMode && <AssignToUserRow className="mb-4" onSubmit={onAssignSubmit} onSelectUser={onSelectUser} />}
      <div className="d-flex justify-space-between">
        <div className="w-100 d-flex flex-column flex-lg-row gap-3">
          <CustomButton
            onClick={onToggleCreateMode}
            className="w-25 w-lg-100"
            styleType={createMode ? "secondary" : "success"}
            label={`${createMode ? "discard" : "create"} new asset`}
          />
          <CustomButton
            styleType="primary"
            onClick={onToggleAssignMode}
            className="w-25 w-lg-100"
            label="Assign to User"
            disabled={selected.length <= 0}
          />
          <CustomButton
            onClick={onBulkUnassign}
            styleType="secondary"
            className="w-25 w-lg-100"
            label="Unassign Selected Assets"
            disabled={selected.length <= 0}
          />
          <CustomButton
            onClick={onBulkDelete}
            styleType="danger"
            className="w-25 w-lg-100"
            label="Delete Selected Assets"
            disabled={selected.length <= 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAssetsPage;
