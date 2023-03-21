import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux";
import { selectAuth } from "../redux/reducers/auth";
import authActions from "../redux/actions/authActions";
import eventActions from "../redux/actions/eventActions";
import { selectEvent } from "../redux/reducers/event";

function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { token, user } = useSelector(selectAuth);
  const { event } = useSelector(selectEvent);

  const [isEligibleCheck, setIsEligibleCheck] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(authActions.me());
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(eventActions.getEvent());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      const countDownDate = new Date(event.date).getTime();
      const now = new Date().getTime();

      const distance = countDownDate - now;

      if (distance < 0) {
        setIsEligibleCheck(true);
      }
    }
  }, [event]);

  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" href="/">
            <Image src="/images/home.png" height={20} width={20} alt="Logo" />{" "}
            <b>{event?.header_footer_name?.toUpperCase() || "GARUDANUSA"}</b>
          </Link>
          <button
            className="navbar-toggle"
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
            {isEligibleCheck && (
              <li>
                <Link href="/findresult">
                  <b>CEK KELOLOSAN</b>
                </Link>
              </li>
            )}
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
                    <b>MASUK</b>
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
