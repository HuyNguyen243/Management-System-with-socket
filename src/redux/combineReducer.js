import { combineReducers } from "redux";
import userSlice from "./auth/authSlice";
import dashBoardReducer from "./sale/saleSlice";
import employeeReducer from "./overviewEmployee/employeeSlice";
import jobsReducer from "./overviewJobs/jobsSlice";
import messagesSlice from "./messages/messageSlice"


const combineReducer = combineReducers({
    auth: userSlice,
    sale: dashBoardReducer,
    employee: employeeReducer,
    jobs: jobsReducer,
    message: messagesSlice,
});

export default combineReducer;
