import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import styled from "@emotion/styled";
import Form from "./form";
import { register } from "../services/userService";

class Registration extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", fullname: "", username: "", password: "" },
      errors: {},
      focus: { email: "", username: "", fullname: "", password: "" }
    };
  }

  schema = {
    email: Joi.string()
      .trim()
      .min(6)
      .email()
      .required()
      .label("Email"),
    fullname: Joi.string()
      .trim()
      .min(6)
      .max(30)
      .required()
      .label("Full Name"),
    username: Joi.string()
      .trim()
      .min(6)
      .max(100)
      .required()
      .label("Username"),
    password: Joi.string()
      .trim()
      .min(6)
      .max(100)
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await register(this.state.data);
      window.location = "/profile";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Article>
        <Media>
          <img
            src={
              "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg"
            }
            alt=""
          />
        </Media>
        <RegistrationWrapper>
          <RegistrationModule>
            <Logo>Instagram</Logo>
            <RegisterMsg>
              Sign up to see photos and videos from your friends.
            </RegisterMsg>
            <RegisterWithFB>
              <LogInFacebookButton>
                <span />
                Log in with Facebook
              </LogInFacebookButton>
            </RegisterWithFB>
            <Divider>
              <span>or</span>
            </Divider>
            <SignupForm onSubmit={this.handleSubmit}>
              {this.renderInputField("email", "Email")}
              {this.renderInputField("fullname", "Full Name")}
              {this.renderInputField("username", "Username")}
              {this.renderInputField("password", "Password", "password")}
              {this.renderActionButton("Sign Up")}
              {this.renderErrorMessage()}
            </SignupForm>

            <Disclaimer>
              By signing up, you agree to our
              <a
                href={"https://help.instagram.com/581066165581870"}
                target={"_blank"}
              >
                Terms
              </a>
              ,
              <a
                href={"https://help.instagram.com/519522125107875"}
                target={"_blank"}
              >
                Data Policy
              </a>
              and
              <a
                href={"https://instagram.com//legal/cookies/"}
                target={"_blank"}
              >
                Cookies Policy
              </a>
              .
            </Disclaimer>
          </RegistrationModule>
          <RegisteredUsers>
            Have an account?
            <Link to="/login">Log in</Link>
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

const Media = styled.div`
  align-self: center;
  background-image: url(https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png);
  background-position: 0 0;
  background-size: 454px 618px;
  background-repeat: no-repeat;
  flex-basis: 454px;
  height: 618px;
  position: relative;
  & > img {
    position: absolute;
    top: 100px;
    left: 151px;
  }

  @media (max-width: 800px) {
    display: none;
  }
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

const RegisterMsg = styled.h2`
  color: #999;
  text-align: center;
  font-weight: 600;
  line-height: 20px;
  font-size: 17px;
  margin: 0 40px 10px;
`;

const RegisterWithFB = styled.div`
  text-align: center;
  margin: 0 40px 6px;
`;
const LogInFacebookButton = styled.button`
  span {
    position: relative;
    display: inline-block;
    height: 16px;
    width: 16px;
    background-image: url(https://www.instagram.com/static/bundles/es6/sprite_core_b20f2a3cd7e4.png/b20f2a3cd7e4.png);
    background-repeat: no-repeat;
    background-position: -264px -319px;
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

const SignupForm = styled.form`
  margin: 0 40px 6px;
`;

const Disclaimer = styled.form`
  color: #999;
  margin: 20px 60px;
  text-align: center;

  & > a,
  & > a:active,
  & > a:hover,
  & > a:visited {
    color: #999;
    font-weight: bold;
    padding: 0 4px;
  }
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

export default Registration;
