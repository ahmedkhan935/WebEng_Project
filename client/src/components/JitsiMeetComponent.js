import React, { useEffect, useRef } from "react";
import {JitsiMeeting} from "@jitsi/react-sdk";

const JitsiMeetComponent = ({ roomName, displayName,apikey }) => {
  const jitsiContainerRef = useRef(null);
  console.log(roomName);
  useEffect(() => {
    const domain = "8x8.vc";
    const options = {
      roomName: `${apikey}/${roomName}`,
      width: "100%",
      height: "90vh",
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
