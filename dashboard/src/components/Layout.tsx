import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/configureStore";
import Menu from "./Menu";
import Nav from "./Nav";

const Layout = (props: any) => {
  const history = useHistory();

  const user = useSelector((state: RootState) => state.user);
  if (!user.isAuthenticated) {
    history.push("/login");
  }
  return (
    <div>
      {" "}
      {user && <Nav user={null} />}
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
