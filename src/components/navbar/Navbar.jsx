import "./navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const navigate = useNavigate();
  //
  const user = JSON.parse(localStorage.getItem("tweet_user123"));
  //
  const [search, setSearch] = useState("");
  const [model, setModel] = useState(false);

  return (
    <div className="n">
      <div className="n_left" onClick={() => navigate("/")}>
        tweet
      </div>
      <div className="n_center">
        <div className="n_search">
          <input
            className="n_search_input"
            placeholder="Search friends..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <div>
            <SearchIcon
              className="n_search_icon"
              onClick={() => {
                if (search.length) {
                  navigate(`/search/${search}`);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="n_right">
        <span className="n_username">{user?.name}</span>
        <div className="n_avatar_container">
          <img
            src={
              user?.dp === null
                ? "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
                : user?.dp
            }
            className="n_dp"
            onClick={() => setModel(!model)}
          />
          {model && (
            <div className="n_model" id="n_model">
              <div
                className="n_model_item"
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                }}
              >
                Profile
              </div>
              <div
                className="n_model_item"
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("tweet_user123");
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
