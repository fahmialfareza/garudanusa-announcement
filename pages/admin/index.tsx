import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps } from "next";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "../../redux";
import { selectCountdown } from "../../redux/reducers/countdown";
import countdownActions from "../../redux/actions/countdownActions";
import AdminContainer from "../../components/AdminContainer";
import Protected from "../../components/Protected";
import { ICountdownResponse } from "../../models/countdown";

interface ProfileProps {
  countDownDateString: string | null;
}

function Profile({ countDownDateString }: ProfileProps) {
  const dispatch = useAppDispatch();

  const { isSuccess, error } = useSelector(selectCountdown);

  const [date, setDate] = useState("");

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
    if (isSuccess) {
      toast.success("Berhasil mengubah tanggal pengumuman");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(countdownActions.setCountdown(date));
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
                        SISTEM INFORMASI KELOLOSAN GARUDA NUSA YOUTH SUMMIT
                        <br />
                        UPDATE DATA PROFIL LEMBAGA
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
                        name="countdown"
                        size={50}
                        style={{ textAlign: "left" }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                        >
                          UPDATE
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
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/v1/countdown`
    );
    const data = res.data as ICountdownResponse;

    return {
      props: {
        countDownDateString: data.data.date,
      },
    };
  } catch (error) {
    return {
      props: {
        countDownDateString: null,
      },
    };
  }
};

export default Profile;
