import { combineReducers } from "redux";

import auth from "./auth";
import announcement from "./announcement";
import event from "./event";

export default combineReducers({
  auth,
  announcement,
  event,
});
