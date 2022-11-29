import { call, put, takeLatest } from "redux-saga/effects";

import {
  addEnvironmentApi,
  editEnvironmentApi,
  getEnvironmentsApi,
} from "./apis";
import {
  addEnvironmentsFailure,
  addEnvironmentsSuccess,
  editEnvironmentsFailure,
  editEnvironmentsSuccess,
  getEnvironmentsFailure,
  getEnvironmentsSuccess,
} from "./actions";
import environmentConstants from "./constants";

import { toastMessage } from "utils/toastMessage";
import { apisErrorMessage } from "utils/apisErrorMessage";

// saga for get All Environments data for a project
export function* getEnvironments({ payload }) {
  try {
    const response = yield call(getEnvironmentsApi, payload);
    yield put(getEnvironmentsSuccess(response.environments));
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(getEnvironmentsFailure(errorMessage));
  }
}

// saga for add Environment in the project
export function* addEnvironment({ payload }) {
  try {
    yield call(addEnvironmentApi, payload);
    toastMessage("Environments Added Successfully!", "success");
    yield call(getEnvironments, { payload: { project: payload.project } });
    yield put(addEnvironmentsSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(addEnvironmentsFailure(errorMessage));
  }
}

// saga for edit Environment in the project
export function* editEnvironment({ payload }) {
  try {
    yield call(editEnvironmentApi, payload);
    toastMessage("Environments Updated Successfully!", "success");
    yield call(getEnvironments, { payload: { project: payload.project } });
    yield put(editEnvironmentsSuccess());
  } catch (error) {
    const errorMessage = apisErrorMessage(error);
    toastMessage(errorMessage, "error");
    yield put(editEnvironmentsFailure(errorMessage));
  }
}

// Watcher Sagas
export default function* environmentSagas() {
  yield takeLatest(
    environmentConstants.GET_ENVIRONMENTS_REQUEST,
    getEnvironments
  );
  yield takeLatest(
    environmentConstants.ADD_ENVIRONMENTS_REQUEST,
    addEnvironment
  );
  yield takeLatest(
    environmentConstants.EDIT_ENVIRONMENTS_REQUEST,
    editEnvironment
  );
}
