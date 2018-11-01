import React from "react";
import { Auth0Lock } from "auth0-lock";
import auth0 from "auth0-js";

var lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN
);

var webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_DOMAIN,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: "http://localhost:3000/callback"
});

webAuth.parseHash((err, authResult) => {
  if (authResult) {
    // Save the tokens from the authResult in local storage or a cookie
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("expires_at", expiresAt);
  } else if (err) {
    // Handle errors
    console.log(err);
  }
});

class Login extends React.Component {
  state = {};
  render() {
    return (
      <div
        onClick={function() {
          lock.show();
        }}
      >
        {" "}
        login
      </div>
    );
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}

export default Login;
