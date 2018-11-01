import React from "react";
import Login from "./login";

const Authenticate = App =>
  class extends React.Component {
    state = {
      loggedIn: false
    };

    componentDidMount() {
      if (!localStorage.getItem('access_token')) {
        this.setState({ loggedIn: false });
      } else {
        this.setState({ loggedIn: true });
      }
    }

    render() {
      if (this.state.loggedIn) return <App />;
      return <Login />;
    }
  };

export default Authenticate;
