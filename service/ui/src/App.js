import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Error from "./components/Error";
import Detect from "./components/Detect";

function App() {
  const [error, setError] = useState(null);
  const [userAdded, setUserAdded] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setUserAdded={setUserAdded} />
        <div className="mainCont">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Login
                  error={error}
                  setError={setError}
                  userAdded={userAdded}
                  setUserAdded={setUserAdded}
                />
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <Signup
                  error={error}
                  setError={setError}
                  userAdded={userAdded}
                  setUserAdded={setUserAdded}
                />
              }
            ></Route>
            {localStorage.getItem("username") && (
              <Route path="/main" element={<Main />}></Route>
            )}
            {localStorage.getItem("username") && (
              <Route exact path="/detect" element={<Detect />}></Route>
            )}
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
