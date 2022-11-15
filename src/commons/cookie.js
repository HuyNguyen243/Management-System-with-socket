import { NAME_SESSION_STORAGE_TOKEN } from "../constants";

export const Cookie = {
    set: (token)=>{
        document.cookie = NAME_SESSION_STORAGE_TOKEN + "=" + (token || "") + "; path=/";
        document.cookie = "checked=" + true + "; path=/";
    },
    get: ()=>{
        
        const cookie_token = document.cookie.split(';');
        for (let i = 0; i < cookie_token.length; i++) {
            let c = cookie_token[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(NAME_SESSION_STORAGE_TOKEN) === 0){
                const str = c.substring(NAME_SESSION_STORAGE_TOKEN.length, c.length)?.replace(`=`, " ");
                return str.trim();
            }
          }
        return null;
    },
    delete:()=>{
        document.cookie = NAME_SESSION_STORAGE_TOKEN +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    getChecked : ()=>{
        const checked = document.cookie.split(';');
        for (let i = 0; i < checked.length; i++) {
            let c = checked[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf("checked") === 0){
                const str = c.substring("checked".length, c.length)?.replace(`=`, " ");
                return JSON.parse(str.trim());
            }
          }
        return null;
    },
    deleteChecked : ()=>{
        document.cookie = 'checked=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}