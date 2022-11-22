import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  addTestdataApi,
  downloadTestdataExcelApi,
  getTestdatasApi,
  uploadTestdataExcelApi,
} from "./apis";
import {
  downloadExcelFailure,
  downloadExcelSuccess,
  getTestdataSuccess,
  uploadExcelFailure,
  uploadExcelSuccess,
} from "./actions";
import testdataConstants from "./constants";

export function* getTestdatas({ payload }) {
  try {
    const response = yield call(getTestdatasApi, payload);
    yield put(getTestdataSuccess(response.testdata));
  } catch (error) {
    toast.error(error.data.error);
  }
}

export function* addTestdata({ payload }) {
  try {
    yield call(addTestdataApi, payload);
    toast.success("Testdata Added Successfully!");
    yield call(getTestdatas, { payload: { teststep: payload.teststep } });
  } catch (error) {
    toast.error(error.data.error);
  }
}

export function* uploadTestdataExcelFile({ payload }) {
  try {
    yield call(uploadTestdataExcelApi, payload);
    toast.success("File Uploaded successfully!");
    yield put(uploadExcelSuccess());
  } catch (error) {
    toast.error(error.data.error);
    yield put(uploadExcelFailure(error.data));
  }
}

export function* downloadTestdataExcelFile({ payload }) {
  try {
    yield call(downloadTestdataExcelApi, payload);
    yield put(downloadExcelSuccess());
  } catch (error) {
    toast.error(error.data.error);
    yield put(downloadExcelFailure(error.data));
  }
}

export default function* testdataSagas() {
  yield takeLatest(testdataConstants.GET_TESTDATA_REQUEST, getTestdatas);
  yield takeLatest(testdataConstants.ADD_TESTDATA_REQUEST, addTestdata);
  yield takeLatest(
    testdataConstants.UPLOAD_EXCEL_REQUEST,
    uploadTestdataExcelFile
  );
  yield takeLatest(
    testdataConstants.DOWNLOAD_EXCEL_REQUEST,
    downloadTestdataExcelFile
  );
}
