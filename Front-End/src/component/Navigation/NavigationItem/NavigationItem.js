import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  const assignedClass = ["nav-item", "nav-link"];
  assignedClass.push(classes["NavItem"]);
  return (
    <NavLink
      activeClassName={classes.Active}
      className={assignedClass.join(" ")}
      to={props.link}
    >
      {props.children}
    </NavLink>
  );
};

export default navigationItem;
