import React, { useEffect, useRef } from "react";

const UserFeedPlayer = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      style={{ height: "300px", width: "300px" }}
      muted={true}
      autoPlay
    />
  );
};

export default UserFeedPlayer;
