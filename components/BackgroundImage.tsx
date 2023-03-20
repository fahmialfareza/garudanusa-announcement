import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import useWindowDimensions from "../hooks/useWindowDimensions";
import eventActions from "../redux/actions/eventActions";
import { selectEvent } from "../redux/reducers/event";
import { useAppDispatch } from "../redux";

function BackgroundImage() {
  const dispatch = useAppDispatch();

  const { width } = useWindowDimensions();
  const { event } = useSelector(selectEvent);

  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/images/event-example.png"
  );

  useEffect(() => {
    dispatch(eventActions.getEvent());
  }, [dispatch]);

  useEffect(() => {
    if (width && event) {
      if (width > 1024) {
        setBackgroundImage(event?.desktop_photo || "/images/event-example.png");
      } else {
        setBackgroundImage(event?.mobile_photo || "");
      }
    }
  }, [event, width]);

  return (
    <Image
      src={backgroundImage}
      alt="Background"
      layout="fill"
      style={{ opacity: "90%", zIndex: -99999, position: "absolute" }}
    />
  );
}

export default BackgroundImage;
