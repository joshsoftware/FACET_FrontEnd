import projectConstants from "./constants";

const MEMBERS_INITIAL_STATE = {
    project: '',
    members: [],
    project_admin: null,
    isLoading: true
}

const PROJECTS_INITIAL_STATE = {
    projects: [],
    isLoading: true,
    isSuccess: false,
    oneProject: {}
}


const projectReducer = (state=PROJECTS_INITIAL_STATE, action) => {
    switch (action.type) {
        case projectConstants.SET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                isLoading: false
            }
        
        case projectConstants.GET_ONE_PROJECT_REQUEST:
            return { ...state, isLoading: true, oneProject: {} }
        
        case projectConstants.GET_ONE_PROJECT_SUCCESS:
            return { ...state, isLoading: false, oneProject: action.payload }

        case projectConstants.GET_ONE_PROJECT_FAILURE:
            return { ...state, isLoading: false, errors: action.payload }
        
        case projectConstants.UPDATE_PROJECT_NAME_REQUEST:
            return { ...state, isLoading: true, isSuccess: false }

        case projectConstants.UPDATE_PROJECT_NAME_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true }
        
        case projectConstants.UPDATE_PROJECT_NAME_FAILURE:
            return { ...state, isLoading: false, isSuccess: false, errors: action.payload }
            
        case projectConstants.DELETE_PROJECT_REQUEST:
            return { ...state, isLoading: true, isSuccess: false }

        case projectConstants.DELETE_PROJECT_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true }
        
        case projectConstants.DELETE_PROJECT_FAILURE:
            return { ...state, isLoading: false, isSuccess: false, errors: action.payload }
            
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