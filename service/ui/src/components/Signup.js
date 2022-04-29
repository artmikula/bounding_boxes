import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage({ error, setError, userAdded, setUserAdded }) {
  let usernameExists = false;
  let navigate = useNavigate();

  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });

  const cancelSignup = (e) => {
    setError(null);
    setUserAdded(null);
    navigate("/");
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    setError(null);
    signUpNewUser();
  };

  async function signUpNewUser() {
    if (
      newUserData.password &&
      newUserData.rePassword &&
      newUserData.password !== newUserData.rePassword
    ) {
      setError("Password doesn't match");
    } else if (
      newUserData.username &&
      newUserData.password &&
      newUserData.rePassword &&
      newUserData.password === newUserData.rePassword
    ) {
      await checkUserExists();
      if (usernameExists === true) {
        setError("Username not available");
      } else {
        setError(null);
        addUser();
        setUserAdded("New user added");
        navigate("/");
      }
    } else {
      setError("Wrong data entered");
    }
  }

  async function checkUserExists() {
    await axios
      .get(`/server/USERS/${newUserData.username}`)
      .then((response) => {
        if (response.data.length > 0) {
          usernameExists = true;
        }
      });
  }

  const addUser = () => {
    axios.post("/server/adduser", newUserData).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="signupCont">
      {error !== "" ? <div className="error">{error}</div> : ""}
      {userAdded !== "" ? <div className="message">{userAdded}</div> : ""}
      <div className="signup">
        <form id="signupForm" autoComplete="off">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="ID"
            onChange={(e) =>
              setNewUserData({ ...newUserData, username: e.target.value })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                signUpHandler(e);
              }
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setNewUserData({ ...newUserData, password: e.target.value })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                signUpHandler(e);
              }
            }}
          />
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="Confirm password"
            onChange={(e) =>
              setNewUserData({ ...newUserData, rePassword: e.target.value })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                signUpHandler(e);
              }
            }}
          />
          <input
            className="button2"
            type="button"
            value="취소"
            onClick={(e) => cancelSignup(e)}
          />
          <input
            className="button2"
            type="button"
            value="가입하기"
            onClick={(e) => signUpHandler(e)}
          />
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
