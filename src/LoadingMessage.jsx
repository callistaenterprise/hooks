import React from "react";
// @ts-ignore
import MDSpinner from "react-md-spinner";
const LoadingMessage = ({ message }) => (
  <div>
    Loading {message}
    <MDSpinner singleColor={"orange"} size={18} />
  </div>
);

export default LoadingMessage;
