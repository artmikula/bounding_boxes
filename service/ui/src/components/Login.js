import React from "react";
import userIcon from "../images/user.png";
import lockIcon from "../images/padlock.png";
import cowIcon from "../images/cow.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login({ error, setError, setUser, userAdded }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const signUpUser = (e) => {
    e.preventDefault();
    setError(null);
    navigate("/signup");
  };

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser();
  };

  async function loginUser() {
    setError("");
    if (loginInfo.password && loginInfo.username) {
      await axios.post("/server/verify", loginInfo).then((response) => {
        if (response.data === true) {
          localStorage.setItem("username", loginInfo.username);
          setError(null);
          navigate("/main");
        } else {
          setError("Wrong password");
        }
      });
    } else {
      setError("Enter username and password");
    }
  }

  return (
    <div className="login">
      <div className="top">
        <img src={userIcon} alt="user_icon" id="userIcon" />
      </div>
      <div className="bottom">
        <form id="loginform" autoComplete="off">
          {error !== "" ? <div className="error">{error}</div> : ""}
          {userAdded !== "" ? <div className="message">{userAdded}</div> : ""}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="ID"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                loginHandler(e);
              }
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                loginHandler(e);
              }
            }}
          />
          <input
            className="button2"
            type="button"
            value="로그인"
            onClick={(e) => loginHandler(e)}
          />
          <input
            className="button2"
            type="button"
            value="가입하기"
            onClick={(e) => signUpUser(e)}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
