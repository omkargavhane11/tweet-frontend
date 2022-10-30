import "./searchResult.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API } from "../../common.js";

const SearchResult = ({ user }) => {
  const navigate = useNavigate();
  // current logged In user
  const logged_user = JSON.parse(localStorage.getItem("tweet_user123"));
  //
  // const [profileUser, setProfileUser] = useState("");
  //
  const [following, setFollowing] = useState(
    user?.followers?.includes(logged_user._id)
  );

  const handleFollow = async () => {
    const payload = {
      userId: logged_user._id,
      friendId: user._id,
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

  return (
    <div className="sr">
      <div className="sr_wrapper">
        <div className="sr_left">
          <img
            src="https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
            alt=""
            className="sr_avatar"
          />
        </div>
        <div className="sr_right">
          <div className="sr_name">{user?.name}</div>
          <div className="sr_btns">
            <button className="sr_follow" onClick={handleFollow}>
              {following ? "Unfollow" : "Follow +"}
            </button>
            <button
              className="sr_view_profile"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
