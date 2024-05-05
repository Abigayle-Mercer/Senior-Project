import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignupPage, DashBoard, LoginTest, PreviousResponses, MakeSurveys, StatsPage, FindSurveys } from "./pages/pages";
import React, { useState } from "react";
import "../defined.js";

import "./App.css";
import "./styles.css";



function App() {

  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const API_PREFIX = "http://localhost:4000";



  interface Credentials {
    username: string;
    pwd: string;
  }


  /*
  const promise = fetch(`${API_PREFIX}/users`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(person),
  });
  */

  async function loginUser(creds: Credentials): Promise<boolean> {
    try {
      const response = await fetch(`${API_PREFIX}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      if (response.status === 200) {
        const payload = await response.json();
        setToken(payload.token); // make these states
        setMessage(`Login successful; auth token saved`); // make these states
        return true;
      } else {
        const data = await response.json();
        setMessage(`Login Error ${response.status}: ${data}`);
        return false
      }
    } catch (error) {
      setMessage(`Login Error: ${error}`);
      return false
    }
  }

  async function signupUser(creds: Credentials): Promise<boolean> {
    try {
    const response = await fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
        if (response.status === 201) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
          return true;
        } else {
          const data = await response.json();
          setMessage(`Signup Error ${response.status}: ${data}`);
          return false
        }
    } catch(error) {
        setMessage(`Signup Error: ${error}`);
        return false
      }
  }

  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            {" "}
          </Route>
          <Route
            path="/Login-Page"
            element={<LoginPage handleSubmit={loginUser} />}
          >
            {" "}
          </Route>
          <Route path="/Signup-Page" element={<SignupPage handleSubmit={signupUser}/>}>
            {" "}
          </Route>
          <Route path="/DashBoard" element={<DashBoard />}>
            {" "}
          </Route>
          <Route
            path="/Login-Test"
            element={<LoginTest handleSubmit={loginUser} />}
          >
            {" "}
          </Route>
          <Route path="/Stats-Page" element={<StatsPage />}>
            {" "}
          </Route>
          <Route path="/MakeSurveys-Page" element={<MakeSurveys />}>
            {" "}
          </Route>
          <Route path="/FindSurveys-Page" element={<FindSurveys />}>
            {" "}
          </Route>
          <Route path="/PreviousResponses-Page" element={<PreviousResponses />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

  // <>
  //   <div>
  //     <a href="https://vitejs.dev" target="_blank">
  //       <img src={viteLogo} className="logo" alt="Vite logo" />
  //     </a>
  //     <a href="https://react.dev" target="_blank">
  //       <img src={reactLogo} className="logo react" alt="React logo" />
  //     </a>
  //   </div>
  //   <h1>Vite + React</h1>
  //   <div className="card">
  //     <button onClick={() => setCount((count) => count + 1)}>
  //       count is {count}
  //     </button>
  //     <p>
  //       Edit <code>src/App.tsx</code> and save to test HMR
  //     </p>
  //   </div>
  //   <p className="read-the-docs">
  //     Click on the Vite and React logos to learn more
  //   </p>
  // </>
}

export default App;
