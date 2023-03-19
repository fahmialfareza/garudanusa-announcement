import { Dispatch } from "react";
import { AnyAction } from "redux";
import axios from "axios";
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

class AnnouncementActions {
  static getAnnouncement(phone: string) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/phone/${phone}`,
          {
            method: "GET",
            redirect: "follow",
          }
        );
        const data = (await response.json()) as ICheckResultResponse;
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setAnnouncement(data.data));
      } catch (error) {
        dispatch(setError(error));
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
        dispatch(setAnnouncement(null));
      } catch (error) {
        throw error;
      }
    };
  }

  static importExcel(announcement: File) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("announcement", announcement);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/import`,
          {
            method: "POST",
            headers,
            body: formdata,
            redirect: "follow",
          }
        );
        const data = (await response.json()) as IImportExcelResponse;
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setImportExcel(data.data));
        setTimeout(() => {
          dispatch(setImportExcel(null));
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

  static getAllAnnouncements(page?: number) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        if (!page) {
          page = 1;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/announcement?page=${page}`,
          requestOptions
        );
        const data = (await response.json()) as IAnnouncementsResponse;
        if (!response.ok) {
          dispatch(setError(data.message));
          setTimeout(() => {
            dispatch(setError(null));
          }, 1000);
          return;
        }

        dispatch(setAnnouncements(data.data));
      } catch (error) {
        dispatch(setError(error));
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

        setTimeout(() => {
          dispatch(setIsSuccessUpdate(false));
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

  static deleteAllAnnuncements() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/delete`,
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

        dispatch(setAnnouncements(null));
        dispatch(setAnnouncement(null));
        dispatch(setImportExcel(null));
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

export default AnnouncementActions;
