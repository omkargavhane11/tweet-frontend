import "./register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../common";

const Register = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const payload = {
        name,
        email,
        password,
      };
      const { data } = await axios.post(`${API}/user/register`, payload);

      console.log(data.data);
      setLoading(false);

      setName("");
      setEmail("");
      setPassword("");
      setCheck(false);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register_wrapper">
        <div className="register_input">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="john doe"
            className="register_name_input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="register_input">
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="johndoe@example.com"
            className="register_email_input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="register_input">
          <label htmlFor="">Password</label>
          <input
            type={!check ? "password" : "text"}
            placeholder="password"
            className="register_password_input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="register_password_checkbox">
            <input
              type="checkbox"
              name=""
              id=""
              className="register_checkbox"
              onChange={() => setCheck(!check)}
              checked={check}
            />
          </div>
        </div>
        <button className="register_button" onClick={handleRegister}>
          Register
        </button>
        <p>
          Already a User ?{" "}
          <span className="register_link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
