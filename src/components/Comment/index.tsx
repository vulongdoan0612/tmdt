import { Image } from "antd";
import React from "react";

const Comment = () => {
  return (
    <div className="comment">
      <div className="avatar">
        <Image
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt=""
          preview={false}
        ></Image>
      </div>
      <div className="right-comment">
        <span className="author">Vũ Long Đoàn</span>
        <span className="content">Phim hay lắm mọi người</span>
      </div>
    </div>
  );
};
export default Comment;
