import React, { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "../../redux";
import eventActions from "../../redux/actions/eventActions";
import { selectEvent } from "../../redux/reducers/event";
import AdminContainer from "../../components/AdminContainer";
import Protected from "../../components/Protected";
import { IEventResponse, IEvent } from "../../models/event";
import { selectLoading } from "../../redux/reducers/loading";

interface ProfileProps {
  countDownDateString: string | null;
  event: IEvent | null;
}

function Profile({ countDownDateString, event }: ProfileProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isSuccess, error } = useSelector(selectEvent);
  const { loading } = useSelector(selectLoading);

  const [date, setDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [desktopPhoto, setDesktopPhoto] = useState<Blob>();
  const [mobilePhoto, setMobilePhoto] = useState<Blob>();
  const [headerFooterName, setHeaderFooterName] = useState<string>("");
  const [selectionPhase, setSelectionPhase] = useState<string>("");
  const [resultPassText, setResultPassText] = useState("");
  const [resultDidNotPassText, setResultDidNotPassText] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (countDownDateString) {
      const countDownDate = new Date(countDownDateString);
      const newDate = `${countDownDate.getFullYear()}-${
        countDownDate.getMonth() + 1 < 10
          ? "0" + Number(countDownDate.getMonth() + 1)
          : countDownDate.getMonth() + 1
      }-${
        countDownDate.getDate() < 10
          ? "0" + Number(countDownDate.getDate())
          : countDownDate.getDate()
      }T${
        countDownDate.getHours() < 10
          ? "0" + countDownDate.getHours()
          : countDownDate.getHours()
      }:${
        countDownDate.getMinutes() < 10
          ? "0" + countDownDate.getMinutes()
          : countDownDate.getMinutes()
      }`;

      setDate(newDate);
    }
  }, [countDownDateString]);

  useEffect(() => {
    if (event) {
      setEventName(event.event_name);
      setHeaderFooterName(event.header_footer_name);
      setSelectionPhase(event.selection_phase);
      setResultPassText(event.result_pass_text);
      setResultDidNotPassText(event.result_did_not_pass_text);
      setNote(event.note);
    }
  }, [event]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(eventActions.getEvent());
      router.push("/admin");
    }
  }, [isSuccess, dispatch, router]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Berhasil mengedit data event!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      eventActions.setEvent({
        date,
        event_name: eventName,
        desktop_photo: desktopPhoto,
        mobile_photo: mobilePhoto,
        header_footer_name: headerFooterName,
        selection_phase: selectionPhase,
        result_pass_text: resultPassText,
        result_did_not_pass_text: resultDidNotPassText,
        note,
        countdown: null,
      })
    );
  };

  return (
    <Protected>
      <AdminContainer>
        <div
          className="well"
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            marginBottom: "60px",
          }}
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <div className=" alert alert-dismissable alert-success">
                    <h4 style={{ textAlign: "center" }}>
                      <b>
                        SISTEM INFORMASI KELOLOSAN{" "}
                        {event?.event_name?.toUpperCase() ||
                          "GARUDA NUSA YOUTH SUMMIT"}
                        <br />
                        UPDATE DATA EVENT
                      </b>
                    </h4>
                  </div>
                  <form className="form-horizontal" onSubmit={onSubmit}>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>TANGGAL PENGUMUMAN</b>
                      </span>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="event"
                        size={50}
                        style={{ textAlign: "left" }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>NAMA EVENT</b>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        size={50}
                        style={{ textAlign: "left" }}
                        placeholder="Garuda Nusa Youth Summit"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>NAMA HEADER FOOTER</b>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        size={50}
                        style={{ textAlign: "left" }}
                        placeholder="Garuda Nusa"
                        value={headerFooterName}
                        onChange={(e) => setHeaderFooterName(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>TAHAP SELEKSI</b>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        size={50}
                        style={{ textAlign: "left" }}
                        placeholder="Berkas"
                        value={selectionPhase}
                        onChange={(e) => setSelectionPhase(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>PESAN BAGI YANG LOLOS</b>
                      </span>
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                        value={resultPassText}
                        init={{
                          height: 500,
                          menubar: true,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                            "directionality",
                          ],
                          toolbar:
                            "ltr rtl | undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                        }}
                        onEditorChange={(text) => setResultPassText(text)}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>PESAN BAGI YANG TIDAK LOLOS</b>
                      </span>
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                        value={resultDidNotPassText}
                        init={{
                          height: 500,
                          menubar: true,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                            "directionality",
                          ],
                          toolbar:
                            "ltr rtl | undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                        }}
                        onEditorChange={(text) => setResultDidNotPassText(text)}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>CATATAN</b>
                      </span>
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                        value={note}
                        init={{
                          height: 500,
                          menubar: true,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                            "directionality",
                          ],
                          toolbar:
                            "ltr rtl | undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                        }}
                        onEditorChange={(text) => setNote(text)}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>BACKGROUND UNTUK DESKTOP (OPTIONAL)</b>
                      </span>
                      <input
                        type="file"
                        className="form-control"
                        size={50}
                        style={{ textAlign: "left" }}
                        // @ts-ignore
                        onChange={(e) => setDesktopPhoto(e.target.files[0])}
                      />
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-addon"
                        id="basic-addon1"
                        style={{ minWidth: "200px" }}
                      >
                        <b>BACKGROUND UNTUK MOBILE (OPTIONAL)</b>
                      </span>
                      <input
                        type="file"
                        className="form-control"
                        size={50}
                        style={{ textAlign: "left" }}
                        // @ts-ignore
                        onChange={(e) => setMobilePhoto(e.target.files[0])}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <p style={{ textAlign: "left" }}>
                        <button
                          type="submit"
                          name="submit"
                          className="btn btn-info"
                          aria-disabled={"true"}
                          disabled={loading}
                        >
                          {loading ? "MENGIRIM DATA..." : "UPDATE"}
                        </button>
                      </p>
                    </div>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ToastContainer theme={"colored"} />
      </AdminContainer>
    </Protected>
  );
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context
) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/event`);
    const data = res.data as IEventResponse;

    return {
      props: {
        countDownDateString: data.data.date,
        event: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        countDownDateString: null,
        event: null,
      },
    };
  }
};

export default Profile;
