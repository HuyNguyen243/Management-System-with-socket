import { combineReducers } from "redux";
import userSlice from "./auth/authSlice";
import dashBoardReducer from "./sale/saleSlice";
import dashBoardEmployeeReducer from "./overviewEmployee/employeeSlice";
import tableSlice from "./tableSlice"

const combineReducer = combineReducers({
    auth: userSlice,
    sale: dashBoardReducer,
    employee: dashBoardEmployeeReducer,
    table: tableSlice,
});

export default combineReducer;
