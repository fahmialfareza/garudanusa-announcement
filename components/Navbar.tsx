import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux";
import { selectAuth } from "../redux/reducers/auth";
import authActions from "../redux/actions/authAction";

function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { token, user } = useSelector(selectAuth);

  useEffect(() => {
    if (token) {
      dispatch(authActions.me());
    }
  }, [dispatch, token]);

  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" href="/">
            <Image src="/images/home.png" height={20} width={20} alt="Logo" />{" "}
            <b>GARUDANUSA</b>
          </Link>
          <button
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-main"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse" id="navbar-main">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link href="/findresult">
                <b>CEK KELOLOSAN</b>
              </Link>
            </li>
            {token && user ? (
              <>
                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      dispatch(authActions.logout());
                      return router.push("/");
                    }}
                  >
                    {" "}
                    <b>KELUAR</b>
                  </Link>
                </li>
                <li>
                  <Link href="/admin">
                    {" "}
                    <span>
                      <Image
                        src="/images/ico.png"
                        alt="icon"
                        height="20"
                        width={20}
                      />
                    </span>{" "}
                    <b>{user.name.toUpperCase()}</b>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <b>LOGIN</b>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
