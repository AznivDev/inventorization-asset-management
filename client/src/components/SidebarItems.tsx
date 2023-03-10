import { useLocation } from "react-router-dom";

import { ISidebarItem } from "../common/static";
import { SidebarItem } from "./SidebarItem";

interface IProps {
  items: ISidebarItem[];
}

export const SidebarItems = (props: IProps) => {
  const location = useLocation();

  return (
    <div className="list-group mb-auto">
      {props.items.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          label={item.label}
          to={item.to}
          active={location.pathname === item.to}
        />
      ))}
    </div>
  );
};
