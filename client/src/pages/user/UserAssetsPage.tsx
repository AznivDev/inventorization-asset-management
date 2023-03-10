import { useEffect } from "react";

import { CustomTable } from "../../components/table/CustomTable";
import { dispatchSelfAssetsAction } from "../../store/assets/actions";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../utils/hooks/store";

const headers = ["id", "uuid", "name", "type"];

const UserAssetsPage = () => {
  const { assets } = useAppSelector((state: RootState) => state.assets);

  useEffect(() => {
    dispatchSelfAssetsAction();
  }, []);

  return (
    <div className="user-assets-container">
      <CustomTable data={assets} className="mt-4" headers={headers} />
    </div>
  );
};

export default UserAssetsPage;
