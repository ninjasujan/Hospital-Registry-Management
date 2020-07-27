import React from "react";
import Navigation from "../Navigation/Navigation";
import classes from "./Toolbar.module.css";
import Logo from "../Logo/Logo";

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <Navigation />
    </div>
  );
};

export default toolbar;
