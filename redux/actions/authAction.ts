import { Dispatch } from "react";
import { AnyAction } from "redux";

import {
  IAllUsersResponse,
  ILoginRequest,
  IMeResponse,
  IRegisterLoginResponse,
  IRegisterRequest,
} from "../../models/auth";
import {
  setError,
  setToken,
  setUser,
  setUsers,
  setIsSuccess,
} from "../reducers/auth";

class AuthActions {
  static register(requestData: IRegisterRequest) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/auth/register`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(requestData),
            redirect: "follow",
          }
        );
        const data = (await response.json()) as IRegisterLoginResponse;
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

  static login(requestData: ILoginRequest) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/auth/login`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(requestData),
            redirect: "follow",
          }
        );
        const data = (await response.json()) as IRegisterLoginResponse;
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setToken(data.data.token));
      } catch (error) {
        dispatch(setError(error));
        setTimeout(() => {
          dispatch(setError(null));
        }, 1000);
        throw error;
      }
    };
  }

  static me() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/auth/me`,
          {
            method: "GET",
            headers,
          }
        );
        const data = (await response.json()) as IMeResponse;
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setUser(data.data));
      } catch (error) {
        dispatch(setError(error));
        setTimeout(() => {
          dispatch(setError(null));
        }, 1000);
        throw error;
      }
    };
  }

  static logout() {
    return (dispatch: Dispatch<AnyAction>) => {
      dispatch(setToken(null));
      dispatch(setUser(null));
    };
  }

  static getAllUsers() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/auth/users`,
          requestOptions
        );
        const data = (await response.json()) as IAllUsersResponse;
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setUsers(data.data));
      } catch (error) {
        dispatch(setError(error));
        setTimeout(() => {
          dispatch(setError(null));
        }, 1000);
        throw error;
      }
    };
  }

  static deleteUser(id: number) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
        };

        const response = await fetch(
          `https://pengumuman-api.garudanusa.id/api/v1/auth/delete/${id}`,
          requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setIsSuccess(true));
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

export default AuthActions;
