export const dataParse = (data) => {
    if (Array.isArray(data)) {
        const result = data.map((item) => {
            const newobject = {
                id_job: item?.id_job,
                pay_employees: item?.pay_employees,
                _create_at: item?._create_at,
                status_pay: item?.status,
                id_system: item?.id_system,
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
                month: item?._id?.month,
                reminder_staff: item?.reminder_staff,
                pay_role : item?._id?.pay_role,
                pay_employees: item?.pay_employees,
                status_pay: item?.status,
                id_system: item?.id_system,
                _create_at: item?._create_at,
                staff_is_pay:  item?.staff_is_pay,
                id_job: item?.id_job,
            }
            return newobject
        })
        return result
    }
}

