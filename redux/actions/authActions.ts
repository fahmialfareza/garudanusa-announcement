import { AxiosError, AxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import axios from "axios";

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
import { ErrorResponse } from "../../models/error";
import { setLoading } from "../reducers/loading";

class AuthActions {
  static register(requestData: IRegisterRequest) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));

        const config: AxiosRequestConfig = {
          headers: {
            "Content-Type": "application/json",
          },
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/auth/register`,
          method: "post",
          data: requestData,
        };

        await axios.request(config);

        dispatch(setIsSuccess(true));
        dispatch(setLoading(false));
        setTimeout(() => {
          dispatch(setIsSuccess(false));
        }, 1000);
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;

        dispatch(setLoading(false));
        dispatch(setError(err.response?.data?.message));
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
        dispatch(setLoading(true));

        const config: AxiosRequestConfig = {
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/auth/login`,
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          data: requestData,
        };

        const response = await axios.request(config);
        const data = response.data as IRegisterLoginResponse;

        dispatch(setToken(data.data.token));
        dispatch(setLoading(false));
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;

        dispatch(setLoading(false));
        dispatch(setError(err.response?.data?.message));
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
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/auth/me`,
          method: "get",
        };

        const response = await axios.request(config);
        const data = response.data as IMeResponse;

        dispatch(setUser(data.data));
        dispatch(setLoading(false));
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;

        dispatch(setError(err.response?.data?.message));
        setTimeout(() => {
          dispatch(setError(null));
        }, 1000);
        throw error;
      }
    };
  }

  static logout() {
    return (dispatch: Dispatch<AnyAction>) => {
      dispatch(setLoading(true));
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(setLoading(false));
    };
  }

  static getAllUsers() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const config: AxiosRequestConfig = {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/auth/users`,
        };

        const response = await axios.request(config);
        const data = response.data as IAllUsersResponse;

        dispatch(setUsers(data.data));
        dispatch(setLoading(false));
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;

        dispatch(setLoading(false));
        dispatch(setError(err.response?.data?.message));
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
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");

        const config: AxiosRequestConfig = {
          method: "delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/auth/delete/${id}`,
        };

        const response = await axios.request(config);

        dispatch(setIsSuccess(true));
        dispatch(setLoading(false));
        setTimeout(() => {
          dispatch(setIsSuccess(false));
        }, 1000);
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;

        dispatch(setLoading(false));
        dispatch(setError(err.response?.data?.message));
        setTimeout(() => {
          dispatch(setError(null));
        }, 1000);
        throw error;
      }
    };
  }
}

export default AuthActions;
