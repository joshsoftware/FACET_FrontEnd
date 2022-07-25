import projectConstants from "./constants";

const INITIAL_STATE = {
    projects: [],
    isLoading: true
}


const projectReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case projectConstants.SET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                isLoading: false
            }
    
        default:
            return state;
    }
}


export default projectReducer;