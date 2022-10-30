import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../common.js";
import Post from "../post/Post";
import Navbar from "../navbar/Navbar";
import moment from "moment";

const Profile = () => {
  //
  const navigate = useNavigate();
  const params = useParams();
  // current logged In user
  const user = JSON.parse(localStorage.getItem("tweet_user123"));
  //
  const [profileUser, setProfileUser] = useState("");
  //
  const [following, setFollowing] = useState(
    profileUser?.followers?.includes(user._id)
  );
  const [showSaveButon, setShowSaveButon] = useState(false);
  const [edit, setEdit] = useState(false);
  // profile details
  const [dp, setDp] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get(`${API}/user/${params.id}`);
        setProfileUser(data);
        setFollowing(data.followers?.includes(user._id));
        setDp(data?.dp);
        setName(data?.name);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, [params.id]);

  //
  const [posts, setPosts] = useState([]);

  // fetch posts
  async function getPosts() {
    try {
      const { data } = await axios.get(`${API}/post/user/${params.id}`);
      console.log(data.data);

      setPosts(
        data.data.sort((p1, p2) => {
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
  }, [params.id]);

  const handleFollow = async () => {
    const payload = {
      userId: user._id,
      friendId: profileUser._id,
    };

    const type = following ? "Unfollow" : "Follow";

    try {
      const { data } = await axios.put(
        `${API}/user/handleFollow/${type}`,
        payload
      );
    } catch (error) {
      console.log(error.message);
    }
    setFollowing(!following);
  };

  const update_profile = async () => {
    const payload = new FormData();

    payload.append("name", name);
    if (file !== null) {
      payload.append("dp", file);
    }

    try {
      const { data } = await axios.put(
        `${API}/user/editProfile/${user._id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.msg === "profile updated") {
        // localStorage.setItem("tweet_user123", data.user_profile_data);
        alert("profile updated");
      } else {
        alert("failed to update profile");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile_wrapper">
          <div className="profile_top">
            <div className="profile_avatar">
              <img
                src={
                  !dp
                    ? "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
                    : dp
                }
                alt=""
                className="profile_avatar_image"
              />
              {profileUser._id === user._id && (
                <>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      let selected_file_image = URL.createObjectURL(
                        e.target.files[0]
                      );
                      setDp(selected_file_image);
                      setFile(e.target.files[0]);
                      document.getElementById("file").value = null;
                    }}
                  />
                  {edit && (
                    <label htmlFor="file">
                      {/* <img src={Image} alt="" /> */}
                      {/* <span>Add Image</span> */}
                      <span className="profile_edit_btn">Edit image</span>
                    </label>
                  )}
                  {/* {edit && (
                    <div className="save_or_cancel_dp">
                      <button
                        className="profile_edit_btn"
                        onClick={() => {
                          setDp(null);
                          setFile(null);
                          document.getElementById("file").value = null;
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )} */}
                </>
              )}
            </div>
            <div className="profile_details">
              {!edit && <div className="profile_name">{profileUser?.name}</div>}

              {edit && (
                <input
                  className="profile_name_input"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              )}
              <div className="profile_item">
                Joined on {moment(profileUser?.createdAt).format("ll")}
              </div>
              <div className="profile_item">33 Followers</div>
              <div className="profile_item">2 Following</div>
              <div className="profile_item">389 posts</div>
              {profileUser._id !== user._id && (
                <button className="prolife_follow_btn" onClick={handleFollow}>
                  {following ? "Unfollow" : "Follow +"}
                </button>
              )}
              {user._id === profileUser._id && (
                <div>
                  {!edit && (
                    <button
                      className="profile_edit_btn"
                      onClick={() => setEdit(true)}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              )}
              {edit && (
                <div className="profile_save_btns">
                  <button className="profile_edit_btn" onClick={update_profile}>
                    Save
                  </button>
                  <button
                    className="profile_edit_btn"
                    onClick={() => {
                      setEdit(false);
                      setDp(user?.dp);
                      setFile(null);
                      document.getElementById("file").value = null;
                    }}
                  >
                    cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <hr className="divider"></hr>
          <div className="profile_bottom">
            <div className="profile_posts">
              {posts?.map((p) => (
                <Post key={p._id} p={p} />
              ))}
              {posts?.length === 0 && (
                <div className="profile_no_posts">
                  No posts from {profileUser.name} to display !!!{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
