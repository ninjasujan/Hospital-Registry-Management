import React from "react";
import Layout from "./container/Layout/Layout";
import Signup from "./container/Auth/Signup/Signup";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </Layout>
  );
}

export default App;
