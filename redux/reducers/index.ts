import { combineReducers } from "redux";

import auth from "./auth";
import announcement from "./announcement";
import countdown from "./countdown";

export default combineReducers({
  auth,
  announcement,
  countdown,
});
