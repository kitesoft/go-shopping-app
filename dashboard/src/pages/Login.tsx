import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setAuthSuccess } from "../redux/authSlice";
import { validateEmail } from "../utils/ValidateInput";

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
  const dispatch = useDispatch();
  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError(null);
      const { data } = await axios.post("login", loginDetails, {
        withCredentials: true,
      });
      if (data.StatusCode === 200) {
        dispatch(
          setAuthSuccess({
            id: data?.user.id,
            email: data?.user.email,
            first_name: data?.user.first_name,
            last_name: data?.user.last_name,
          })
        );
        setAuthenticated(true);
      }
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
      <form onSubmit={onSubmit} aria-label="login-form">
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating mb-3">
          <input
            aria-label="email"
            type="email"
            className="form-control mb-2"
            placeholder="name@example.com"
            name="email"
            value={loginDetails.email || ""}
            onChange={handleChange}
          />
          {loginDetails.email && !validateEmail(loginDetails.email) && (
            <Alert severity="error">Invalid Email Input</Alert>
          )}
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            aria-label="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={loginDetails.password || ""}
            onChange={handleChange}
          />
          {loginDetails.password && loginDetails.password.length < 8 && (
            <Alert severity="error">Password is too short</Alert>
          )}
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          role="button"
          aria-label="submit-login"
        >
          Sign in
        </button>
        <Link className="nav-link active" aria-current="page" to="/register">
          <span data-feather="home" />
          register
        </Link>
        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
      </form>
    </main>
  );
};

export default Login;
