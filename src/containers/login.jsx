import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";

class Login extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "" },
      errors: {}
    };
  }

  schema = {
    username: Joi.string()
      .min(6)
      .required()
      .label("Username"),
    password: Joi.string()
      .min(6)
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data: user } = this.state;
      await auth.login(user);
      //const { state } = this.props.location;
      //window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getUser()) return <Redirect to="/" />;

    return (
      <Article>
        <RegistrationWrapper>
          <RegistrationModule>
            <Logo>Instagram</Logo>
            <LoginForm onSubmit={this.handleSubmit}>
              {this.renderInputField("username", "Username")}
              {this.renderInputField("password", "Password", "password")}
              {this.renderActionButton("Log In")}
              {this.renderErrorMessage()}
            </LoginForm>
            <Divider>
              <span>or</span>
            </Divider>
            <RegisterWithFB>
              <LogInFacebookButton>
                <span />
                Log in with Facebook
              </LogInFacebookButton>
            </RegisterWithFB>
            <ForgotPassword>
              <Link to="/login">Forgot Password?</Link>
            </ForgotPassword>
          </RegistrationModule>
          <RegisteredUsers>
            Don't have an account?
            <Link to="/">Sign up</Link>
          </RegisteredUsers>
          <GetApp>
            <p>Get the app</p>
            <Apps>
              <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.signupPage.badge&amp;mt=8&amp;vt=lo">
                <img
                  alt="Available on the App Store"
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DXCXKQAAEAAE6XZKAZ7PHTQEX9T3U%26utm_content%3Dlo%26utm_medium%3Dbadge">
                <img
                  alt="Available on Google Play"
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                />
              </a>
            </Apps>
          </GetApp>
        </RegistrationWrapper>
      </Article>
    );
  }
}

const Article = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  margin: 30px auto 0;
  max-width: 935px;
  padding-bottom: 44px;
  width: 100%;
`;

const RegistrationWrapper = styled.div`
  color: #262626;
  flex-grow: 1;
  justify-content: center;
  margin-top: 12px;
  max-width: 350px;
  width: 100%;
`;

const RegistrationModule = styled.div`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 10px 0;
`;

const Logo = styled.h1`
  display: block;
  overflow: hidden;
  text-indent: 110%;
  white-space: nowrap;
  background-image: url(https://www.instagram.com/static/bundles/es6/sprite_core_b20f2a3cd7e4.png/b20f2a3cd7e4.png);
  background-repeat: no-repeat;
  background-position: -98px 0;
  height: 51px;
  width: 175px;
  margin: 22px auto 12px;
`;

const RegisterWithFB = styled.div`
  text-align: center;
  margin: 0 40px 6px;
`;
const LogInFacebookButton = styled.button`
  background-color: transparent;
  background: none;
  color: #385185;
  span {
    position: relative;
    display: inline-block;
    height: 16px;
    width: 16px;
    background-image: url(https://www.instagram.com/static/bundles/es6/sprite_core_b20f2a3cd7e4.png/b20f2a3cd7e4.png);
    background-repeat: no-repeat;
    background-position: -246px -319px;
    margin-right: 8px;
    top: 2px;
  }
`;
const Divider = styled.div`
  color: #999;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  margin: 20px 18px;
  text-transform: uppercase;
  position: relative;
  background-color: #fff;
  text-align: center;
  z-index: 5;
  &:before {
    display: inline-block;
    content: "";
    width: 100%;
    height: 2px;
    border-bottom: 1px solid #efefef;
    position: absolute;
    top: 5px;
    left: 0;
    z-index: -1;
  }
  span {
    background-color: #fff;
    padding: 0 10px;
  }
`;

const LoginForm = styled.form`
  margin: 0 40px 6px;
`;

const RegisteredUsers = styled.div`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 20px 0;
  text-align: center;

  & > a,
  & > a:active,
  & > a:hover,
  & > a:visited {
    color: #3897f0;
    font-weight: bold;
    padding: 0 7px;
  }
`;

const GetApp = styled.div`
  margin: 20px 0 0;
  p {
    color: #262626;
    font-size: 14px;
    line-height: 18px;
    margin: 15px 20px;
    text-align: center;
  }
`;
const Apps = styled.div`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  display: flex;
  a {
    padding: 0 5px;
    display: inline-block;
  }
  img {
    height: 40px;
  }
`;
const ForgotPassword = styled.div`
  color: #385185;
  text-align: center;
  margin: 5px 0;
  a {
    font-size: 12px;
    line-height: 14px;
    margin-top: 12px;
    text-align: center;
    color: #003569;
  }
`;
export default Login;
