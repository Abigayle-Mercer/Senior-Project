import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function LoginPage() {
  const [isSignUp, setSignUp] = useState(false);
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/DashBoard");
  };

  const handleLogin = () => {
    // Implement your login logic here
    console.log("HELLO")
    console.log("Logging in with:", email, district, password);
    navigateToLogin();
  };

  const handleSignUp = () => {
    setSignUp(false); // Switch to login form
  };

  const handleSwitchToSignUp = () => {
    setSignUp(true); // Switch to sign-up form
  };
  
    function SignUp() {
      return (
        <div className="login-container">
          <h2>Teacher Sign Up</h2>
          <form onSubmit={handleLogin}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleSignUp} type="submit" className="login-btn">
              Sign Up
            </button>
            <span onClick={handleSignUp}> Already have an account? Login</span>
          </form>
        </div>
      );
    }



    function Login() {
      return (
        <div className="login-container">
          <h2>Teacher Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleLogin} type="submit" className="login-btn">
              Login
            </button>
            <span onClick={handleSwitchToSignUp}>
              Don't have an account? Sign up
            </span>
          </form>
        </div>
      );
    }


  

  return isSignUp ? <SignUp /> : <Login />;
}

export default LoginPage;
