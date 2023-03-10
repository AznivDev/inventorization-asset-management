import { useEffect, useState } from "react";

import { CustomButton } from "../../components/CustomButton";
import { CustomTable } from "../../components/table/CustomTable";
import { dispatchAllRequestsAction, dispatchBulkChangeRequestsStatusAction } from "../../store/requests/actions";
import { RootState } from "../../store/store";
import { showSuccessToast } from "../../utils/common";
import { useAppSelector } from "../../utils/hooks/store";

const headers = ["id", "status", "actionDate", "reason", "createdAt", "owner"];

const AdminRequestsPage = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const { requests } = useAppSelector((state: RootState) => state.requests);

  useEffect(() => {
    dispatchAllRequestsAction();
  }, []);

  const onRowSelect = (id: number) => {
    if (selected.includes(id)) setSelected(selected.filter((selectedId) => selectedId !== id));
    else setSelected([...selected, id]);
  };

  const onBulkDecline = () => {
    if (selected.length)
      dispatchBulkChangeRequestsStatusAction(selected, "rejected").then(() =>
        showSuccessToast("Requests declined successfully!")
      );

    setSelected([]);
  };

  const onBulkSelect = () => {
    if (selected.length === requests.length) setSelected([]);
    else setSelected(requests.map((request) => request.id));
  };

  const onBulkApprove = () => {
    if (selected.length)
      dispatchBulkChangeRequestsStatusAction(selected, "approved").then(() =>
        showSuccessToast("Requests approved successfully!")
      );

    setSelected([]);
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

      <div className="d-flex justify-space-between">
        <div className="w-100 d-flex flex-column flex-lg-row gap-3">
          <CustomButton
            styleType="success"
            onClick={onBulkApprove}
            className="w-25 w-lg-100"
            disabled={selected.length <= 0}
            label="Approve Selected Requests"
          />
          <CustomButton
            styleType="danger"
            onClick={onBulkDecline}
            className="w-25 w-lg-100"
            label="Decline Selected Requests"
            disabled={selected.length <= 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminRequestsPage;
