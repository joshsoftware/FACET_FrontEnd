import projectConstants from "./constants";

const MEMBERS_INITIAL_STATE = {
    project: '',
    members: [],
    project_admin: null,
    isLoading: true
}

const PROJECTS_INITIAL_STATE = {
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
                project_admin: action.payload.project_admin,
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