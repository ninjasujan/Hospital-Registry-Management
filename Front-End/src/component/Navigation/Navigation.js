import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./Navigation.module.css";
import Logo from "../Logo/Logo";

const navigation = (props) => {
  const assignedClass = "navbar navbar-expand-md navbar-dark primary-color".split(
    " "
  );
  assignedClass.push(classes["Navigation"]);
  const toggleClass = "navbar-toggler btn-default".split(" ");
  toggleClass.push(classes["Toggle"]);
  return (
    <nav className={assignedClass.join(" ")}>
      <div className="container">
        <div className={classes.Logo}>
          <Logo />
        </div>
        <button
          className={toggleClass.join(" ")}
          type="button"
          data-toggle="collapse"
          data-target="#mainNav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav">
            <NavigationItem link="/"> Store </NavigationItem>
            <NavigationItem link="/orders"> Orders </NavigationItem>
            <NavigationItem link="/admin/addproduct">
              Add Products
            </NavigationItem>
            {props.isAuth ? (
              <NavigationItem link="/signout"> Logout </NavigationItem>
            ) : (
              <NavigationItem link="/auth"> Auth </NavigationItem>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default navigation;
