import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { injectGlobal } from "emotion";
import styled from "@emotion/styled";
import Login from "./containers/login";
import Logout from "./components/logout";
import Registration from "./containers/registration";
import NotFound from "./components/notFound";
import auth from "./services/authService";
import ProtectedRoute from "./components/protectedRoute";
import Profile from "./components/profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const user = auth.getUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Main>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/"
              render={props => {
                if (user) return <Logout {...props} />;
                return <Registration {...props} />;
              }}
            />
            <Redirect to="/not-found" />
          </Switch>
        </Main>
      </React.Fragment>
    );
  }
}

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    margin:0;
    background-color: #ffffff;
    -webkit-tap-highlight-color: #000000;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica';
    width: 100%;
    margin: 0;
    overflow-x: hidden;
    word-wrap: break-word;
  }

  body, button, input, textarea {
    color: #262626;
    color: rgba(var(--i1d,38,38,38),1);
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 18px;
  }
  a {
    text-decoration:none;
    &:active, &:hover, &:visited {
      text-decoration:none;
    }
  }

  div {
    align-items: stretch;
    box-sizing: border-box;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
  }
  button {
    appearance: none;
    background: 0 0;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    font-weight: 600;
    text-align: center;
    text-transform: inherit;
    text-overflow: ellipsis;
    user-select: none;
    width: 100%;
    background-color: #3897f0;
    border: 1px solid transparent;
    border-radius: 4px;
    color:#ffffff;
    margin: auto;
    padding: 5px 9px;
  }
`;
const Main = styled.div`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
`;

export default App;
