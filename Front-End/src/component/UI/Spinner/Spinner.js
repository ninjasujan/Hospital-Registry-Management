import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) => {
  return (
    <div className={classes.Outer}>
      <div className={classes.Loader}></div>
    </div>
  );
};

export default spinner;
