import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../common";
import Toast from "../toast/Toast";

const Login = () => {
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //
  const [loading, setLoading] = useState(false);
  // toast
  const [t_head, setT_head] = useState("");
  const [t_desc, setT_desc] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      const payload = {
        email,
        password,
      };
      const { data } = await axios.post(`${API}/auth`, payload);
      console.log(data.user);
      setT_head(data.msg);
      setLoading(false);
      myFunction();

      if (data.msg === "success") {
        navigate("/");
        localStorage.setItem("tweet_user123", JSON.stringify(data.user));
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  function myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  return (
    <div className="login">
      <div id="snackbar">
        <Toast h={t_head} />
      </div>
      <div className="login_wrapper">
        <div className="login_input">
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="johndoe@example.com"
            className="login_email_input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login_input">
          <label htmlFor="">Password</label>
          <input
            type={!check ? "password" : "text"}
            placeholder="password"
            className="login_password_input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login_password_checkbox">
            <input
              type="checkbox"
              name=""
              id=""
              className="login_checkbox"
              onChange={() => setCheck(!check)}
            />
            <span>Show Password</span>
          </div>
        </div>
        <button
          disabled={loading}
          className="login_button"
          onClick={handleLogin}
        >
          {loading ? "Logging..." : "Log In"}
        </button>
        <p>
          New User ?{" "}
          <span className="login_link" onClick={() => navigate("/register")}>
            Signup
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
