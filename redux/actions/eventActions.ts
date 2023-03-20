import { Dispatch } from "react";
import { AnyAction } from "redux";
import axios from "axios";
import FormData from "form-data";

import { IEventRequest, IEventResponse } from "../../models/event";
import { setError, setIsSuccess, setEvent } from "../reducers/event";

class EventActions {
  static setEvent(event: IEventRequest) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const token = localStorage.getItem("token");
        const requestData = new FormData();

        requestData.append("countdown", event.date.replace("T", " ") + ":00");
        requestData.append("event_name", event.event_name);
        requestData.append("header_footer_name", event.header_footer_name);
        requestData.append("selection_phase", event.selection_phase);
        requestData.append("result_pass_text", event.result_pass_text);
        requestData.append(
          "result_did_not_pass_text",
          event.result_did_not_pass_text
        );
        requestData.append("note", event.note);

        if (event.desktop_photo) {
          requestData.append("desktop_photo", event.desktop_photo);
        }

        if (event.mobile_photo) {
          requestData.append("mobile_photo", event.mobile_photo);
        }

        let config = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/event`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: requestData,
        };

        await axios.request(config);

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

  static getEvent() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/v1/event`
        );
        let data = res.data as IEventResponse;

        if (data?.data?.desktop_photo) {
          data.data.desktop_photo = `${process.env.NEXT_PUBLIC_API}${data.data.desktop_photo}`;
        }
        if (data?.data?.mobile_photo) {
          data.data.mobile_photo = `${process.env.NEXT_PUBLIC_API}${data.data.mobile_photo}`;
        }

        dispatch(setEvent(data.data));
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

export default EventActions;
