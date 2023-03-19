import { useEffect } from "react";
import { useSelector } from "react-redux";
import eventActions from "../redux/actions/eventActions";

import { useAppDispatch } from "../redux";
import { selectEvent } from "../redux/reducers/event";

function Footer() {
  const dispatch = useAppDispatch();

  const { event } = useSelector(selectEvent);

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    dispatch(eventActions.getEvent());
  }, [dispatch]);

  return (
    <div className="navbar navbar-inverse navbar-fixed-bottom">
      <h5 style={{ color: "#FFF", textAlign: "center" }}>
        {event?.event_name || "Garudanusa Youth Summit"}
        <br />
        {event?.header_footer_name || "GARUDANUSA"} &copy; {year}
      </h5>
    </div>
  );
}

export default Footer;
