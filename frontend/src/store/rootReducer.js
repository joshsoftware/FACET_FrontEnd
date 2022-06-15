import { combineReducers } from "redux";
import endpointReducer from "./Endpoints/reducers";
import environmentReducer from "./Environments/reducers";
import projectReducer from "./Projects/reducers";
import userReducer from "./User/reducers";

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectReducer,
    environments: environmentReducer,
    endpoints: endpointReducer
})

export default rootReducer;