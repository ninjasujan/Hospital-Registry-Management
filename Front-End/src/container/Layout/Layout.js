import React from "react";
import Navigation from "../../component/Navigation/Navigation";
import classes from "./Layout.module.css";

const layout = (props) => {
  return (
    <div>
      <Navigation isLoggedIn={props.isLoggedIn} />
      <main className={classes.Main}>{props.children}</main>
    </div>
  );
};

export default layout;
