import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminContainer from "../../components/AdminContainer";
import { useAppDispatch } from "../../redux";
import announcementActions from "../../redux/actions/announcementActions";
import { selectAnnouncement } from "../../redux/reducers/announcement";
import Protected from "../../components/Protected";

function ImportExcel() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { importExcel, error } = useSelector(selectAnnouncement);

  const [announcement, setAnnoncement] = useState<File>();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (announcement) {
      dispatch(announcementActions.importExcel(announcement));
      return;
    }
  };

  useEffect(() => {
    if (importExcel?.message) {
      toast.success("Sukses mengimpor data");

      setTimeout(() => {
        router.push("/admin/registrar");
      }, 2000);
    }
  }, [importExcel, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Protected>
      <AdminContainer>
        <div className="well" style={{ marginLeft: "10px", marginTop: "10px" }}>
          <div className=" alert alert-dismissable alert-danger">
            <h4 style={{ textAlign: "left" }}>
              <b>UPLOAD FILE PENDAFTAR</b>
            </h4>
          </div>
          <div
            className="alert alert-dismissable alert-success"
            style={{ marginBottom: "0px" }}
          >
            <form onSubmit={onSubmit}>
              FORM UPLOAD FILE EXCEL*
              <br />
              <br />
              <input
                name="announcement"
                type="file"
                className="btn btn-danger"
                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setAnnoncement(e.target.files[0]);
                  }
                }}
              />
              <br />
              <input name="submit" type="submit" className="btn btn-info" />
              <br />
              <br />*{" "}
              <b>Silahkan hapus header pada template yang berwana kuning.</b>
              <br />
              ** PILIH FILE MICROSOFT EXCEL DENGAN FILE TYPE (.xls: 2003-2007).
              Silahkan Download FILE Template{" "}
              <Link target={"_blank"} href="/templates/template_data.xlsx">
                <b>DISINI</b>
              </Link>
            </form>
            <br />
          </div>
        </div>
        <ToastContainer theme="colored" />
      </AdminContainer>
    </Protected>
  );
}

export default ImportExcel;
