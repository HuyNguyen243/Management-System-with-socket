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
                date: item?.date,
                reminder_staff: item?.reminder_staff,
                pay_role : item?.pay_role,
                pay_employees: item?.pay_employees,
                status: item?.status,
                staff_is_pay:  item?.staff_is_pay,
                list_id: item?.list_id
            }
            return newobject
        })
        return result
    }
}

