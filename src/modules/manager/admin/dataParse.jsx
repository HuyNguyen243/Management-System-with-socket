export const dataParse = (data)=>{
    if(Array.isArray(data)){
        const result = data.map((item)=>{
            const newobject = {
                id_system: item?.id_system,
                fullname: item?.fullname,
                role: item?.role,
                start_day: item?.start_day,
                status: item?.status,
                address: item?.address,
            }
            return newobject
        })
        return result
    }
 }

