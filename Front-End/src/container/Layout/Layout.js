import React from "react";
import Navigation from "../../component/Navigation/Navigation";

const layout = (props) => {
  return (
    <div>
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
};

export default layout;
