import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/style/dashboard.scss";
import AdminAssetsPage from "./pages/admin/AdminAssetsPage";
import AdminTypesPage from "./pages/admin/AdminTypesPage";
import { LoadingPage } from "./pages/shared/LoadingPage";
import { dispatchAutologinAction } from "./store/auth/actions";
import { RootState } from "./store/store";
import { getToken, isAdmin } from "./utils/common";
import { useAppSelector } from "./utils/hooks/store";

const SigninPage = lazy(() => import("./pages/auth/SigninPage"));
const PrivatePage = lazy(() => import("./components/PrivatePage"));
const AccountPage = lazy(() => import("./pages/shared/AccountPage"));
const UserRequestsPage = lazy(() => import("./pages/user/UserRequestsPage"));
const UserAssetsPage = lazy(() => import("./pages/user/UserAssetsPage"));
const UserDashboardPage = lazy(() => import("./pages/user/UserDashboardPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminRequestsPage = lazy(() => import("./pages/admin/AdminRequestsPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminRolesPage = lazy(() => import("./pages/admin/AdminRolesPage"));

const App = () => {
  const [firstPage, setFirstPage] = useState(<LoadingPage />);
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = getToken();

    if (token && !user) dispatchAutologinAction();
    else if (token && user) setFirstPage(isAdmin(user.role) ? <AdminDashboardPage /> : <UserDashboardPage />);
    else setFirstPage(<SigninPage />);
  }, [user]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Suspense>{firstPage}</Suspense>} />

        {user && (
          <Route
            element={
              <Suspense>
                <PrivatePage />
              </Suspense>
            }
          >
            <Route path="/account" element={<AccountPage />} />
            <Route path="/assets" element={isAdmin(user.role) ? <AdminAssetsPage /> : <UserAssetsPage />} />
            <Route path="/requests" element={isAdmin(user.role) ? <AdminRequestsPage /> : <UserRequestsPage />} />
            {isAdmin(user.role) && (
              <Route>
                <Route path="/users" element={<AdminUsersPage />} />
                <Route path="/types" element={<AdminTypesPage />} />
                <Route path="/roles" element={<AdminRolesPage />} />
              </Route>
            )}
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
