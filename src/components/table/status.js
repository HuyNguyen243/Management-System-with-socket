import { CustomerRules } from "../../constants"

export const customer_status = [
    {
        status: "None",
        image: "",
        id: ""
    },
    {
        status: "Đã hoàn thành",
        image: "icon_success",
        id: CustomerRules.STATUS.REQUEST
    },
    {
        status: "Tạm hoãn công việc",
        image: "icon_pending",
        id: CustomerRules.STATUS.PENDING
    },
    {
        status: "Ngừng công việc",
        image: "icon_close",
        id: CustomerRules.STATUS.UNREQUEST
    }
]