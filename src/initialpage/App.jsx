import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./loginpage";
import RegistrationPage from "./RegistrationPage";
import ClientSingleData from "../MainPage/Pages/Pages/clientSingleData";
import ForgotPassword from "./forgotpassword";
import OTP from "./otp";
import LockScreen from "./lockscreen";
import { PrivateRoute } from "../route/privateRoute";

import DefaultLayout from "./Sidebar/DefaultLayout";

import Error404 from "../MainPage/Pages/ErrorPage/error404";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem("userIbfo");
  return (
    <Route
      {...rest}
      render={(props) => {
        const dd = JSON.parse(accessToken)?.token;
        return dd ? <Redirect to={"/app"} /> : <Component {...props} />;
      }}
    />
  );
};

const App = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <AuthRoute path="/login" component={LoginPage} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/otp" component={OTP} />
      <Route path="/lockscreen" component={LockScreen} />
      <PrivateRoute path="/app" component={DefaultLayout} />
      <Route path="/error-404" component={Error404} />
      {/* <Route path="/client/:id" component={ClientSingleData} />
       */}
    </Switch>
  );
};
export default App;
