export const dataParse = (data)=>{
    if(Array.isArray(data)){
        const result = data.map((item)=>{
            const newobject = {
                infor_reminder: item?.infor_reminder,
                fullname: item?.fullname,
                _create_at: item?._create_at,
                status: item?.status,
                information: item?.information,
                list_jobs: item?.list_jobs || {},
                id_system: item?.id_system,
                create_by: item?.create_by,
            }
            return newobject
        })
        return result
    }
 }

