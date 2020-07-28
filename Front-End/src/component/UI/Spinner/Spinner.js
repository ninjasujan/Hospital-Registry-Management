import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) => {
  return (
    <div className={classes.Outer}>
      <div class={classes.Loader}></div>
    </div>
  );
};

export default spinner;
