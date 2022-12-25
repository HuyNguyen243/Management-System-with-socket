import axios from "axios";
import jwt_decode from "jwt-decode";
import {storage} from "./sesionStorage"
import {NAME_SESSION_STORAGE_TOKEN} from "../constants"
import { Cookie } from "../commons/cookie"

const URL = process.env.REACT_APP_API || process.env.REACT_APP_DEV_API

export const createAxios = () =>{
  const token = storage.get(NAME_SESSION_STORAGE_TOKEN)

  const logout = ()=>{
    storage.delete(NAME_SESSION_STORAGE_TOKEN)
    setTimeout(() =>{
      window.location.href = "/login"
    },700)
  } 
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async(config) => {
            const decodedToken = jwt_decode(token.trim())
            const refreshToken = async (formData)=>{
              try{
                const res = await axios.post(`${URL}/auth/token`,formData,{headers:{ 'Authorization': `1TouchAuthorization ${token}`}});
                return res.data;
              }catch(err){
                return err
              }
            }
            let date = new Date()
            let default_token = token;
            if(decodedToken.exp * 1000 <= date.getTime()){
              const formData = {
                _id_activity : decodedToken._id
              }
              const refreshtoken = await refreshToken(formData)
              if(refreshtoken?.data?.access_token){
                default_token = refreshtoken?.data?.access_token
                storage.save(NAME_SESSION_STORAGE_TOKEN,default_token)
                Cookie.set(default_token)
              }
              else{
                logout()
                Cookie.delete()
              }
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
