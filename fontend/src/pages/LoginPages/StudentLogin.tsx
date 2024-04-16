import React, { useState } from "react";
import './login.css';

function StudentLogin() {
  const [isSignUp, setSignUp] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with:", email, password);
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
        <h2>Student Sign Up</h2>
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
        <h2>Student Log In</h2>
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

export default StudentLogin;
