import axios from "axios";
import jwt_decode from "jwt-decode";
import {storage} from "./sesionStorage"
import {NAME_SESSION_STORAGE_TOKEN, ID_SESSION} from "../constants"

export const createAxios = (token) =>{
  const URL = process.env.REACT_APP_API || process.env.REACT_APP_DEV_API
  const refreshToken = async (id)=>{
    try{
      const res = await axios.get(`${URL}/users/infor/${id}`,{headers:{ 'Authorization': `1TouchAuthorization ${token}`}});
      return res.data;
    }catch(err){
      return err
    }
  }

    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async(config) => {
            const decodedToken = jwt_decode(token)
            let default_token = token;
            const refreshtoken = await refreshToken(decodedToken.id_system)
            if(refreshtoken?.data?.access_token?.access_token){
              default_token = refreshtoken?.data?.access_token?.access_token
              storage.save(NAME_SESSION_STORAGE_TOKEN,default_token)
              storage.save(ID_SESSION,decodedToken.id_system)
            }else if (refreshtoken?.access_token){
              default_token = refreshtoken?.access_token
              storage.save(NAME_SESSION_STORAGE_TOKEN,default_token)
            }
            else{
              storage.delete(NAME_SESSION_STORAGE_TOKEN)
              setTimeout(() =>{
                window.location.href("/login")
              },300)
            }

            config.headers["Authorization"] = "1TouchAuthorization " + default_token
          return config;
        },
        (err)=>{
          return Promise.reject(err);
        }
    )
    return newInstance
}
