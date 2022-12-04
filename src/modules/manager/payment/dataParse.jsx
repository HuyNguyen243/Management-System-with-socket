export const dataParse = (data) => {
    if (Array.isArray(data)) {
        const result = data.map((item) => {
            const newobject = {
                id_system: item?.id_system,
                id_job: item?.id_job,
                pay_employees: item?.pay_employees,
                _create_at: item?._create_at,
                status_pay: item?.status
            }
            return newobject
        })
        return result
    }
}

export const dataParseManagement = (data) => {
    if (Array.isArray(data)) {
        const result = data.map((item) => {
            const newobject = {
                id_job: item?.id_job,
                staff_is_pay:  item?.staff_is_pay,
                pay_role : item?.pay_role,
                pay_employees: item?.pay_employees,
                status_pay: item?.status
            }
            return newobject
        })
        return result
    }
}

