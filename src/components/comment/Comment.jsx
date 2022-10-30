import React from "react";
import { format } from "timeago.js";

const Comment = ({ comm }) => {
  // current logged In user
  const user = JSON.parse(localStorage.getItem("tweet_user123"));

  return (
    <div className="p_comment">
      <div className="p_comment_left">
        <img
          src={
            comm?.commentBy?.dp === null
              ? "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
              : comm?.commentBy?.dp
          }
          alt=""
          className="p_avatar"
        />
      </div>
      <div className="p_comment_right">
        <div className="p_comment_right_top">
          <div className="p_comment_name_and_time">
            <div className="p_comment_by">{comm?.commentBy?.name}</div>
            <span className="p_time">{format(comm?.createdAt)}</span>
          </div>
          <div className="p_comment_text">{comm.comment}</div>
        </div>
        <div className="p_comment_right_bottom">
          {/* <span className="p_delete">Reply</span> */}

          {comm?.commentBy?._id === user._id && (
            <span className="p_delete">Delete</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
