import { useEffect, useMemo, useRef, useState } from "react";

import { CustomButton } from "../../components/CustomButton";
import { CustomTable } from "../../components/table/CustomTable";
import { CreateNewUserRow } from "../../components/users/CreateNewUserRow";
import { UpdateUserRow } from "../../components/users/UpdateUserRow";
import { RootState } from "../../store/store";
import {
  dispatchAllUsersAction,
  dispatchBulkDeleteUsersAction,
  dispatchCreateUserAction,
  dispatchUpdateUserAction,
} from "../../store/users/actions";
import { showErrorToast, showSuccessToast } from "../../utils/common";
import { useAppSelector } from "../../utils/hooks/store";

const headers = ["id", "name", "lastname", "username", "email", "registered at", "avatar", "role", "actions"];
const createHeaders = ["name", "lastname", "email", "password"];
const updateHeaders = ["name", "lastname", "email"];

const AdminUsersPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [editableId, setEditableId] = useState<number | null>(null);
  const { users } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatchAllUsersAction();
  }, []);

  useEffect(() => {
    if (editMode) {
      const editableUser = users.find((user) => user.id === editableId);

      if (editableUser) {
        nameRef.current!.value = editableUser.name;
        lastNameRef.current!.value = editableUser.lastname;
        emailRef.current!.value = editableUser.email;
        setRole(editableUser.role.id);
      }
    }
  }, [editableId, users, editMode]);

  const usersData = useMemo(() => {
    return users.map((user) => ({
      ...user,
      role: user.role.name,
    }));
  }, [users]);

  const onRowSelect = (id: number) => {
    if (selected.includes(id)) setSelected(selected.filter((selectedId) => selectedId !== id));
    else setSelected([...selected, id]);
  };

  const onBulkSelect = () => {
    if (selected.length === users.length) setSelected([]);
    else setSelected(users.map((user) => user.id));
  };

  const onToggleCreateMode = () => setCreateMode(!createMode);

  const onToggleEditMode = (id: number) => {
    if (editMode && editableId === id) return setEditMode(!editMode);

    setEditMode(true);
    setEditableId(id);
  };

  const onSelectRole = (id: number | string) => setRole(+id);

  const onNewUserSubmit = () => {
    const name: string = nameRef.current?.value ?? "";
    const lastname: string = lastNameRef.current?.value ?? "";
    const email: string = emailRef.current?.value ?? "";
    const password: string = passwordRef.current?.value ?? "";

    if (!name || !lastname || !email || !role || !password) return showErrorToast({ type: "required" });

    dispatchCreateUserAction({
      name,
      lastname,
      email,
      password,
      role,
    }).then((_) => {
      showSuccessToast("User created successfully");
      onToggleCreateMode();
    });
  };

  const onUpdateUserSubmit = () => {
    const name: string = nameRef.current?.value ?? "";
    const lastname: string = lastNameRef.current?.value ?? "";
    const email: string = emailRef.current?.value ?? "";

    if (!name || !lastname || !email || !editableId) return showErrorToast({ type: "required" });

    dispatchUpdateUserAction({
      id: editableId,
      name,
      lastname,
      email,
    }).then((_) => {
      showSuccessToast("User updated successfully");
      onToggleEditMode(editableId);
    });
  };

  const onBulkDelete = () => {
    if (selected.length)
      dispatchBulkDeleteUsersAction(selected).then(() => showSuccessToast("Users deleted successfully!"));

    setSelected([]);
    setEditMode(false);
  };

  return (
    <div className="user-roles-container">
      <CustomTable
        data={usersData}
        className="mt-4"
        headers={headers}
        multiSelect={true}
        selected={selected}
        onSelect={onRowSelect}
        onBulkSelect={onBulkSelect}
        onRowEdit={onToggleEditMode}
      />
      {editMode && (
        <UpdateUserRow
          className="mb-4"
          nameRef={nameRef}
          lastNameRef={lastNameRef}
          emailRef={emailRef}
          headers={updateHeaders}
          onSubmit={onUpdateUserSubmit}
        />
      )}
      {createMode && (
        <CreateNewUserRow
          className="mb-4"
          nameRef={nameRef}
          lastNameRef={lastNameRef}
          emailRef={emailRef}
          headers={createHeaders}
          passwordRef={passwordRef}
          onSubmit={onNewUserSubmit}
          onSelectRole={onSelectRole}
        />
      )}
      <div className="d-flex justify-space-between">
        <div className="w-100 d-flex flex-column flex-lg-row gap-3">
          <CustomButton
            onClick={onToggleCreateMode}
            className="w-25 w-lg-100"
            styleType={createMode ? "secondary" : "success"}
            label={`${createMode ? "discard" : "create"} new user`}
          />
          <CustomButton
            styleType="danger"
            onClick={onBulkDelete}
            className="w-25 w-lg-100"
            label="Delete Selected Users"
            disabled={selected.length <= 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
