import { combineReducers } from "redux";

import assetsReducer from "./assets/reducer";
import authReducer from "./auth/reducer";
import monitoringReducer from "./monitoring/reducer";
import requestsReducer from "./requests/reducer";
import usersReducer from "./users/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  assets: assetsReducer,
  requests: requestsReducer,
  monitoring: monitoringReducer,
});

export default rootReducer;
