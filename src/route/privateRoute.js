import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem("userIbfo");
  return (
    <Route
      {...rest}
      render={(props) => {
        const dd = JSON.parse(accessToken)?.token
        return dd ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        );
      }}
    />
  );
};


        // episode.mode = episode_creds.mode
