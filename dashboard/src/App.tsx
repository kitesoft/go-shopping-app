import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Links from "./pages/Links";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Users} />
        <Route path={"/login"} component={Login} />
        <Route path={"/products"} exact component={Products} />
        <Route path={"/products/new"} component={ProductForm} />
        <Route path={"/users/:id/links"} component={Links} />
        <Route path={"/register"} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
