import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import axios from "axios";

import { ICountdownResponse } from "../models/countdown";

interface HomeProps {
  countDownDate: number;
}

function Home({ countDownDate }: HomeProps) {
  const [countdown, setCountdown] = useState<string>("");
  const [isCanFindData, setIsCanFindData] = useState<boolean>(false);

  const x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // If the count down is over, write some text
    if (distance < 0) {
      setIsCanFindData(true);
      setCountdown("");
      clearInterval(x);
      return;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    if (countDownDate !== 9664026979690) {
      setCountdown(
        days +
          " HARI : " +
          hours +
          " JAM : " +
          minutes +
          " MENIT : " +
          seconds +
          " DETIK"
      );
    }
  }, 1000);

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
                  <div
                    className="well"
                    style={{
                      marginTop: "0px",
                    }}
                  >
                    <div
                      style={{
                        alignContent: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src="/images/logo.png"
                        alt="logo"
                        height={75}
                        width={150}
                      />
                    </div>
                    <h4
                      style={{ margin: "15px 0 -10px 0", textAlign: "center" }}
                    >
                      <b>
                        PENGUMUMAN SELEKSI BERKAS <br /> GARUDA NUSA YOUTH
                        SUMMIT
                      </b>
                    </h4>
                    <hr />
                    <div
                      className="alert alert-dismissable alert-success"
                      style={{ textAlign: "center" }}
                    >
                      <h4>
                        <b>
                          {!isCanFindData ? (
                            <>
                              WAKTU PENGUMUMAN KELOLOSAN <br />
                              {countdown}
                            </>
                          ) : (
                            <>
                              CEK STATUS KELOLOSAN
                              <br />
                              TELAH DIBUKA!
                              <br />
                              SEMOGA MENDAPATKAN HASIL TERBAIK!
                            </>
                          )}
                        </b>
                      </h4>
                    </div>
                    <hr></hr>

                    <div
                      className="form-group"
                      style={{
                        marginBottom: "-10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        {isCanFindData && (
                          <Link href="/findresult" className="btn btn-danger">
                            {" "}
                            CEK KELOLOSAN SEKARANG{" "}
                          </Link>
                        )}
                      </p>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/v1/countdown`
    );
    const data = res.data as ICountdownResponse;

    return {
      props: {
        countDownDate: new Date(data.data.date).getTime(),
      },
    };
  } catch (error) {
    return {
      props: {
        countDownDate: 9664026979690,
      },
    };
  }
};

export default Home;
