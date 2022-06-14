import { combineReducers } from "redux";
import projectReducer from "./Projects/reducers";
import userReducer from "./User/reducers";

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectReducer
})

export default rootReducer;