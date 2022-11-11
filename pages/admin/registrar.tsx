import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminContainer from "../../components/AdminContainer";
import { useAppDispatch } from "../../redux";
import announcementActions from "../../redux/actions/announcementActions";
import { selectAnnouncement } from "../../redux/reducers/announcement";
import Protected from "../../components/Protected";

function Registrar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { announcements, error, isSuccess } = useSelector(selectAnnouncement);

  useEffect(() => {
    dispatch(announcementActions.getAllAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success menghapus semua data");
    }
  }, [isSuccess]);

  useEffect(() => {
    const search = router.query?.search as string;
    dispatch(
      announcementActions.getAllAnnouncements(
        Number(search?.replace("?page=", ""))
      )
    );
  }, [dispatch, router]);

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
          <div className=" alert alert-dismissable alert-danger">
            <h4>
              <b>
                SISTEM INFORMASI KELOLOSAN GARUDA NUSA YOUTH SUMMIT - DAFTAR
                NAMA PENDAFTAR
              </b>
            </h4>
          </div>
          <table className="table table-striped table-bordered">
            <thead className="bg-danger text-white">
              <tr>
                <th>NO</th>
                <th>NAMA PENDAFTAR</th>
                <th>NO. HP</th>
                <th>TEMPAT TANGGAL LAHIR</th>
                <th>ASAL DAERAH</th>
                <th>ASAL KAMPUS/SEKOLAH</th>
                <th>KELOLOSAN</th>
                {/* <th>AKSI</th> */}
              </tr>
            </thead>

            <tbody>
              {announcements &&
                announcements?.data?.length > 0 &&
                announcements.data.map((announcement) => (
                  <tr key={announcement.id} className="success">
                    <td>{announcement.number}</td>
                    <td>{announcement.name}</td>
                    <td>{announcement.phone}</td>
                    <td>
                      {announcement.city_of_birth}, {announcement.date_of_birth}
                    </td>
                    <td>{announcement.address_from}</td>
                    <td>{announcement.school}</td>
                    <td>{announcement.result}</td>

                    {/* <td>
                    <Link
                      to="editsiswa.php?no=<?php echo $r['no'] ?>"
                      className=" btn btn-info btn-sm"
                      title="Edit"
                    >
                      UPDATE
                    </Link>
                    <Link to="#">
                      <button className="btn btn-danger btn-sm" title="Hapus">
                        HAPUS
                      </button>
                    </Link>
                  </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination justify-content-end">
              <li
                className={`page-item ${
                  announcements?.current_page === 1 && "disabled"
                }`}
              >
                <Link className="page-link" href={"?page=1"}>
                  First
                </Link>
              </li>
              <li
                className={`page-item ${
                  announcements?.current_page === 1 && "disabled"
                }`}
              >
                <Link
                  className="page-link"
                  href={`?page=${
                    announcements?.current_page &&
                    announcements?.current_page - 1
                  }`}
                >
                  <span aria-hidden="true">«</span>
                </Link>
              </li>
              <li
                className={`page-item ${
                  announcements?.last_page === announcements?.current_page &&
                  "disabled"
                }`}
              >
                <Link
                  className="page-link"
                  href={`?page=${
                    announcements?.current_page &&
                    announcements?.current_page + 1
                  }`}
                  aria-label="Next"
                >
                  <span aria-hidden="true">»</span>
                </Link>
              </li>
              <li
                className={`page-item ${
                  announcements?.last_page === announcements?.current_page &&
                  "disabled"
                }`}
              >
                <Link
                  className="page-link"
                  href={`?page=${announcements?.last_page}`}
                >
                  Last
                </Link>
              </li>{" "}
            </ul>
            <ul className="pagination justify-content-end">
              <li className={`page-item`}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();

                    if (
                      // eslint-disable-next-line no-restricted-globals
                      confirm("Yakin ingin menghapus semua data?")
                    ) {
                      dispatch(announcementActions.deleteAllAnnuncements());
                    }
                  }}
                  href={""}
                  className="page-link"
                >
                  HAPUS SEMUA PENDAFTAR
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <ToastContainer theme="colored" />
      </AdminContainer>
    </Protected>
  );
}

export default Registrar;
