import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import AddNewSchedule from "Components/ProjectsComponent/ScheduleComponents/AddNewSchedule";
import ScheduleViewComponent from "Components/ProjectsComponent/ScheduleComponents/ScheduleViewComponent";

import {
  addScheduleRequest,
  getAllSchedulesRequest,
} from "store/Schedule/actions";
import { getTestcasesRequest } from "store/Testcases/actions";
import { getEnvironmentsRequest } from "store/Environments/actions";

const mapState = ({ schedules, testcases, environments }) => ({
  isLoading: schedules.isLoading,
  scheduledCases: schedules.scheduledCases,
  options: {
    testcases: testcases.testcases.map((testcase) => ({
      label: testcase.name,
      value: testcase.id,
    })),
    environments: environments.environments.map((environment) => ({
      label: environment.name,
      value: environment.id,
    })),
  },
});

const initialScheduleFormData = {
  testcase: null,
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
  const { isLoading, scheduledCases, options } = useSelector(mapState);

  const [addNewScheduleFormData, setAddNewScheduleFormData] = useState(
    initialScheduleFormData
  );

  useEffect(() => {
    dispatch(getAllSchedulesRequest({ project: projectName }));
  }, [projectName]);

  // fetch testcases and environments when cat changes
  useEffect(() => {
    if (cat) {
      dispatch(getTestcasesRequest({ project: projectName }));
      dispatch(getEnvironmentsRequest({ project: projectName }));
    }

    return () => setAddNewScheduleFormData(initialScheduleFormData);
  }, [projectName, cat]);

  // on form data change
  const handleFormDataChange = (name, value) =>
    setAddNewScheduleFormData((prevState) => ({ ...prevState, [name]: value }));

  // on form submit
  const handleFormDataSubmit = (e) => {
    e.preventDefault();
    const {
      frequencyType,
      frequencyValue,
      testcase,
      environment,
      ...otherFormData
    } = addNewScheduleFormData;

    dispatch(
      addScheduleRequest({
        ...otherFormData,
        environment: environment?.value,
        testcase: testcase?.value,
        startDateTime: new Date(otherFormData.startDateTime).getTime() / 1000,
        endDateTime: new Date(otherFormData.endDateTime).getTime() / 1000,
        frequency: frequencyValue,
        frequency_type: frequencyType,
        project: projectName,
      })
    );
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
          options={options}
        />
      ) : (
        <ScheduleViewComponent
          data={scheduledCases}
          isLoading={isLoading}
          onNavigate={navigate}
        />
      )}
    </div>
  );
};

ScheduleContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default ScheduleContainer;
