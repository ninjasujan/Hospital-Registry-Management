import React from "react";
import Navigation from "../../component/Navigation/Navigation";
import classes from "./Layout.module.css";

const layout = (props) => {
  return (
    <div>
      <Navigation />
      <main className={classes.Main}>{props.children}</main>
    </div>
  );
};

export default layout;
