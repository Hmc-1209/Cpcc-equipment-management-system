import React from "react";
import "../../css/loading.css";

const Loading = (classes) => {
  return (
    <div className={"loading-container"}>
      <div className={"loading-spinner " + classes.classes}></div>
    </div>
  );
};

export default Loading;
