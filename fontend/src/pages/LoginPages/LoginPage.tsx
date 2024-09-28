import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/useAuth/useAuth";

import "./login.css";

interface Props {
  buttonLabel?: string;
  handleSubmit: (creds: Credentials) => Promise<boolean>;
  user: string;
  isTeacher: boolean;
}

interface Credentials {
  username: string;
  pwd: string;
  name: string;
  district: string;
  isTeacher: boolean; // Flag to differentiate between student and teacher

}


interface User {
  email: string;
  token: string;
  isTeacher: boolean;
}
const LoginPage: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();
 

 
  const handleSwitchToSignUp = () => {
    if (props.user === "Teacher") {
            navigate("/Signup-Teacher");
    }
    else {
        navigate("/Signup-Student");
    }
  }

  const [creds, setCreds] = useState<Credentials>({
    username: "",
    pwd: "",
    name: "",
    district: "",
    isTeacher: props.isTeacher, // ask if there needs to be a question mark here 
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreds((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  };

  const submitForm = () => {
    setCreds((prevCreds) => ({
      ...prevCreds,
      isTeacher: props.isTeacher,
    }));

    console.log("IS TEACHER: ", creds)
    props.handleSubmit(creds, login).then(
      async function retreiveSuccess(bool: boolean) {
        if (bool) {
          if (props.user === "Teacher") {
            console.log("navigating to teacher dashboard")
            navigate("/TeacherDashBoard");
            
          } else {
            console.log("navigating to student dashboard")
            navigate("/StudentDashBoard");
            

          }
        
        }
      }
      // navigate(/dashboard )
    );

    setCreds({ username: "", name: "", district: "", pwd: "", isTeacher: props.isTeacher });
  };

  

  return (
    <div className="login-container">
      <h2>{props.user} Log In</h2>
      <form>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={creds.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={creds.pwd}
            onChange={handleChange}
          />
        </div>
        <button onClick={submitForm} type="button" className="login-btn">
          Login
        </button>
        <span onClick={handleSwitchToSignUp}>
          Don't have an account? Sign up
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
