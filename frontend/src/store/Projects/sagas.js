import { call, put, takeLatest } from "redux-saga/effects";
import { 
    addMembersInProjectApi, 
    addNewProjectApi, 
    deleteProjectApi, 
    getOneProjectApi, 
    getProjectMembersApi, 
    getProjectsApi,
    removeMembersInProjectApi,
    updateProjectNameApi
} from "./apis";
import projectConstants from "./constants";
import { toast } from 'react-toastify';
import { 
    deleteProjectFailure,
    deleteProjectSuccess,
    getOneProjectSuccess, 
    getProjectMembersSuccess, 
    setProjects, 
    updateProjectNameFailure, 
    updateProjectNameSuccess 
} from "./actions";


export function* fetchProjects() {
    try {
        const response = yield call(getProjectsApi);
        yield put(setProjects(response.projects));
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* addNewProject({ payload }) {
    try {
        const response = yield call(addNewProjectApi, payload)
        yield call(fetchProjects);
        toast.success(response.success);
    } catch (error) {
        toast.error("Something Wnt Wrong!")
    }
}

export function* getProjectMembers({ payload }) {
    try {
        const response = yield call(getProjectMembersApi, payload);
        yield put(getProjectMembersSuccess(response));
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* addMembersInProject({ payload }) {
    try {
        yield call(addMembersInProjectApi, payload);
        yield call(getProjectMembers, { payload: {project: payload.project} })
        toast.success("Members Added Successfully!")
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* removeMembersInProject({ payload }) {
    try {
        yield call(removeMembersInProjectApi, payload);
        yield call(getProjectMembers, { payload: { project: payload.project } })
        toast.success("Members Removed Successfully!")
    } catch (error) {
        toast.error(error.data.error)
    }
}

export function* getOneProject({ payload }) {
    try {
        const response = yield call(getOneProjectApi, payload);
        yield put(getOneProjectSuccess(response));
    } catch (error) {
        toast.error(error.data.error);
    }
}

export function* updateProjectName({ payload }) {
    try {
        const response = yield call(updateProjectNameApi, payload);
        yield put(updateProjectNameSuccess());
        toast.success(response.message);
    } catch (error) {
        yield put(updateProjectNameFailure(error.data))
        toast.error(error.data.error);
    }
}

export function* deleteProject({ payload }) {
    try {
        const response = yield call(deleteProjectApi, payload);
        yield put(deleteProjectSuccess());
        toast.success(response.message);
    } catch (error) {
        yield put(deleteProjectFailure(error.data))
        toast.error(error.data.error)
    }
}

export default function* projectSagas() {
    yield takeLatest(projectConstants.FETCH_PROJECTS, fetchProjects);
    yield takeLatest(projectConstants.ADD_NEW_PROJECT, addNewProject);
    yield takeLatest(projectConstants.GET_PROJECT_MEMBERS_REQUEST, getProjectMembers);
    yield takeLatest(projectConstants.ADD_MEMBERS_IN_PROJECT_REQUEST, addMembersInProject);
    yield takeLatest(projectConstants.REMOVE_MEMBERS_IN_PROJECT_REQUEST, removeMembersInProject);
    yield takeLatest(projectConstants.GET_ONE_PROJECT_REQUEST, getOneProject);
    yield takeLatest(projectConstants.UPDATE_PROJECT_NAME_REQUEST, updateProjectName);
    yield takeLatest(projectConstants.DELETE_PROJECT_REQUEST, deleteProject);
}