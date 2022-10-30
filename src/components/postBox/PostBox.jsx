import "./postBox.css";
import { useContext, useState } from "react";
import { API } from "../../common";
import axios from "axios";

const PostBox = ({ posts, setPosts }) => {
  //
  const user = JSON.parse(localStorage.getItem("tweet_user123"));
  // console.log(user);
  //
  const [text, setText] = useState("");
  const [file, setFile] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();

      payload.append("text", text);
      payload.append("createdBy", user._id);

      const savePost = await axios.post(`${API}/post`, payload);

      if (savePost.data.msg === "success") {
        setText("");
        setFile(null);
        setPosts([savePost.data.data, ...posts]);
      } else {
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="pb">
      <div className="pb_top">
        <div className="pb_avatar">
          <img
            src={
              user?.dp === null
                ? "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
                : user?.dp
            }
            alt="user"
            className="pb_avatar_img"
          />
        </div>
        <div className="pb_username">{user?.name}</div>
      </div>
      <div className="pb_center">
        <textarea
          type="text"
          className="pb_text"
          placeholder="What's on your mind ?"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="pb_bottom">
        <button className="pb_share" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
};

export default PostBox;
