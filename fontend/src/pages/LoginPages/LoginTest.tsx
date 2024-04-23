import React, { useState, ChangeEvent, FormEvent } from "react";

interface Props {
  buttonLabel?: string;
  handleSubmit: (creds: Credentials) => void;
}

interface Credentials {
  username: string;
  pwd: string;
}

const Login: React.FC<Props> = (props) => {
  const [creds, setCreds] = useState<Credentials>({
    username: "",
    pwd: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreds((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  };

  const submitForm = () => {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  };

  return (
    <form>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        name="username"
        id="username"
        value={creds.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.pwd}
        onChange={handleChange}
      />
      <input
        type="button"
        value={props.buttonLabel || "Log In"}
        onClick={submitForm}
      />
    </form>
  );
};

export default Login;
