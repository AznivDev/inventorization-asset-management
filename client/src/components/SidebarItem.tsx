import { Link } from "react-router-dom";

import { ISidebarItem } from "../common/static";

interface IProps extends ISidebarItem {
  onClick?: () => void;
  active: boolean;
}

export const SidebarItem = (props: IProps) => {
  const { to, icon, label, onClick, active } = props;

  return (
    <li className={`list-group-item border-left bg-darker ${active ? "active" : ""}`} onClick={onClick}>
      <Link to={to} className="nav-link text-darker d-flex justify-content-center gap-3">
        <i className={`icon fa fa-${icon}`}></i>
        <span className="label">{label}</span>
      </Link>
    </li>
  );
};
