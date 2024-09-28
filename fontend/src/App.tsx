import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignupPage, StudentDashBoard, TeacherDashBoard, PreviousResponses, MakeSurveys, StatsPage, FindSurveys, TakeSurvey } from "./pages/pages";
import React, { useState } from "react";
import { AuthProvider, useAuth } from "./components/useAuth/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Layout from './components/Layout/Layout';
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
  name: string;
  district: string;
  isTeacher: boolean; // Flag to differentiate between student and teacher
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

  interface User {
    // Define your user interface here
    email: string;
    token: string;
    isTeacher: boolean;
    
  }
  

 async function loginUser(creds: Credentials, login: (data: User) => void): Promise<boolean> {
 
  console.log("IS TEACHER: ", creds.isTeacher);
   try {
    const endpoint = creds.isTeacher
       ? `${API_PREFIX}/login/teacher`
       : `${API_PREFIX}/login/student`;
     const response = await fetch(endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(creds),
     });

     if (response.status === 200) {
       const payload = await response.json();
       setToken(payload.token);
       setMessage("Login successful; auth token saved");
       console.log(token)
       const email = creds.username;
       const isTeacher = creds.isTeacher
       login({ email, token, isTeacher,  });
       return true;
     } else {
       const data = await response.json();
       setMessage(`Login Error ${response.status}: ${data}`);
       return false;
     }
   } catch (error) {
     setMessage(`Login Error: ${error}`);
     return false;
   }
 }

 async function signupUser(creds: Credentials): Promise<boolean> {
  console.log("Teacher ? : ", creds.isTeacher)
   try {
     const endpoint = creds.isTeacher
       ? `${API_PREFIX}/signup/teacher`
       : `${API_PREFIX}/signup/student`;
     const response = await fetch(endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(creds),
     });

     if (response.status === 201) {
       const payload = await response.json();
       setToken(payload.token);
       setMessage(
         `Signup successful for user: ${creds.username}; auth token saved`
       );
       return true;
     } else {
       const data = await response.json();
       setMessage(`Signup Error ${response.status}: ${data}`);
       return false;
     }
   } catch (error) {
     setMessage(`Signup Error: ${error}`);
     return false;
   }
 }
  
 

  return (
    <div id="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />}>
              {" "}
            </Route>
            <Route
              path="/Login-Teacher"
              element={<LoginPage user={"Teacher"} isTeacher={true} handleSubmit={loginUser} />}
            >
              {" "}
            </Route>
            <Route
              path="/Login-Student"
              element={<LoginPage user={"Student"} isTeacher={false} handleSubmit={loginUser} />}
            >
              {" "}
            </Route>
            <Route
              path="/Signup-Student"
              element={
                <SignupPage user={"Student"} isTeacher={false} handleSubmit={signupUser} />
              }
            >
              {" "}
            </Route>
            <Route
              path="/Signup-Teacher"
              element={
                <SignupPage user={"Teacher"}  isTeacher={true} handleSubmit={signupUser} />
              }
            >
              {" "}
            </Route>
            <Route
              path="/StudentDashBoard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <StudentDashBoard />
                  </Layout>
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>

            <Route
              path="/TeacherDashBoard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TeacherDashBoard />
                  </Layout>
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            
            <Route path="/Stats-Page" element={
                <ProtectedRoute>
                  <Layout>
                    <StatsPage />
                  </Layout>
                </ProtectedRoute>
              }>
              {" "}
            </Route>
            <Route path="/MakeSurveys-Page" element={
                <ProtectedRoute>
                  <Layout>
                    <MakeSurveys />
                  </Layout>
                </ProtectedRoute>
              }>
              {" "}
            </Route>
            <Route path="/FindSurveys-Page" element={
                <ProtectedRoute>
                  <Layout>
                    <FindSurveys />
                  </Layout>
                </ProtectedRoute>
              }>
              {" "}
            </Route>
            <Route
              path="/PreviousResponses-Page"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PreviousResponses />
                  </Layout>
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/TakeSurvey"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TakeSurvey />
                  </Layout>
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
          </Routes>
        </AuthProvider>
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
