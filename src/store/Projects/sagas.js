import { call, put, takeLatest } from "redux-saga/effects";

import {
  addNewProjectApi,
  deleteProjectApi,
  getProjectApi,
  getProjectsApi,
  updateProjectNameApi,
} from "./apis";
import {
  addProjectFailure,
  deleteProjectFailure,
  deleteProjectSuccess,
  getProjectFailure,
  getProjectSuccess,
  getProjectsFailure,
  getProjectsSuccess,
  updateProjectNameFailure,
  updateProjectNameSuccess,
} from "./actions";
import { apisErrorMessage } from "utils/apisErrorMessage";
import { toastMessage } from "utils/toastMessage";

import projectConstants from "./constants";
import { PROJECTS } from "constants/userMessagesConstants";

export function* getProjects() {
  try {
    const response = yield call(getProjectsApi);
    yield put(getProjectsSuccess(response.projects));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getProjectsFailure());
  }
}

export function* addNewProject({ payload }) {
  try {
    yield call(addNewProjectApi, payload);
    yield call(getProjects);
    toastMessage(PROJECTS.ADD_NEW_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addProjectFailure());
  }
}

export function* getProject({ payload }) {
  try {
    const response = yield call(getProjectApi, payload);
    yield put(getProjectSuccess(response));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getProjectFailure());
  }
}

export function* updateProjectName({ payload }) {
  try {
    yield call(updateProjectNameApi, payload);
    yield put(updateProjectNameSuccess());
    toastMessage(PROJECTS.UPDATE_PROJECT_NAME_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(updateProjectNameFailure());
  }
}

export function* deleteProject({ payload }) {
  try {
    yield call(deleteProjectApi, payload);
    yield put(deleteProjectSuccess());
    yield call(getProjects);
    toastMessage(PROJECTS.DELETE_PROJECT_SUCCESS);
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(deleteProjectFailure());
  }
}

// Watcher saga
export default function* projectSagas() {
  yield takeLatest(projectConstants.GET_PROJECTS_REQUEST, getProjects);
  yield takeLatest(projectConstants.ADD_PROJECT_REQUEST, addNewProject);
  yield takeLatest(projectConstants.GET_PROJECT_REQUEST, getProject);
  yield takeLatest(
    projectConstants.UPDATE_PROJECT_NAME_REQUEST,
    updateProjectName
  );
  yield takeLatest(projectConstants.DELETE_PROJECT_REQUEST, deleteProject);
}
