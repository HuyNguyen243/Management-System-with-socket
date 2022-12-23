import { CustomerRules } from "../../constants";

export const type_files = [
    { name: 'PNG', code: 'PNG' },
    { name: 'JPEG', code: 'JPEG' },
    { name: 'TIFF', code: 'TIFF' },
    { name: 'PSD', code: 'PSD' },
    { name: 'RAW', code: 'RAW' },
];

export const type_status= [
    { name: 'Đang yêu cầu', code: 'DONE' },
    { name: 'Tạm hoãn yêu cầu', code: 'PENDING' },
    { name: 'Ngưng yêu cầu', code: 'STOP' },
]

export const type_status_jobs= [
    { name: 'Đã hoàn thành', code: 'COMPLETE' },
    { name: 'Đang xử lý', code: 'PENDING' },
    { name: 'Chưa hoàn thành', code: 'INCOMPLETE' },
]


export const names =[
    {"name": "Afghanistan", "code": "AF"},
    {"name": "Åland Islands", "code": "AX"},
    {"name": "Albania", "code": "AL"},
    {"name": "Algeria", "code": "DZ"},
]

export const customer_status= [
    { name: 'Đã hoàn thành', code: CustomerRules.STATUS.DONE },
    { name: 'Đang yêu cầu', code: CustomerRules.STATUS.REQUEST },
    { name: 'Đang xử lý yêu cầu', code: CustomerRules.STATUS.PENDING },
    { name: 'Ngưng yêu cầu', code: CustomerRules.STATUS.UNREQUEST },
]

export const role= [
    // { name: 'Admin', code: 'ADMIN' },
    { name: 'Leader Editor', code: 'LEADER_EDITOR' },
    { name: 'Editor', code: 'EDITOR' },
    { name: 'Saler', code: 'SALER' },
]


export const roleGroup= [
    { name: 'Leader Editor', code: 'LEADER_EDITOR' },
    { name: 'Editor', code: 'EDITOR' },
    { name: 'Saler', code: 'SALER' },
]