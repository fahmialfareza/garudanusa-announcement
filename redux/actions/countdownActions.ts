import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ICountdownResponse } from "../../models/countdown";

import { setError, setIsSuccess } from "../reducers/countdown";

class CountdownActions {
  static setCountdown(date: string) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          countdown: date.replace("T", " ") + ":00",
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/countdown`,
          requestOptions
        );
        const data = (await response.json()) as ICountdownResponse;
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setIsSuccess(true));
        setTimeout(() => {
          dispatch(setIsSuccess(false));
        }, 1000);
      } catch (error) {
        dispatch(setError(error));
        setTimeout(() => {
          dispatch(setError(null));
        }, 1000);
        throw error;
      }
    };
  }
}

export default CountdownActions;
