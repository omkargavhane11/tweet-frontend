import "./search.css";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { API } from "../../common.js";
import { useParams, useNavigate } from "react-router-dom";
import notfound from "./notfound.PNG";
import SearchResult from "../searchResult/SearchResult";

const Search = () => {
  const [result, setResult] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  //
  const users = [12, 3, 5, 2, 6];

  // fetch users
  async function getUsers() {
    try {
      const data = await axios.get(`${API}/user/search/${params.userName}`);
      console.log(data.data);
      setResult(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, [params.userName]);

  return (
    <div className="s">
      <Navbar />
      <div className="s_results">
        <div className="s_result_items">
          {result?.map((r) => (
            <SearchResult user={r} />
          ))}
          {result?.length === 0 && (
            <div className="s_notfound">
              <img src={notfound} alt="" className="s_notfound_img" />
              <p>No results found</p>
              <span>Try shortening or rephrasing your search.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
