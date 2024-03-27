import React from "react";

const Loading = ({ size }) => {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
};

export default Loading;
