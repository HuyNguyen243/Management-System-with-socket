export const dataParseCustomer = (data) => {
    if (Array.isArray(data)) {
        const result = data.map((item) => {
            const newobject = {
                name: item?.fullname,
                id_system: item?.id_system,
                create_by: item?.create_by,
                email: item?.information?.email,
                phone: item?.information?.phone,
                status: item?.status
            }
            return newobject
        })
        return result
    }
}

export const dataParse = (data) => {
    if (Array.isArray(data)) {
        const result = data.map((item) => {
            const newobject = {
                id_system: item?.infor_id?.id_system,
                id_customer: item?.infor_id?.id_customer,
                id_saler: item?.infor_id?.id_saler,
                id_editor: item?.infor_id?.id_editor,
                total_cost: item?.cost?.total_cost,
                start_day: item?.infor?.start_day,
                end_day: item?.infor?.end_day,
                quality: item?.infor?.quality,
                status_jobs: item?.infor?.status_jobs,
            }
            return newobject
        })
        return result
    }
}

