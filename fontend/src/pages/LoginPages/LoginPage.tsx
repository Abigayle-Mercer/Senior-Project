import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/useAuth/useAuth";

import "./login.css";

interface Props {
  buttonLabel?: string;
  handleSubmit: (creds: Credentials) => Promise<boolean>;
  user: string;
}

interface Credentials {
  username: string;
  pwd: string;
  isTeacher?: boolean;
}

const LoginPage: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isTeacher, setIsTeacher] = useState(false);

  if (props.user === "Teacher" && !isTeacher) {
    setIsTeacher(true);
    }
 
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
    isTeacher: isTeacher, // ask if there needs to be a question mark here 
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreds((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  };

  const submitForm = () => {
    props.handleSubmit(creds).then(
      async function retreiveSuccess(bool: boolean) {
        if (bool) {
          if (props.user === "Teacher") {
            console.log("HIIIII")
            navigate("/TeacherDashBoard");
            const email = creds.username;
            await login({ email, isTeacher });

          } else {
            navigate("/StudentDashBoard");
            const email = creds.username;
            await login({ email, isTeacher });

          }
        
        }
      }
      // navigate(/dashboard )
    );

    setCreds({ username: "", pwd: "" });
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
