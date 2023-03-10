import { PropsWithChildren } from "react";

export const CreateNewRowWrapper = (props: PropsWithChildren) => {
  return <div className="d-flex align-items-center flex-column flex-lg-row gap-1 gap-lg-4 mb-3">{props.children}</div>;
};
