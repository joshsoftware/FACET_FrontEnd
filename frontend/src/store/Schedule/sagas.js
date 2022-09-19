import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from 'react-toastify';
import scheduleConstants from "./constants";
import { addScheduleTestcaseApi, getAllSchesuledTestcasesApi } from "./apis";
import { addScheduleSuccess, getAllSchedulesSuccess } from "./actions";

export function* getAllSchedules({ payload }) {
    try {
        const response = yield call(getAllSchesuledTestcasesApi, payload);
        yield put(getAllSchedulesSuccess(response.scheduled_jobs));
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
}

export function* scheduleNewTestcase({ payload }) {
    try {
        yield call(addScheduleTestcaseApi, payload);
        yield put(addScheduleSuccess());
        toast.success("Testcase Scheduled Successfully!");
    } catch (error) {
        console.log(error);
        toast.error(error);
    }

}

export default function* scheduleSagas() {
    yield takeLatest(scheduleConstants.GET_SCHEDULE_TESTCASE_REQUEST, getAllSchedules);
    yield takeLatest(scheduleConstants.ADD_SCHEDULE_REQUEST, scheduleNewTestcase);
}