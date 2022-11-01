import axios from "axios";
// import jwt_decode from "jwt-decode";

export const createAxios = (token) =>{
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async(config) => {
            config.headers["Authorization"] = "1TouchAuthorization " + token
          return config;
        },
        (err)=>{
          return Promise.reject(err);
        }
    )
    return newInstance
}
