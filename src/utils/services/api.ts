
import axios from "axios";

const API_REQUEST = axios.create({
  baseURL: "https://randomuser.me/api/",
});

export default API_REQUEST;