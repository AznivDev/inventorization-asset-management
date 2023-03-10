import { useEffect } from "react";

import { CustomTable } from "../../components/table/CustomTable";
import { RootState } from "../../store/store";
import { dispatchAllRolesAction } from "../../store/users/actions";
import { useAppSelector } from "../../utils/hooks/store";

const headers = ["id", "name", "accessLevel"];

const AdminRolesPage = () => {
  const { roles } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatchAllRolesAction();
  }, []);

  return (
    <div className="user-roles-container">
      <CustomTable data={roles} className="mt-4" headers={headers} />
    </div>
  );
};

export default AdminRolesPage;
