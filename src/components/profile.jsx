import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Logout from "./logout";

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <Article>
        <UserData>
          <b>Full Name</b>: {user.fullname}
        </UserData>
        <UserData>
          <b>Email</b>: {user.email}
        </UserData>
        <UserData>
          <b>Username</b>: {user.username}
        </UserData>
        <UserData>
          <b>Password</b>: {user.password}
        </UserData>
        {user && <Logout />}
      </Article>
    );
  }
}
const Article = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 30px auto 0;
  max-width: 935px;
  width: 100%;
`;

const UserData = styled.div`
  text-align: center;
  margin: 10px;
`;

Profile.propTypes = {
  user: PropTypes.object
};
export default Profile;
