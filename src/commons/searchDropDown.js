export const searchDropdown =(e,data,setFilter)=>{
    const type = Object.prototype.toString.call(data) === "[object Object]"
    let result;
        if(e.query.trim().length === 0){
            result = [...data]
        }else{
            if(type){
                const newData = Object.keys(data)
                if(newData?.length > 0){
                    result = newData.filter((item)=>{
                        return item.toLowerCase().startsWith(e.query.trim().toLowerCase());
                    })
                }
            }else{
                if(data?.length > 0)
                result = data.filter((item)=>{
                    return item.toLowerCase().startsWith(e.query.trim().toLowerCase());
                })
            }
        }
        setFilter(result)
}