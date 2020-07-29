import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Tablink.module.css";

const tabs = () => {
  const tabClasss = "nav nav-pills flex-column flex-sm-row px-3".split(" ");
  tabClasss.push(classes["TabLink"]);
  return (
    <nav className={tabClasss.join(" ")}>
      <NavLink
        className="flex-sm-fill text-sm-center nav-link text-center"
        exact
        to="/"
      >
        New-Register
      </NavLink>
      <NavLink
        className="flex-sm-fill text-sm-center nav-link text-center"
        to="/update-patient"
      >
        Update-Patient
      </NavLink>
      <NavLink
        className="flex-sm-fill text-sm-center nav-link text-center"
        to="/delete-patient"
      >
        Delete-Patient
      </NavLink>
    </nav>
  );
};

export default tabs;
