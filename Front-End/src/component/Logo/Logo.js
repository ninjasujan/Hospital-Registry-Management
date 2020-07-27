import React from "react";
import logo from "../../img/logo.png";
import classes from "./Logo.module.css";

const logoImg = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default logoImg;
