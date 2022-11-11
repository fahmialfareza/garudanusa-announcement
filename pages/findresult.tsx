import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { selectAnnouncement } from "../redux/reducers/announcement";
import announcementActions from "../redux/actions/announcementActions";
import { useAppDispatch } from "../redux";
import { ICountdownResponse } from "../models/countdown";

interface FindResultProps {
  countdown: number;
}

function FindResult({ countdown }: FindResultProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { announcement, error } = useSelector(selectAnnouncement);

  const [isResult, setIsResult] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (countdown !== 9664026979690) {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countdown - now;

      // If the count down is over, write some text
      if (distance > 0) {
        router.push("/");
      }
    }
  }, [countdown, router]);

  useEffect(() => {
    if (announcement) {
      setIsResult(true);
    }
  }, [announcement]);

  useEffect(() => {
    if (
      error !== "Token could not be parsed from the request." &&
      error !== null &&
      error !== undefined
    ) {
      toast.error("MAAF DATA YANG ANDA MASUKKAN TIDAK SESUAI/TIDAK TERDAFTAR");
      toast.error("CEK KEMBALI DAN PASTIKAN NOMOR ANDA SUDAH BENAR ATAU");
      toast.error(
        "SILAHKAN HUBUNGI ADMIN GARDA MELALUI NOMOR WA.ME/6285815330595"
      );
    }
  }, [error]);

  const print = () => {
    let printContents = document.getElementById("printablediv")?.innerHTML;

    if (!printContents) {
      return;
    }

    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  if (!announcement || !isResult) {
    return (
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToastContainer theme="colored" />
        <table>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>
                <br />
                <div
                  className="container"
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      top: "50%",
                      transform: "translate(0, -50%)",
                      position: "absolute",
                    }}
                  >
                    <div className="well">
                      <p style={{ textAlign: "center" }}>
                        <Image
                          src="/images/logo.png"
                          alt="logo"
                          height={75}
                          width="150"
                          sizes="100vw"
                          style={{ width: "auto", height: "75" }}
                        />
                      </p>
                      <h4
                        style={{
                          margin: "15px 0 -10px 0",
                          textAlign: "center",
                        }}
                      >
                        <b>
                          PENGUMUMAN SELEKSI BERKAS <br />
                          GARUDA NUSA YOUTH SUMMIT
                        </b>
                      </h4>
                      <hr />
                      <div id="xpengumuman">
                        <div className="alert alert-dismissable alert-success">
                          <h4 style={{ textAlign: "center" }}>
                            <b>
                              CEK STATUS KELOLOSAN ANDA SEKARANG!
                              <br />
                              MASUKKAN NO HP YANG ANDA ISIKAN SAAT SUBMIT GFORM
                              PENDAFTARAN. <br /> CERMATI PETUNJUK YANG TERTERA!
                            </b>
                          </h4>
                        </div>
                        <hr />
                        <form
                          className="form-horizontal"
                          name="formcarino"
                          onSubmit={(e) => {
                            e.preventDefault();

                            dispatch(
                              announcementActions.getAnnouncement(phone)
                            );
                          }}
                        >
                          <fieldset id="xpengumuman">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Contoh: 085815330595"
                              />
                            </div>
                            <div
                              className="form-group"
                              style={{ marginBottom: "-10px" }}
                            >
                              <p style={{ textAlign: "center" }}>
                                <input
                                  type="SUBMIT"
                                  name="SUBMIT"
                                  id="SUBMIT"
                                  className="btn btn-danger"
                                  value="CEK STATUS KELOLOSAN"
                                />
                              </p>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container" id="printablediv">
      <br />
      <div className="well" style={{ marginBottom: "50px" }}>
        <p style={{ textAlign: "center" }}>
          <Image
            src="/images/logo.png"
            alt="logo"
            height={75}
            width="150"
            sizes="100vw"
            style={{ width: "auto", height: "75" }}
          />
        </p>
        <h4 style={{ margin: "15px 0 -10px 0;", textAlign: "center" }}>
          <b>
            PENGUMUMAN SELEKSI BERKAS <br />
            GARUDA NUSA YOUTH SUMMIT
          </b>
        </h4>
        <hr />
        <div
          style={{ textAlign: "center" }}
          className="alert alert-dismissable alert-danger"
        >
          <h4>
            <b> DETAIL STATUS KELOLOSAN </b>
          </h4>
        </div>
        <table min-width="100" className="table table-striped table-bordered">
          <tbody>
            <tr className="success">
              <td
                colSpan={4}
                align="center"
                style={{ color: "#000", fontWeight: "bold" }}
              >
                <b>IDENTITAS PENDAFTAR GARUDA NUSA YOUTH SUMMIT</b>
              </td>
            </tr>
            <tr>
              <td>Nama Lengkap</td>
              <td colSpan={3} style={{ textTransform: "capitalize" }}>
                <strong>: {announcement.name}</strong>
              </td>
            </tr>

            <tr className="secondary">
              <td width="250">Nomor HP </td>
              <td width="480">
                <strong>: {announcement.phone}</strong>
              </td>
            </tr>

            <tr>
              <td>Asal Daerah</td>
              <td colSpan={3}>
                <strong>: {announcement.address_from}</strong>
              </td>
            </tr>

            <tr className="secondary">
              <td>Tempat/ Tgl. Lahir</td>
              <td colSpan={3} style={{ textTransform: "uppercase" }}>
                <strong>
                  : {announcement.city_of_birth}, {announcement.date_of_birth}
                </strong>
              </td>
            </tr>

            <tr>
              <td>Asal Kampus/Sekolah</td>
              <td colSpan={3} style={{ textTransform: "capitalize" }}>
                <strong>: {announcement.school}</strong>
              </td>
            </tr>

            <tr className="success">
              <td
                colSpan={4}
                align="center"
                style={{ color: "#000", fontWeight: "bold" }}
              >
                STATUS KELOLOSAN SELEKSI BERKAS GARUDA NUSA YOUTH SUMMIT ANDA
                DINYATAKAN
              </td>
            </tr>
            <tr className="warning">
              <td
                colSpan={4}
                align="center"
                style={{ color: "#0066FF", textTransform: "uppercase" }}
              >
                {announcement.result}
              </td>
            </tr>
            <tr className="success">
              <td colSpan={4} align="center">
                <b>
                  Bagi yang LOLOS, silahkan mengikuti petunjuk pada Halaman 24
                  poin 2 sebagaimana tercantum di s.id/PanduanGNYS.
                </b>{" "}
                Screenshoot bukti kelolosan ini sebagai BUKTI YANG VALID. Untuk
                lanjut ke tahap seleksi substansi, segera lakukan pembayaran{" "}
                <b>
                  Commitment Fee + Donation sebesar Rp 99.000,- paling lambat
                  pada 19 September 2022 pukul 12.00 WIB
                </b>{" "}
                ke rekening <b>BRI 0055-0100-2383-560</b> a.n Yayasan Garuda
                Nusa Youth Development Center. Jika sudah,{" "}
                <b>
                  screenshoot bukti kelolosan ini lalu konfirmasi dan kirimkan
                  bukti pembayaran Commitment Fee + Donation ke WA Admin Garda
                  0858-1533-0595 dengan format LOLOSBERKAS_NAMA LENGKAP_ASAL
                  KAMPUS/SEKOLAH_ASAL DAERAH.
                </b>{" "}
                <i>
                  Bagi yang BELUM LOLOS, Garda masih membuka pendaftaran jalur
                  early bird self funded (biaya mandiri) dan akan memfasilitasi
                  pemberkasan dalam proses mencari dana sponsor ke
                  kampus/pemkab/DPRD/perusahaan daerah. Garda juga akan
                  mengumumkan 100 nama yang belum lolos jalur fully funded,
                  untuk mendapatkan beasiswa berupa potongan biaya program
                  (Partial Funded) yang bisa digunakan untuk mendaftar Garuda
                  Nusa Youth Summit! Hubungi WA Garda 0858-1533-0595 untuk info
                  lebih lanjut.
                </i>
              </td>
            </tr>

            <tr className="secondary">
              <td colSpan={4}></td>
            </tr>
            <tr className="danger">
              <td colSpan={4} align="center">
                <b>Catatan:</b> Keputusan ini bersifat mutlak dan tidak dapat
                diganggu gugat.{" "}
                <b>
                  Sebagian Commitment Fee + Donation akan disalurkan ke lokasi
                  pengabdian di tapal batas Entikong untuk membantu
                  memberdayakan masyarakat, mengembangkan pojok literasi dan
                  aksi pendidikan, mendukung pelaksanakan program kerja Garuda
                  Nusa Youth Summit, berbagai kegiatan sosial seperti santunan
                  anak yatim serta beberapa program lain yang diselenggarakan
                  oleh Garuda Nusa.
                </b>{" "}
                Terus ikuti media sosial resmi Garuda Nusa untuk mendapatkan
                informasi program menarik berikutnya!{" "}
                <i>
                  Jangan lupa untuk follow instagram <b>@garudanusaid</b>
                </i>
                .
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-group" style={{ marginBottom: "-10px" }}>
          <p style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                setIsResult(false);
                dispatch(announcementActions.setAnnouncementNull());
                setPhone("");
              }}
              className="btn btn-success"
            >
              KEMBALI
            </button>{" "}
            <button className="btn btn-danger" onClick={print}>
              CETAK
            </button>
          </p>
        </div>
      </div>
      <br />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<FindResultProps> = async (
  context
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/v1/countdown`
    );
    const data = res.data as ICountdownResponse;

    const announcementTime = new Date(data.data.date).getTime();
    const now = new Date().getTime();

    if (now < announcementTime) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        countdown: announcementTime,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default FindResult;
