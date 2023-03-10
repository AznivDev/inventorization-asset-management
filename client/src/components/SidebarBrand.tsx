import { Link } from "react-router-dom";

import SourceLogo from "../assets/images/source-logo.svg";

export const SidebarBrand = () => {
  return (
    <Link
      to="/"
      className="brand d-flex align-items-center justify-content-center gap-3 mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <img src={SourceLogo} alt="webbfontain" width={50} />
      <span className="label fs-5">WebbFontain</span>
    </Link>
  );
};
