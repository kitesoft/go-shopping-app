import React from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Links from "./pages/Links";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import history from "./components/history";
import Orders from "./pages/Orders";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path={"/"} exact component={Users} />
        <Route path={"/login"} component={Login} />
        <Route path={"/products"} exact component={Products} />
        <Route path={"/products/new"} component={ProductForm} />
        <Route path={"/products/update/:productId"} component={ProductForm} />
        <Route path={"/orders"} exact component={Orders} />
        <Route path={"/users/:id/links"} component={Links} />
        <Route path={"/register"} component={Register} />
      </Router>
    </div>
  );
}

export default App;
