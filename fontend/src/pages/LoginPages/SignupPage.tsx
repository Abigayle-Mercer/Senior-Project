import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

interface Props {
  buttonLabel?: string;
  handleSubmit: (creds: Credentials) => Promise<boolean>;
  user: string,
}

interface Credentials {
  username: string;
  pwd: string;
  isTeacher?: boolean;
}
const SignupPage: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);


  const navigate = useNavigate();
  

   if (props.user === "Teacher" && !isTeacher) {
     setIsTeacher(true);
   }

   const handleSwitchToLogin = () => {
     if (props.user === "Teacher") {
       navigate("/Login-Teacher");
     } else {
       navigate("/Login-Student");
     }
   };

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
      function retreiveSuccess(bool: boolean) {
        if (bool) {
          if (isTeacher) {
            navigate("/Login-Teacher");
          } else {

          }
          navigate("/Login-Student");
        }
      }
      // navigate(/dashboard )
    );

    setCreds({ username: "", pwd: "" });
  };


  return (
    <div className="login-container">
      <h2>{props.user} Sign Up</h2>
      <form>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>School District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
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
          Sign Up
        </button>
        <span onClick={handleSwitchToLogin}> Already have an account? Login</span>
      </form>
    </div>
  );
};

export default SignupPage;
