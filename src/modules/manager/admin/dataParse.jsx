export const dataParse = (data)=>{
    if(Array.isArray(data)){
        const result = data.map((item)=>{
            const newobject = {
                infor_reminder: item?.infor_reminder,
                fullname: item?.fullname,
                role: item?.role,
                start_day: item?.start_day,
                status: item?.status,
                address: item?.address,
                births: item?.births,
                phone: item?.phone,
                email: item?.email,
                id_system: item?.id_system,
                kpi_saler: item?.kpi_saler,
            }
            return newobject
        })
        return result
    }
 }

