import { Navigate } from "react-router-dom";

import { IChildrenProps } from "../common/interfaces";
import { adminSidebarItems, userSidebarItems } from "../common/static";
import { DashboardNavbar } from "../components/layouts/DashboardNavbar";
import { DashboardSidebar } from "../components/layouts/DashboardSidebar";
import { RootState } from "../store/store";
import { isAdmin } from "../utils/common";
import { useAppSelector } from "../utils/hooks/store";

export const DashboardLayout = (props: IChildrenProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return user ? (
    <div className="dashboard-layout d-flex">
      <DashboardSidebar items={isAdmin(user?.role) ? adminSidebarItems : userSidebarItems} />
      <main className="px-1 px-lg-5 py-4 d-flex flex-column gap-3 vw-100">
        <DashboardNavbar />
        <div className="content-container">{props.children}</div>
      </main>
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};
