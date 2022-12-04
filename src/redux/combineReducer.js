import { combineReducers } from "redux";
import userSlice from "./auth/authSlice";
import saleSlice from "./sale/saleSlice";
import employeeSlice from "./overviewEmployee/employeeSlice";
import jobsSlice from "./overviewJobs/jobsSlice";
import messageSlice from "./messages/messageSlice"
import modalSlice from "./modal/modalSlice";
import settingSlice from "./admin/adminSlice";
import notificationSlice from "./notification/notificationSlice";
import paymentSlice from "./payment/paySlice";
const combineReducer = combineReducers({
    auth: userSlice,
    sale: saleSlice,
    employee: employeeSlice,
    jobs: jobsSlice,
    message: messageSlice,
    modal: modalSlice,
    setting: settingSlice,
    notification: notificationSlice,
    payment: paymentSlice
});

export default combineReducer;
