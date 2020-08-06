import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(["user"]);

  const onSubmit = (e) => {
    const user = {
      username: userName,
      email: email,
      password: password,
      roles: roles,
    };

    console.log(user);
    
    axios
      .post("http://localhost:8181/api/auth/signup", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            required
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="form-control"
          />
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
