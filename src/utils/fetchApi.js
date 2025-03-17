import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1",
  //  withCredentials: true
});

// instance.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     async (err) => {
//       const originalConfig = err.config;
//       if (originalConfig.url !== "/login" && err.response) {

//         // Access Token was expired
//         if (err.response.status === 500 &&err.response.data.message.includes("expired") && !originalConfig._retry) {
//           originalConfig._retry = true;
//           try {
//             let refreshtoken = localStorage.getItem("refreshtoken")
//             localStorage.setItem("token",refreshtoken)
//             return instance(originalConfig);
//           } catch (_error) {
//             return Promise.reject(_error);
//           }
//         }
//       }
//       return Promise.reject(err);
//     }
//   );

instance.interceptors.response.use((response) => {
  // Thrown error for request with OK status code
  const { data } = response;
  return response.data;
});

export default instance;
