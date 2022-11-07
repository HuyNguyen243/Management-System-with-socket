export const dataParse = (data)=>{
    if(Array.isArray(data)){
        const result = data.map((item)=>{
            const newobject = {
                id_system: item?.id_system,
                fullname: item?.fullname,
                create_by: item?.create_by,
                _create_at: item?._create_at,
                status: item?.status,
                information: item?.information,
                list_jobs: item?.list_jobs,
                _id: item?._id,
                _modified_at: item?._modified_at
            }
            return newobject
        })
        return result
    }
 }

