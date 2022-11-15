import { combineReducers } from "redux";
import userSlice from "./auth/authSlice";
import dashBoardReducer from "./sale/saleSlice";
import employeeReducer from "./overviewEmployee/employeeSlice";
import jobsReducer from "./overviewJobs/jobsSlice";
const combineReducer = combineReducers({
    auth: userSlice,
    sale: dashBoardReducer,
    employee: employeeReducer,
    jobs: jobsReducer,
});

export default combineReducer;
