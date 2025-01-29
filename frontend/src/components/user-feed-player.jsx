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
      className="h-full object-cover rounded-xl"
      muted={true}
      autoPlay
    />
  );
};

export default UserFeedPlayer;
