import { call, put, takeLatest } from "redux-saga/effects";
import { 
    addMembersInProjectApi, 
    addNewProjectApi, 
    getOneProjectApi, 
    getProjectMembersApi, 
    getProjectsApi,
    updateProjectNameApi
} from "./apis";
import projectConstants from "./constants";
import { toast } from 'react-toastify';
import { 
    getOneProjectSuccess, 
    getProjectMembersSuccess, 
    setProjects, 
    updateProjectNameSuccess 
} from "./actions";


export function* fetchProjects() {
    try {
        const response = yield call(getProjectsApi);
        yield put(setProjects(response.projects));
    } catch (error) {
        toast.error(error.response.data.msg)
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
        toast.error("Something Wnt Wrong!")
    }
}

export function* addMembersInProject({ payload }) {
    try {
        const response = yield call(addMembersInProjectApi, payload);
        yield call(getProjectMembers, { payload: payload.project })
        toast.success("Members Added Successfully!")
    } catch (error) {
        console.log(error)
        toast.error("Something Wnt Wrong!")
    }
}

export function* getOneProject({ payload }) {
    try {
        const response = yield call(getOneProjectApi, payload.project);
        yield put(getOneProjectSuccess(response));
    } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong!");
    }
}

export function* updateProjectName({ payload }) {
    try {
        const response = yield call(updateProjectNameApi, payload);
        yield put(updateProjectNameSuccess());
        toast.success(response.message);
    } catch (error) {
        toast.error(error.data.error);
    }
}

export default function* projectSagas() {
    yield takeLatest(projectConstants.FETCH_PROJECTS, fetchProjects);
    yield takeLatest(projectConstants.ADD_NEW_PROJECT, addNewProject);
    yield takeLatest(projectConstants.GET_PROJECT_MEMBERS_REQUEST, getProjectMembers);
    yield takeLatest(projectConstants.ADD_MEMBERS_IN_PROJECT_REQUEST, addMembersInProject);
    yield takeLatest(projectConstants.GET_ONE_PROJECT_REQUEST, getOneProject);
    yield takeLatest(projectConstants.UPDATE_PROJECT_NAME_REQUEST, updateProjectName);
}