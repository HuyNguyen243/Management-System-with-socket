export const storage = {
    save: (name,data)=>{
        return sessionStorage.setItem(name,JSON.stringify(data))
    },

    get: (name)=>{
        const result = JSON.parse(sessionStorage.getItem(name))
        return result
    },

    delete: (name)=>{
        return sessionStorage.removeItem(name)
    }
}