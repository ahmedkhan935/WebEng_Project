import React, { useEffect, useRef } from "react";
import {JitsiMeeting} from "@jitsi/react-sdk";

const JitsiMeetComponent = ({ roomName, displayName }) => {
  const jitsiContainerRef = useRef(null);
  console.log(roomName);
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: roomName,
      width: "100%",
      height: "100vh",
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
  

    

    return () => {
      api.dispose();
    };
  }, [roomName, displayName]);

  return <div ref={jitsiContainerRef} />;
};

export default JitsiMeetComponent;
