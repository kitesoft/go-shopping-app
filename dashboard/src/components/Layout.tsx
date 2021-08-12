import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../models/user";
import Menu from "./Menu";
import Nav from "./Nav";

const Layout = (props: any) => {
  const [isNotAuthenticated, setNotAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user", { withCredentials: true });
        setNotAuthenticated(false);
        setUser(data);
      } catch (error) {
        setNotAuthenticated(true);
      }
    })();
  }, []);

  if (isNotAuthenticated) {
    history.push("/login");
  }
  return (
    <div>
      {" "}
      {user && <Nav user={user} />}
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
