import React, { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import AdminContainer from "../../../components/AdminContainer";
import { useAppDispatch } from "../../../redux";
import authActions from "../../../redux/actions/authAction";
import { selectAuth } from "../../../redux/reducers/auth";
import Protected from "../../../components/Protected";
import { IEvent, IEventResponse } from "../../../models/event";

interface AddUserProps {
  event: IEvent | null;
}

function AddUser({ event }: AddUserProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error, isSuccess } = useSelector(selectAuth);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sama");
      return;
    }

    dispatch(
      authActions.register({
        name,
        password,
        username,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success menambah admin");

      setTimeout(() => {
        router.push("/admin/users");
      }, 2000);
    }
  }, [isSuccess, router]);

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
                    - TAMBAH PENGELOLA APLIKASI
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
                    name="nama"
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
                    name="username"
                    placeholder="USERNAME"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>USERNAME</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    name="pass"
                    placeholder="PASSWORD"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>PASSWORD</b>
                  </span>
                </div>
                <br />
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    name="pass"
                    placeholder="PASSWORD"
                    size={50}
                    style={{ textAlign: "left" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="input-group-addon" id="basic-addon1">
                    <b>KONFIRMASI PASSWORD</b>
                  </span>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <p style={{ textAlign: "right" }}>
                    <input
                      type="submit"
                      name="submit"
                      id="submit"
                      value="SIMPAN"
                      className="btn btn-danger"
                    />
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

export const getServerSideProps: GetServerSideProps<AddUserProps> = async (
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

export default AddUser;
