import { NAME_SESSION_STORAGE_TOKEN } from "../constants";
import jwt_decode from "jwt-decode";

export const setCookie = (token)=>{
    let expires = "";
    const decodedToken = jwt_decode(token)
    const date = new Date()
    date.setTime(date.getTime() + (decodedToken.exp));
    expires = "; expires=" + date.toUTCString();
    // const demo  = date.getTime()/1000 - decodedToken.exp

    // console.log(new Date(date.getTime(demo)).)
    // document.cookie = NAME_SESSION_STORAGE_TOKEN + "=" + (token || "") + expires + "; path=/";
}