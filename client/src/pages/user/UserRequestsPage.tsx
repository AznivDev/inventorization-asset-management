import { useEffect, useRef, useState } from "react";

import { CustomButton } from "../../components/CustomButton";
import { CreateNewRequestRow } from "../../components/requests/CreateNewRequestRow";
import { CustomTable } from "../../components/table/CustomTable";
import {
  dispatchBulkDeleteRequestsAction,
  dispatchCreateRequestAction,
  dispatchSelfRequestsAction,
} from "../../store/requests/actions";
import { RootState } from "../../store/store";
import { showSuccessToast } from "../../utils/common";
import { useAppSelector } from "../../utils/hooks/store";

const headers = ["id", "status", "actionDate", "reason", "createdAt"];
const createHeaders = ["reason"];

const UserRequestsPage = () => {
  const newReasonRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const { requests } = useAppSelector((state: RootState) => state.requests);

  useEffect(() => {
    dispatchSelfRequestsAction();
  }, []);

  const onRowSelect = (id: number) => {
    if (selected.includes(id)) setSelected(selected.filter((selectedId) => selectedId !== id));
    else setSelected([...selected, id]);
  };

  const onBulkSelect = () => {
    if (selected.length === requests.length) setSelected([]);
    else setSelected(requests.map((request) => request.id));
  };

  const onBulkDelete = () => {
    if (selected) dispatchBulkDeleteRequestsAction(selected);
    setSelected([]);
  };

  const onToggleCreateMode = () => setCreateMode(!createMode);

  const onNewRequestSubmit = () => {
    const reason: string = newReasonRef.current?.value ?? "";
    if (!reason) return;

    dispatchCreateRequestAction({ reason }).then(() => showSuccessToast("Request created successfully!"));
    onToggleCreateMode();
  };

  return (
    <div className="user-requests-container">
      <CustomTable
        data={requests}
        className="mt-4"
        headers={headers}
        multiSelect={true}
        selected={selected}
        onSelect={onRowSelect}
        onBulkSelect={onBulkSelect}
      />
      {createMode && (
        <CreateNewRequestRow
          className="mb-4"
          headers={createHeaders}
          inputRef={newReasonRef}
          onSubmit={onNewRequestSubmit}
        />
      )}
      <div className="d-flex justify-space-between">
        <div className="w-100 d-flex flex-column flex-lg-row gap-3">
          <CustomButton
            onClick={onToggleCreateMode}
            className="w-25 w-lg-100"
            styleType={createMode ? "secondary" : "success"}
            label={`${createMode ? "discard" : "create"} new request`}
          />
          <CustomButton
            onClick={onBulkDelete}
            styleType="danger"
            className="w-25 w-lg-100"
            label="Delete Selected Requests"
            disabled={selected.length <= 0}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRequestsPage;
