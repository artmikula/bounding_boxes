import React from "react";
import { useNavigate } from "react-router-dom";
import cow_img from "../images/cow.png";

function Navbar({ setUserAdded }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("username");
    setUserAdded("");
    navigate("/");
  };

  return (
    <nav>
      <div id="topRight">
        <div className="hamburger" onClick={() => alert("Menu")}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <h1>백곡농장</h1>
        <img src={cow_img} alt="cow_img" id="cow_img" />
      </div>
      {localStorage.getItem("username") !== null ? (
        <button className="button2" onClick={() => logout()}>
          로그 아웃
        </button>
      ) : (
        <div></div>
      )}
    </nav>
  );
}

export default Navbar;
