export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const PHONE_REGEX =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

export const JOB_DONE = "Đã hoàn thành"
export const JOB_PENDING = "Tạm hoãn"
export const JOB_CANCEL = "Ngưng"

export const CUSTOMER_REQUEST_DONE = "Đang yêu cầu"
export const CUSTOMER_REQUEST_PENDING = "Tạm hoãn yêu cầu"
export const CUSTOMER_REQUEST_CANCEL = "Ngưng yêu cầu"

export const PAY_DONE = "Đã thanh toán"
export const PAY_PENDING = "Chưa thanh toán"

export const USER_IS_ONLINE = "Đang hoạt động"
export const USER_IS_STOPPING = "Tạm ngưng hoạt động"
export const USER_IS_OFFLINE = "Không hoạt động"

export const NAME_SESSION_STORAGE_TOKEN = "1touch_access_token"
export const ID_SESSION = "1touch_id"

export const UserRules = {
    ROLE: {
        SALE: 'SALE',
        ADMIN: 'ADMIN',
        EDITOR: 'EDITOR',
        CUSTOMER: 'CUSTOMER',
        LEADER_EDITOR: 'LEADER_EDITOR',
        JOB: 'JOB',
        PAY: 'PAY',
    },
    ROLE_NAME: {
        SALER: "SALER",
        ADMIN: "ADMIN",
        EDITOR: "EDITOR",
        LEADER_EDITOR: "LEADER EDITOR",
    },
    _ROLE: {
        SALE: 'S',
        ADMIN: 'A',
        EDITOR: 'E',
        CUSTOMER: 'C',
        LEADER_EDITOR: 'LE',
        JOB: 'J',
        PAY: 'P',
    },
    STATUS: {
        ONLINE: 'ONLINE',
        OFFLINE: 'OFFLINE',
        LEAVE: 'LEAVING',
    }
}

export const PayRules = {
    STATUS: {
        PAID: 'PAID',
        UNPAID: 'UNPAY',
        CANCEL: 'CANCEL',
    }
}

export const JobRules = {
    ROLE: {
        SALE: "SALE",
        ADMIN: "ADMIN",
        EDITOR: "EDITOR",
        LEADER_EDITOR: "LEADER_EDITOR",
    },
    STATUS_JOBS: {
        COMPLETE: "COMPLETE",
        INCOMPLETE: "INCOMPLETE",
        PENDING: "PENDING",
    },
    STATUS_EDITOR: {
        COMPLETE: "COMPLETE",
        INCOMPLETE: "INCOMPLETE",
        PENDING: "PENDING",
        FIXED: "FIXED",
    },
    JOBS_TYPES: {
        FEE: "FEE",
        FREE: "FREE",
    },
    PHOTO_TYPES: {
        PNG: "PNG",
        JPEG: "JPEG",
        TIFF: "TIFF",
        PSD: "PSD",
        RAW: "RAW",
    },
    STATUS_CUSTOMER: {
        COMPLETE: "COMPLETE",
        INCOMPLETE: "INCOMPLETE",
        PENDING: "PENDING",
    },
};

export const CustomerRules = {
    STATUS: {
        REQUEST: "REQUEST",
        PENDING: "PENDING",
        UNREQUEST: "UNREQUEST",
    },
    STATUS_PAY: {
        PAID: "PAID",
        UNPAID: "UNPAY",
        CANCEL: "CANCEL",
    },
};