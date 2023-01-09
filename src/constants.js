export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"];

export const JOB_DONE = "Đã hoàn thành";
export const JOB_INCOMPLETE = "Chưa hoàn thành";
export const JOB_PENDING = "Đang xử lý";

export const CUSTOMER_REQUEST_REQUEST = "Đang yêu cầu";
export const CUSTOMER_REQUEST_PENDING = "Đang xử lý yêu cầu";
export const CUSTOMER_REQUEST_CANCEL = "Ngưng yêu cầu";
export const CUSTOMER_REQUEST_DONE = "Đã hoàn thành"

export const PAY_DONE = "Đã thanh toán";
export const PAY_PENDING = "Chưa thanh toán";

export const USER_IS_ONLINE = "Đang hoạt động";
export const USER_IS_STOPPING = "Tạm ngưng hoạt động";
export const USER_IS_OFFLINE = "Không hoạt động";

export const NAME_SESSION_STORAGE_TOKEN = "1touch_access_token";
export const ROOM_SESSION_MESSAGES = "room_1touch";
export const ID_SESSION = "1touch_id";

export const NOT_SET_ADMIN = "NOT_SET_BY_ADMIN";

export const UserRules = {
    ROLE: {
        SALER: "SALER",
        ADMIN: "ADMIN",
        EDITOR: "EDITOR",
        CUSTOMER: "CUSTOMER",
        LEADER_EDITOR: "LEADER_EDITOR",
        JOB: "JOB",
        PAY: "PAY",
        NOT_SET_BY_ADMIN: "NOT_SET_BY_ADMIN",
    },
    ROLE_NAME: {
        SALER: "SALER",
        ADMIN: "ADMIN",
        EDITOR: "EDITOR",
        LEADER_EDITOR: "LEADER EDITOR",
    },
    _ROLE: {
        SALER: "S",
        ADMIN: "A",
        EDITOR: "E",
        CUSTOMER: "C",
        LEADER_EDITOR: "LE",
        JOB: "J",
        PAY: "P",
    },
    STATUS: {
        ONLINE: "ONLINE",
        OFFLINE: "OFFLINE",
        LEAVE: "LEAVING",
    },
    _STATUS: {
        ONLINE: USER_IS_ONLINE,
        OFFLINE: USER_IS_OFFLINE,
        LEAVE: USER_IS_STOPPING,
    },
};

export const PayRules = {
    STATUS: {
        PAID: "PAID",
        UNPAID: "UNPAY",
        CANCEL: "CANCEL",
    },
};

export const JobRules = {
    ROLE: {
        SALER: "SALER",
        ADMIN: "ADMIN",
        EDITOR: "EDITOR",
        LEADER_EDITOR: "LEADER_EDITOR",
    },
    STATUS_JOBS: {
        COMPLETE: "COMPLETE",
        INCOMPLETE: "INCOMPLETE",
        PENDING: "PENDING",
    },
    STATUS_JOBS_NAME: {
        COMPLETE: JOB_DONE,
        INCOMPLETE: JOB_INCOMPLETE,
        PENDING: JOB_PENDING,
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
        EDIT: "EDIT",
    },
    JOBS_TYPES_NAME: {
        FEE: "Tính phí",
        FREE: "Không tính phí",
        EDIT: "Chỉnh sửa",
    },
    PHOTO_TYPES: {
        PNG: "PNG",
        JPEG: "JPEG",
        TIFF: "TIFF",
        PSD: "PSD",
        RAW: "RAW",
    },
    STATUS_CUSTOMER: {
        REQUEST: "REQUEST",
        DONE: "DONE",
        PENDING: "PENDING",
    },
    STATUS_CUSTOMER_NAME: {
        REQUEST: CUSTOMER_REQUEST_REQUEST,
        UNREQUEST: CUSTOMER_REQUEST_CANCEL,
        PENDING: CUSTOMER_REQUEST_PENDING,
        DONE: CUSTOMER_REQUEST_DONE
    },
};

export const CustomerRules = {
    STATUS: {
        REQUEST: "REQUEST",
        PENDING: "PENDING",
        UNREQUEST: "UNREQUEST",
        DONE: "DONE",
    },
    STATUS_PAY: {
        PAID: "PAID",
        UNPAID: "UNPAY",
        CANCEL: "CANCEL",
    },
};

export const NAME_ROOM = {
    USER: "USER",
    GROUP: "GROUP",
    EDIT: "EDIT",
    CREATE: "CREATE",
};

export const NAME_NOTIFICATION = {
    MESSAGE: "Tin nhắn",
    NOTIFICATION: "Thông báo",
}

export const NotificationRules = {
    STATUS: {
        ADD_JOB: "ADD_JOB",
        CREATE_JOB: "CREATE_JOB",
        COMPLETE_JOB: "COMPLETE_JOB",
        DELETE_JOB: "DELETE_JOB",
        EDIT_JOB: "EDIT_JOB",
        FIXED: "FIXED",
        PAYMENT_JOB_PAID: "PAYMENT_JOB_PAID",
        PAYMENT_JOB_UNPAY: "PAYMENT_JOB_UNPAY",
    },
};

export const NOTIFICATION_TITLE = {
    ADD_JOB: "Một công việc đã được thêm bởi",
    CREATE_JOB: "Một công việc đã được tạo bởi",
    COMPLETE_JOB: "Một công việc đã được đánh dấu hoàn thành bởi",
    DELETE_JOB: "Một công việc đã được xóa bởi",
    EDIT_JOB: "Một công việc đã được chỉnh sửa bởi",
    FIXED: "Một công việc đã hoàn lại bởi ",
}

export const CONFIG_COST = {
    EXCHANGE_RATE: 22000,
};