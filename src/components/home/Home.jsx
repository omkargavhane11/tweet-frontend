import "./home.css";
import Navbar from "../navbar/Navbar";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../common.js";
import PostBox from "../postBox/PostBox";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // current logged In user
  const user = JSON.parse(localStorage.getItem("tweet_user123"));
  //
  const [posts, setPosts] = useState([]);

  // fetch posts
  async function getPosts() {
    try {
      const { data } = await axios.get(`${API}/post/timeline/${user._id}`);

      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );

      // setPosts(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tweet_user123"))) {
      getPosts();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h">
      <Navbar />
      <div className="h_container">
        <div className="h_left"></div>
        <div className="h_middle">
          <PostBox posts={posts} setPosts={setPosts} />
          <div className="h_posts_container">
            {posts?.map((p) => (
              <Post key={p._id} p={p} />
            ))}
          </div>
        </div>
        <div className="h_right"></div>
      </div>
    </div>
  );
};

export default Home;
