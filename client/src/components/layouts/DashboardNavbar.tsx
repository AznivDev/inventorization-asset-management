import { useLocation } from "react-router-dom";

import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";

export const DashboardNavbar = () => {
  const { pathname } = useLocation();
  const user = useAppSelector((state: RootState) => state.auth.user!);

  const { name, lastname, avatar } = user;

  return (
    <div className="navbar d-flex justify-content-between align-items-center flex-column flex-lg-row">
      <h2 className="title text-capitalize">{pathname === "/" ? "Dashboard" : pathname.split("/").slice(-1)}</h2>
      <div className="d-flex align-items-center gap-3 text-secondary">
        <div className="account-info d-flex align-items-center gap-3">
          <h5 className="p-0 m-0">{`${name} ${lastname}`}</h5>
          <img src={avatar} className="avatar border rounded-circle" alt="avatar" width={45} />
        </div>
      </div>
    </div>
  );
};
