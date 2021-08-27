import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e: any) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const history = useHistory();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("register", userDetails).then((res) => {
      console.log("Success payload", res);
      history.push("/login");
    });
  };

  return (
    <main className="auth-form">
      <form onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="first_name"
            onChange={handleChange}
            value={userDetails.first_name || ""}
          />
          <label>First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={userDetails.last_name || ""}
          />
          <label>Last Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            name="email"
            autoComplete="off"
            onChange={handleChange}
            value={userDetails.email || ""}
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={handleChange}
            value={userDetails.password || ""}
          />
          <label>Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={userDetails.confirm_password || ""}
          />
          <label>Confirm Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign Up
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
      </form>
    </main>
  );
};

export default Register;
