import { Dispatch } from "react";
import { AnyAction } from "redux";
import { setLoading } from "../reducers/loading";

class LoadingActions {
  static setLoading(loading: boolean) {
    return async (dispatch: Dispatch<AnyAction>) => {
      dispatch(setLoading(loading));
    };
  }
}

export default LoadingActions;
