import axios from "axios";

export default axios.create({
  // for prod
  baseURL: "https://events-api-oncel.herokuapp.com/api/v1",

  // for development
  // baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});
