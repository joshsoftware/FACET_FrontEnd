import { call, put, takeLatest } from "redux-saga/effects";
import { addNewProjectApi, getProjectMembersApi, getProjectsApi } from "./apis";
import projectConstants from "./constants";
import { toast } from 'react-toastify';
import { getProjectMembersSuccess, setProjects } from "./actions";


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
        toast.success(response.success);
    } catch (error) {
        toast.error("Something Wnt Wrong!")
    }
}

export function* getProjectMembers({ payload }) {
    try {
        console.log(payload)
        const response = yield call(getProjectMembersApi, payload);
        yield put(getProjectMembersSuccess(response));
    } catch (error) {
        toast.error("Something Wnt Wrong!")
    }
}

export default function* projectSagas() {
    yield takeLatest(projectConstants.FETCH_PROJECTS, fetchProjects);
    yield takeLatest(projectConstants.ADD_NEW_PROJECT, addNewProject);
    yield takeLatest(projectConstants.GET_PROJECT_MEMBERS_REQUEST, getProjectMembers);
}