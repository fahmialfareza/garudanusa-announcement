import React, { FormEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch } from "../redux";
import "react-toastify/dist/ReactToastify.css";

import authActions from "../redux/actions/authAction";
import { selectAuth } from "../redux/reducers/auth";

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { error, token, user } = useSelector(selectAuth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(authActions.login({ username, password }));
  };

  useEffect(() => {
    if (token && user) {
      router.push("/admin");
    }
  }, [token, user, router]);

  useEffect(() => {
    if (error !== "Token could not be parsed from the request.") {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
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
                width={150}
              />
            </p>
            <h4 style={{ margin: "15px 0 -10px 0", textAlign: "center" }}>
              <b>
                PENGUMUMAN SELEKSI BERKAS <br />
                GARUDA NUSA YOUTH SUMMIT
              </b>
            </h4>
            <hr />
            <form className="form-horizontal" onSubmit={onSubmit}>
              <fieldset>
                <div className="form-group" style={{ minWidth: "250px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NAMA PENGGUNA"
                    id="Yourname"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    className="form-control"
                    placeholder="KATA SANDI"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "-10px" }}>
                  <p style={{ textAlign: "center" }}>
                    <input
                      type="submit"
                      name="submit"
                      id="submit"
                      className="btn btn-danger"
                    />
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </>
  );
}

export default Login;
