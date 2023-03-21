import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "../../../../redux";
import AdminContainer from "../../../../components/AdminContainer";
import Protected from "../../../../components/Protected";
import { IEvent, IEventResponse } from "../../../../models/event";
import {
  IAnnouncementResult,
  IAnnouncementResponse,
} from "../../../../models/announcement";
import announcementActions from "../../../../redux/actions/announcementActions";
import { selectAnnouncement } from "../../../../redux/reducers/announcement";
import { selectLoading } from "../../../../redux/reducers/loading";

interface UpdateRegistrarProps {
  event: IEvent | null;
  announcement: IAnnouncementResult | null;
}

function UpdateRegistrar({ event, announcement }: UpdateRegistrarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isSuccessUpdate, error } = useSelector(selectAnnouncement);
  const { loading } = useSelector(selectLoading);

  const { id } = router.query;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cityOfBirth, setCityOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addressFrom, setAddressFrom] = useState("");
  const [school, setSchool] = useState("");
  const [result, setResult] = useState("");
  const [totalScore, setTotalScore] = useState("");

  useEffect(() => {
    if (announcement) {
      setName(announcement.name);
      setPhone(announcement.phone);
      setCityOfBirth(announcement.city_of_birth);
      setDateOfBirth(announcement.date_of_birth);
      setAddressFrom(announcement.address_from);
      setSchool(announcement.school);
      setResult(announcement.result);
      setTotalScore(announcement.total_score.toString());
    }
  }, [announcement]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.success("Berhasil mengupdate data pendaftar!");

      setTimeout(() => {
        router.push("/admin/registrar");
      }, 1000);
    }
  }, [isSuccessUpdate, router]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      announcementActions.updateAnnouncement({
        id: Number(id),
        address_from: addressFrom,
        city_of_birth: cityOfBirth,
        date_of_birth: dateOfBirth,
        name,
        phone,
        result,
        school,
        total_score: Number(totalScore),
      })
    );
  };

  return (
    <Protected>
      <AdminContainer>
        <div id="rightPan">
          <div
            className="well"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              marginBottom: "60px",
            }}
          >
            <div className="cleaner_h5"></div>
            <div id="hasil"></div>
            <div className="cleaner_h5"></div>
            <fieldset>
              <div className=" alert alert-dismissable alert-danger">
                <h4 style={{ textAlign: "center" }}>
                  <b>
                    SISTEM INFORMASI KELOLOSAN{" "}
                    {event?.event_name?.toUpperCase() ||
                      "GARUDA NUSA YOUTH SUMMIT"}{" "}
                    - UPDATE DATA PENDAFTAR
                  </b>
                </h4>
              </div>
              <form
                className="form-horizontal"
                name="frm"
                id="frm"
                onSubmit={onSubmit}
              >
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NAMA LENGKAP"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>NAMA</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NOMOR HP"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>NOMOR HP</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="TEMPAT LAHIR"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={cityOfBirth}
                    onChange={(e) => setCityOfBirth(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>TEMPAT LAHIR</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="TANGGAL LAHIR"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>TANGGAL LAHIR</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ASAL"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={addressFrom}
                    onChange={(e) => setAddressFrom(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>ASAL</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ASAL SEKOLAH/UNIV"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>ASAL SEKOLAH/UNIV</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="HASIL"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>HASIL</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="TOTAL SKOR"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={totalScore}
                    onChange={(e) => setTotalScore(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>TOTAL SKOR</b>
                  </span>
                </div>
                <br />
                <div className="form-group">
                  <p style={{ textAlign: "right" }}>
                    <button
                      type="submit"
                      id="submit"
                      className="btn btn-danger"
                      disabled={loading}
                    >
                      {loading ? "MENGIRIM DATA..." : "SIMPAN"}
                    </button>
                  </p>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
        <ToastContainer theme="colored" />
      </AdminContainer>
    </Protected>
  );
}

export const getServerSideProps: GetServerSideProps<
  UpdateRegistrarProps
> = async (context) => {
  try {
    const id = context.query.id;

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/event`);
    const data = res.data as IEventResponse;

    const resAnnouncement = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/v1/announcement/${id}`
    );
    const dataAnnouncement = resAnnouncement.data as IAnnouncementResponse;

    return {
      props: {
        event: data.data,
        announcement: dataAnnouncement.data,
      },
    };
  } catch (error) {
    return {
      props: {
        event: null,
        announcement: null,
      },
      redirect: {
        destination: "/admin/registrar",
        permanent: true,
      },
    };
  }
};

export default UpdateRegistrar;
