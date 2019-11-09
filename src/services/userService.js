import axios from "axios";
import jwt from "jwt-simple";
import { apiUrl, jwtSecretKey } from "../config.json";
import authService from "./authService.js";

const apiEndpoint = `${apiUrl}/users`;

export async function register(user) {
  try {
    const response = await axios.post(apiEndpoint, user);
    //generate manually JWT since can't get it from server response
    if (response) {
      const secret = Buffer.from(jwtSecretKey, "hex");
      const token = jwt.encode(user, secret);
      authService.setJwt(token);
    }
  } catch (error) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500;
    if (!expectedError) {
      alert("An unexpected error occurred.");
    }
  }
}
