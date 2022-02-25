import React, {useState} from "react";
import { useHistory} from "react-router-dom";
import "./Search.css"
import { ImCross } from "react-icons/all";
import {handleDialog} from "../navbar/Navbar"
// import { useNavigate } from "react-router-dom";

const Search = (props) => {
    // const navigate = useNavigate();
    const history = useHistory();
    const [keyword, setKeyword] = useState("");
    
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            history.push( `/products/${keyword}`);
        }
        else{
            history.push("products");
        }
    }

    const backToHome = () =>{
      history.push("/");
    }
  
  return (
    <>
    <div id="container_for_search">

      <form action="" onSubmit={searchSubmitHandler} className="search_tag">
        
        <input
          type="text"
          placeholder="Search Your Sweet"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
          </div>
    </>
  );
};

export default Search;
