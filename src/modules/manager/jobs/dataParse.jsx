export const dataParse = (data) => {
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

