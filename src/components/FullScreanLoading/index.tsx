import React from "react";
import { Image } from "antd";

const FullScreenLoading = () => {
  return (
    <div id="full-screen-loading">
      <Image
        preview={false}
        width={"280px"}
        height={"280px"}
        src="/images/loading-cute.gif"
        alt=""
        className="loading-full"
      />
    </div>
  );
};
export default FullScreenLoading;
