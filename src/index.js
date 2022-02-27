import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import config from "config";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
ReactDOM.render(
  <Router basename={`${config.publicPath}`}>
    <Switch>
      <Main />
    </Switch>
  </Router>
  ,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
