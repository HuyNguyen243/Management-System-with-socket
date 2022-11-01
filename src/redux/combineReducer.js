import { combineReducers } from "redux";
import userSlice from "./auth/authSlice"
import dashBoardReducer from "./dashboard/dashboardSlice"

const combineReducer = combineReducers({
    auth : userSlice,
    dashboard:dashBoardReducer
})

export default combineReducer