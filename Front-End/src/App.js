import React from "react";
import Layout from "./container/Layout/Layout";
import Signup from "./container/Auth/Signup/Signup";

import { Route, Switch } from "react-router-dom";
import Login from "./container/Auth/Login/Login";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Layout>
  );
}

export default App;
