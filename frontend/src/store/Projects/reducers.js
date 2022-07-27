import projectConstants from "./constants";

const PROJECTS_INITIAL_STATE = {
    project: '',
    members: [],
    isLoading: true
}

const MEMBERS_INITIAL_STATE = {
    projects: [],
    isLoading: true
}


const projectReducer = (state=PROJECTS_INITIAL_STATE, action) => {
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

const projectMemberReducer = (state=MEMBERS_INITIAL_STATE, action) => {
    switch (action.type) {
        case projectConstants.GET_PROJECT_MEMBERS_SUCCESS:
            return {
                ...state,
                members: action.payload.members,
                project: action.payload.project,
                isLoading: false
            }
    
        default:
            return state;
    }
}

export {
    projectReducer,
    projectMemberReducer
};