import React, { Component } from "react";
import styled from "@emotion/styled";
import auth from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    // auth.logout();
    // window.location = "/";
  }
  handleLogout = () => {
    auth.logout();
    window.location = "/";
  };
  render() {
    return (
      <Container>
        <button onClick={this.handleLogout}>Log Out</button>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 320px;
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-shrink: 0;
  margin: 40px auto;
  padding: 0;
`;

export default Logout;
