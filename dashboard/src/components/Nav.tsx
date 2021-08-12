import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = (props: { user: User | null }) => {
  const logout = async () =>
    await axios.post("logout", null, { withCredentials: true });
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
        Ambassador App
      </Link>
      <ul className="my-2 my-md-0 mr-md-3">
        <Link to="profile" className="p-2 text-white text-decoration-none">
          {props.user?.first_name} {props.user?.last_name}{" "}
        </Link>
        <Link
          to="/login"
          className="p-2 text-white text-decoration-none"
          onClick={logout}
        >
          Sign Out
        </Link>
      </ul>
    </header>
  );
};

export default Nav;
