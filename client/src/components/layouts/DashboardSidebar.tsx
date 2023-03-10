import { ISidebarItem } from "../../common/static";
import { dispatchAuthLogoutAction } from "../../store/auth/actions";
import { SidebarBrand } from "../SidebarBrand";
import { SidebarItem } from "../SidebarItem";
import { SidebarItems } from "../SidebarItems";

interface IProps {
  items: ISidebarItem[];
}

export const DashboardSidebar = (props: IProps) => {
  const onLogout = () => {
    dispatchAuthLogoutAction();
  };

  return (
    <nav className="sidebar position-fixed vh-100 bg-darker">
      <div className="position-sticky h-100">
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <div className="my-4 px-4">
              <SidebarBrand />
            </div>

            <SidebarItems items={props.items} />
          </div>
          <SidebarItem icon="fa fa-sign-out" label="Log out" to="/" active={false} onClick={onLogout} />
        </div>
      </div>
    </nav>
  );
};
