import { Navigate, Outlet } from "react-router-dom";

import { IChildrenProps } from "../common/interfaces";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { RootState } from "../store/store";
import { useAppSelector } from "../utils/hooks/store";

const PrivatePage = (props: IChildrenProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return user ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default PrivatePage;
