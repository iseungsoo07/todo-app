import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const retrieveHelloWorldBean = () => {
  return apiClient.get("/hello-world-bean");
};

export const retrieveHelloWorldPathVariable = (username) => {
  return apiClient.get(`hello-world/path-variable/${username}`);
};
