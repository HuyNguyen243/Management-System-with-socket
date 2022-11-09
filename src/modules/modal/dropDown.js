import { CustomerRules } from "../../constants";

export const type_files = [
    { name: 'JPG', code: 'JPG' },
    { name: 'SVG', code: 'SVG' },
    { name: 'PSD', code: 'PSD' },
];

export const type_status= [
    { name: 'Đang yêu cầu', code: 'DONE' },
    { name: 'Tạm hoãn yêu cầu', code: 'PENDING' },
    { name: 'Ngưng yêu cầu', code: 'STOP' },
]

export const type_jobs = [
    { name: 'Tính phí', code: 'CHARGE' },
    { name: 'Không tính phí', code: 'NO CHARGE' },
    { name: 'Chỉnh sửa', code: 'EDIT' },
]

export const names =[
    {"name": "Afghanistan", "code": "AF"},
    {"name": "Åland Islands", "code": "AX"},
    {"name": "Albania", "code": "AL"},
    {"name": "Algeria", "code": "DZ"},
]

export const customer_status= [
    { name: 'Đang yêu cầu', code: CustomerRules.STATUS.REQUEST },
    { name: 'Tạm hoãn yêu cầu', code: CustomerRules.STATUS.PENDING },
    { name: 'Ngưng yêu cầu', code: CustomerRules.STATUS.UNREQUEST },
]

export const role= [
    { name: 'Admin', code: 'ADMIN' },
    { name: 'Leader Editor', code: 'LEADER_EDITOR' },
    { name: 'Editor', code: 'EDITOR' },
    { name: 'Saler', code: 'SALER' },
]