import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    let localStorageToken = window.localStorage.getItem("persist:data/user");
    if (localStorageToken && typeof localStorageToken === "string") {
      localStorageToken = JSON.parse(localStorageToken);
      const accessToken = JSON.parse(localStorageToken?.token);
      config.headers = { authorization: `Bearer ${accessToken}` };
      return config;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);

export default instance;
