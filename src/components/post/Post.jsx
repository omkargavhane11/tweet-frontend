import "./post.css";
// import moment from "moment";
import { format } from "timeago.js";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comment from "../comment/Comment";

const Post = ({ p }) => {
  const navigate = useNavigate();
  // current logged In user
  const user = JSON.parse(localStorage.getItem("tweet_user123"));

  const [isLiked, setisLiked] = useState(p?.likes?.includes(user._id));
  const [likeData, setLikeData] = useState(p?.likes?.length);

  const [comment, setComment] = useState("");
  // comment show and hide state
  const [commentOpen, setcommentOpen] = useState(false);
  // comments data state
  const [commentData, setCommentData] = useState(
    p?.comments.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    })
  );

  // add comment function
  const handle_add_comment = async (postId) => {
    const newComment = {
      commentBy: user._id,
      comment,
      postId,
    };

    try {
      const { data } = await axios.post(
        `http://localhost:8800/comment/new/${postId}`,
        newComment
      );
      if (data.msg === "success") {
        setCommentData([data.data, ...commentData]);
        console.log(data.data);
      }
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // like and unlike post
  const handle_like = async (postId) => {
    const payload = {
      userId: user._id,
    };

    try {
      if (!isLiked) {
        const handleLike = await axios.put(
          `http://localhost:8800/post/like/${postId}`,
          payload
        );
        console.log(handleLike.data.msg);
        if (handleLike.data.msg === "liked") {
          setisLiked(!isLiked);
          setLikeData(likeData + 1);
        }
      } else {
        const handleLike = await axios.put(
          `http://localhost:8800/post/dislike/${postId}`,
          payload
        );
        console.log(handleLike.data.msg);
        if (handleLike.data.msg === "unliked") {
          setisLiked(!isLiked);
          setLikeData(likeData - 1);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p">
      <div className="p_top">
        <div className="p_top_left">
          <img
            src={
              p?.createdBy?.dp === null
                ? "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
                : p?.createdBy?.dp
            }
            alt={p?.avatar}
            className="p_avatar"
          />
        </div>
        <div className="p_top_right">
          <div
            className="p_name"
            onClick={() => {
              navigate(`/profile/${p?.createdBy?._id}`);
            }}
          >
            {p?.createdBy?.name}
          </div>
          <div className="p_time">{format(p?.createdAt)}</div>
        </div>
      </div>
      <div className="p_center">
        <div className="p_text">{p?.text}</div>
        {p?.media && (
          <img src={p?.media} alt="media" className="p_media_item" />
        )}
      </div>
      <div className="p_bottom">
        <div className="p_buttons">
          {/* like */}
          <div className="p_like_container">
            {!isLiked ? (
              <FavoriteBorderIcon
                className="p_likeIcon"
                onClick={() => handle_like(p._id)}
              />
            ) : (
              <FavoriteIcon
                className="p_likeIcon liked"
                onClick={() => handle_like(p._id)}
              />
            )}
            <div className="p_liked_by_avatar">{likeData}</div>
          </div>

          {/* comment */}
          <div className="p_comment_container">
            {!commentOpen ? (
              <ChatBubbleOutlineIcon
                className="p_comment_icon"
                onClick={() => setcommentOpen(!commentOpen)}
              />
            ) : (
              <ChatBubbleIcon
                className="p_comment_icon"
                onClick={() => setcommentOpen(!commentOpen)}
              />
            )}
            <div className="p_liked_by_avatar">{commentData.length}</div>
          </div>
        </div>
      </div>

      {commentOpen && (
        <div className="p_comment_section">
          {/* user comment  */}
          <div className="p_comment_input_div">
            <img
              src={
                user?.dp === null
                  ? "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
                  : user?.dp
              }
              alt=""
              className="p_comment_avatar p_avatar"
            />
            <input
              type="text"
              className="p_comment_input"
              placeholder="Add a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              className="p_post_button"
              onClick={() => handle_add_comment(p._id)}
            >
              Post
            </button>
          </div>

          {/* comments map */}
          <div className="p_comments">
            {commentData.map((comm) => (
              <Comment comm={comm} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
