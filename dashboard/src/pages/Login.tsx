import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [loginDetails, setloginDetails] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: any) => {
    setError(null);
    setloginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const history = useHistory();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError(null);
      await axios.post("login", loginDetails, { withCredentials: true });
      setAuthenticated(true);
    } catch (error) {
      error?.response?.data?.message &&
        setError(error?.response?.data?.message);
    }
  };

  if (isAuthenticated) {
    history.push("/");
  }

  return (
    <main className="auth-form">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            name="email"
            value={loginDetails.email || ""}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={loginDetails.password || ""}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
      </form>
    </main>
  );
};

export default Login;
