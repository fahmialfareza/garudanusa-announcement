import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminContainer from "../../../components/AdminContainer";
import { useAppDispatch } from "../../../redux";
import announcementActions from "../../../redux/actions/announcementActions";
import { selectAnnouncement } from "../../../redux/reducers/announcement";
import Protected from "../../../components/Protected";
import { IEvent, IEventResponse } from "../../../models/event";
import { selectLoading } from "../../../redux/reducers/loading";

interface RegistrarProps {
  event: IEvent | null;
}

function Registrar({ event }: RegistrarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { announcements, error, isSuccess } = useSelector(selectAnnouncement);
  const { loading } = useSelector(selectLoading);

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
      toast.success("Success menghapus semua data!");
    }
  }, [isSuccess]);

  useEffect(() => {
    const page = router.query?.page as string;
    dispatch(announcementActions.getAllAnnouncements(Number(page)));
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
                SISTEM INFORMASI KELOLOSAN{" "}
                {event?.event_name?.toUpperCase() || "GARUDA NUSA YOUTH SUMMIT"}{" "}
                - DAFTAR NAMA PENDAFTAR
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
                <th>AKSI</th>
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
                    <td>
                      <Link
                        className="btn btn-primary"
                        href={`/admin/registrar/update/${announcement.id}`}
                      >
                        Edit
                      </Link>
                    </td>
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
                <Link
                  className="page-link"
                  href={announcements?.current_page === 1 ? "#" : "?page=1"}
                >
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
                  href={
                    announcements?.current_page === 1
                      ? "#"
                      : `?page=${
                          announcements?.current_page &&
                          announcements?.current_page - 1
                        }`
                  }
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
                      if (!loading)
                        dispatch(announcementActions.deleteAllAnnuncements());
                    }
                  }}
                  href={""}
                  className="page-link"
                >
                  {loading ? "MEMUAT..." : "HAPUS SEMUA PENDAFTAR"}
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

export const getServerSideProps: GetServerSideProps<RegistrarProps> = async (
  context
) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/event`);
    const data = res.data as IEventResponse;

    return {
      props: {
        event: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        event: null,
      },
    };
  }
};

export default Registrar;
