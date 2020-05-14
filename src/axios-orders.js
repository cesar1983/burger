import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-1ca6c.firebaseio.com/",
});

export default instance;
