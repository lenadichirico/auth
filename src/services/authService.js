import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = "token";

export async function login(user) {
  //since there is no real API connected can't login an user
  //can't get a JWT generated on a server
  //and will get 404 unexcpected error
  try {
    const { data: jwt } = await axios.post(apiEndpoint, {
      username: user.username,
      password: user.password
    });
    localStorage.setItem("token", jwt);
  } catch (error) {
    const expectedError =
      error.status && error.status >= 400 && error.status <= 500;
    if (!expectedError) {
      alert("An unexpected error occurred.");
    }
  }
}
export function logout(user) {
  localStorage.removeItem("token");
}

export function getUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function setJwt(jwt) {
  //axios.defaults.headers.common["x-auth-token"] = jwt;
  localStorage.setItem(tokenKey, jwt);
}

export default {
  login,
  logout,
  getUser,
  loginWithJwt,
  getJwt,
  setJwt
};
