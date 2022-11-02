import { combineReducers } from "redux";
import userSlice from "./auth/authSlice";
import dashBoardReducer from "./dashboard/dashboardSlice";
import dashBoardEmployeeReducer from "./overviewEmployee/employeeSlice";

const combineReducer = combineReducers({
    auth: userSlice,
    dashboard: dashBoardReducer,
    employee: dashBoardEmployeeReducer,
});

export default combineReducer;
