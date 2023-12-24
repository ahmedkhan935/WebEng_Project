import React, { useEffect, useRef } from "react";

const JitsiMeetComponent = ({ roomName, displayName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: roomName.classCode,
      width: "100%",
      height: "100vh",
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    //get link 
    api.addEventListener("videoConferenceJoined", () => {
     const link = api.getMeetingUrl();
        console.log(link);
    }
    );


    return () => {
      api.dispose();
    };
  }, [roomName, displayName]);

  return <div ref={jitsiContainerRef} />;
};

export default JitsiMeetComponent;
