import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from 'react-toastify';
import scheduleConstants from "./constants";
import { addScheduleSuiteApi, getAllSchesuledSuitesApi } from "./apis";
import { addScheduleSuccess, getAllSchedulesSuccess } from "./actions";

export function* getAllSchedules({ payload }) {
    try {
        const response = yield call(getAllSchesuledSuitesApi, payload.project);
        yield put(getAllSchedulesSuccess(response.scheduled_jobs));
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
}

export function* scheduleNewTestsuite({ payload }) {
    try {
        yield call(addScheduleSuiteApi, payload);
        yield put(addScheduleSuccess());
        toast.success("Testsuite Scheduled Successfully!");
    } catch (error) {
        console.log(error);
        toast.error(error);
    }

}

export default function* scheduleSagas() {
    yield takeLatest(scheduleConstants.GET_SCHEDULE_TESTSUITE_REQUEST, getAllSchedules);
    yield takeLatest(scheduleConstants.ADD_SCHEDULE_REQUEST, scheduleNewTestsuite);
}