import { combineReducers } from "redux";

import auth from "./auth";
import announcement from "./announcement";
import event from "./event";
import loading from "./loading";

export default combineReducers({
  auth,
  announcement,
  event,
  loading,
});
