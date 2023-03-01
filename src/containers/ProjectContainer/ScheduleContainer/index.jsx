import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import AddNewSchedule from "Components/ProjectsComponent/ScheduleComponents/AddNewSchedule";
import ScheduleViewComponent from "Components/ProjectsComponent/ScheduleComponents/ScheduleViewComponent";

import {
  addScheduleRequest,
  getSchedulesRequest,
  resetScheduleSuccess,
} from "store/Schedule/actions";
import { getTestcasesRequest } from "store/Testcases/actions";
import { getTestsuitesRequest } from "store/Testsuites/actions";
import { getEnvironmentsRequest } from "store/Environments/actions";
import { buildRoute } from "utils/helper";

import { ADD_SCHEDULE_ROUTE } from "constants/routeConstants";

const mapState = ({ schedules, testcases, environments, testsuites }) => ({
  isLoading: schedules.isLoading,
  isSuccess: schedules.isSuccess,
  scheduledCases: schedules.scheduledCases,
  testcaseOptions: testcases.testcases.map((testcase) => ({
    label: testcase.name,
    value: testcase.id,
  })),
  testsuiteOptions: testsuites.testsuites.map((testcase) => ({
    label: testcase.name,
    value: testcase.id,
  })),
  environmentOptions: environments.environments.map((environment) => ({
    label: environment.name,
    value: environment.id,
  })),
});

const initialScheduleFormData = {
  level: null,
  testcase: null,
  testsuite: null,
  environment: null,
  startDateTime: "",
  frequencyType: "",
  frequencyValue: {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  endDateTime: "",
};

const ScheduleContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName } = useParams();
  const {
    isLoading,
    isSuccess,
    scheduledCases,
    testcaseOptions,
    testsuiteOptions,
    environmentOptions,
  } = useSelector(mapState);

  const [addNewScheduleFormData, setAddNewScheduleFormData] = useState(
    initialScheduleFormData
  );

  useEffect(() => {
    dispatch(getSchedulesRequest({ project: projectName }));
  }, [projectName]);

  // fetch testcases and environments when cat changes
  useEffect(() => {
    if (cat) {
      dispatch(getTestcasesRequest({ project: projectName }));
      dispatch(getTestsuitesRequest({ project: projectName }));
      dispatch(getEnvironmentsRequest({ project: projectName }));
    }

    return () => setAddNewScheduleFormData(initialScheduleFormData);
  }, [projectName, cat]);

  // refetch schedules once isSuccess becomes true
  useEffect(() => {
    if (isSuccess) {
      dispatch(getSchedulesRequest({ project: projectName }));
    }
    return () => resetScheduleSuccess();
  }, [isSuccess]);

  // on form data change
  const handleFormDataChange = (name, value) =>
    setAddNewScheduleFormData((prevState) => ({ ...prevState, [name]: value }));

  // on form submit
  const handleFormDataSubmit = (e) => {
    e.preventDefault();
    const {
      level,
      frequencyType,
      frequencyValue,
      testcase,
      testsuite,
      environment,
      startDateTime,
      endDateTime,
      ...otherFormData
    } = addNewScheduleFormData;

    let formDataToSchedule = {
      ...otherFormData,
      level,
      environment: environment?.value,
      startDateTime: new Date(startDateTime).getTime() / 1000,
      endDateTime: new Date(endDateTime).getTime() / 1000,
      frequency: frequencyValue,
      frequency_type: frequencyType,
      project: projectName,
    };

    if (level === "testcase") {
      formDataToSchedule["testcase"] = testcase?.value;
    } else if (level === "testsuite") {
      formDataToSchedule["testsuite"] = testsuite?.value;
    }

    dispatch(addScheduleRequest(formDataToSchedule));
  };

  // navigate to cchedule form to create a new entry
  const navigateToScheduleForm = () => {
    const scheduleFormRoute = buildRoute(ADD_SCHEDULE_ROUTE, { projectName });
    navigate(scheduleFormRoute);
  };

  return (
    <div className="w-100">
      {cat ? (
        <AddNewSchedule
          cat={cat}
          isLoading={isLoading}
          projectName={projectName}
          data={addNewScheduleFormData}
          onChange={handleFormDataChange}
          onSubmit={handleFormDataSubmit}
          testcaseOptions={testcaseOptions}
          testsuiteOptions={testsuiteOptions}
          environmentOptions={environmentOptions}
        />
      ) : (
        !isLoading && (
          <ScheduleViewComponent
            data={scheduledCases}
            navigateToScheduleForm={navigateToScheduleForm}
          />
        )
      )}
    </div>
  );
};

ScheduleContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default ScheduleContainer;
