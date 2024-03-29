import { Dispatch } from "react";
import { AnyAction } from "redux";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  IAnnouncementsResponse,
  ICheckResultResponse,
  IImportExcelResponse,
  IUpdateAnnouncementRequest,
} from "../../models/announcement";

import {
  setAnnouncement,
  setImportExcel,
  setError,
  setAnnouncements,
  setIsSuccess,
  setIsSuccessUpdate,
} from "../reducers/announcement";
import { setLoading } from "../reducers/loading";
import { ErrorResponse } from "../../models/error";

class AnnouncementActions {
  static getAnnouncement(phone: string) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));

        const config: AxiosRequestConfig = {
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/phone/${phone}`,
        };

        const response = await axios.request(config);
        const data = response.data as ICheckResultResponse;

        dispatch(setAnnouncement(data.data));
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

  static setAnnouncementNull() {
    return (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));
        dispatch(setAnnouncement(null));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        throw error;
      }
    };
  }

  static importExcel(announcement: File) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const formdata = new FormData();
        formdata.append("announcement", announcement);

        const config: AxiosRequestConfig = {
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/import`,
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: formdata,
        };

        const response = await axios.request(config);
        const data = response.data as IImportExcelResponse;

        dispatch(setImportExcel(data.data));
        setTimeout(() => {
          dispatch(setImportExcel(null));
        }, 1000);
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

  static getAllAnnouncements(page?: number) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");

        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: page
            ? `${process.env.NEXT_PUBLIC_API}/api/v1/announcement?page=${page}`
            : `${process.env.NEXT_PUBLIC_API}/api/v1/announcement`,
          method: "get",
        };

        if (!page) {
          page = 1;
        }

        const response = await axios.request(config);
        const data = response.data as IAnnouncementsResponse;

        dispatch(setAnnouncements(data.data));
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

  static updateAnnouncement(announcement: IUpdateAnnouncementRequest) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");
        const data = JSON.stringify(announcement);

        const config = {
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/update/${announcement.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        await axios.request(config);

        dispatch(setIsSuccessUpdate(true));
        dispatch(setLoading(false));
        setTimeout(() => {
          dispatch(setIsSuccessUpdate(false));
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

  static deleteAllAnnuncements() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");

        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "delete",
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/delete`,
        };

        await axios.request(config);

        dispatch(setAnnouncements(null));
        dispatch(setAnnouncement(null));
        dispatch(setImportExcel(null));
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

export default AnnouncementActions;
