import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AddNewTestcase from "Components/ProjectsComponent/TestcaseComponents/AddNewTestcase";
import { SubComponentsNav } from "Components/ProjectsComponent";
import TestcaseViewComponent from "Components/ProjectsComponent/TestcaseComponents/TestcaseViewComponent";

import {
  addExecuteRequest,
  clearExecutionFailure,
} from "store/Execute/actions";
import {
  addTestcasesRequest,
  editTestcasesRequest,
  getTestcasesRequest,
} from "store/Testcases/actions";
import { GetDiffOfArrayOfObjects } from "utils";
import { getEnvironmentsRequest } from "store/Environments/actions";
import { getTeststepsRequest } from "store/Teststeps/actions";

const mapState = ({ testcases, environments, execute, teststeps }) => ({
  testcases: testcases.testcases,
  isLoading: testcases.isLoading,
  environments: environments.environments.map((environment) => ({
    label: environment.name,
    value: environment.id,
  })),
  isEnvironmentsLoading: environments.isLoading,
  isExecuteFailed: execute.isError,
  teststeps: teststeps.teststeps,
});

const INITIAL_TESTCASE_FORM_DATA = {
  name: "",
  description: "",
  arrayOfTeststeps: [],
};

const TestcaseContainer = (props) => {
  // TO-Do:
  // needs to refactor this container and it's component with add comments wherever necessary
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cat } = props;
  const { projectName, id } = useParams();
  const {
    testcases,
    isLoading,
    environments,
    isEnvironmentsLoading,
    isExecuteFailed,
    teststeps,
  } = useSelector(mapState);

  const [testcaseFormData, setTestcaseFormData] = useState({
    ...INITIAL_TESTCASE_FORM_DATA,
    project: projectName,
  });
  const [selectedItem, setSelectedItem] = useState({});
  const [options, setOptions] = useState({
    initialOptions: [],
    updatedOptions: [],
  });
  const [selectedTeststeps, setSelectedTeststeps] = useState([]);

  useEffect(() => {
    dispatch(getTestcasesRequest({ project: projectName }));
    dispatch(getEnvironmentsRequest({ project: projectName }));
    dispatch(getTeststepsRequest({ project: projectName }));
    dispatch(clearExecutionFailure());
  }, [projectName]);

  useEffect(() => {
    setSelectedItem(testcases.filter((e) => e.id == id)[0]);
  }, [testcases, id]);

  useEffect(() => {
    if (cat) {
      setOptions({
        initialOptions: teststeps,
        updatedOptions: teststeps,
      });
    }
  }, [teststeps, cat]);

  useEffect(() => {
    if (cat) {
      let diff = GetDiffOfArrayOfObjects(
        options.initialOptions,
        selectedTeststeps
      );
      setOptions((prevState) => ({
        ...prevState,
        updatedOptions: diff,
      }));
    }
  }, [selectedTeststeps, cat]);

  useEffect(() => {
    if (cat) {
      setTestcaseFormData((prevState) => ({
        ...prevState,
        name: selectedItem?.name || INITIAL_TESTCASE_FORM_DATA.name,
        id: selectedItem?.id || INITIAL_TESTCASE_FORM_DATA.id,
        description:
          selectedItem?.description || INITIAL_TESTCASE_FORM_DATA.description,
        arrayOfTeststeps:
          selectedItem?.teststeps ||
          INITIAL_TESTCASE_FORM_DATA.arrayOfTeststeps,
      }));
      setSelectedTeststeps(selectedItem?.teststeps || []);
    }
    return () => {
      setTestcaseFormData(INITIAL_TESTCASE_FORM_DATA);
      setSelectedTeststeps([]);
    };
  }, [selectedItem, cat]);

  const handleExecute = (testcase, environment) => {
    dispatch(
      addExecuteRequest({
        testcase,
        environment,
        data: { name: selectedItem?.name, fields: selectedItem?.teststeps },
        level: "testcase",
      })
    );
    navigate(`/project/${projectName}/execute/${testcase}`);
  };

  const onRemoveSelectedTeststep = (selectedIndex) => {
    setSelectedTeststeps((prevState) => {
      let fields = prevState.filter(function (_value, index) {
        return index !== selectedIndex;
      });
      return fields;
    });
  };

  const onDeleteSelectedTeststep = (selectedIndex) => {
    let updatedTeststeps = selectedTeststeps.filter(function (_value, index) {
      return index !== selectedIndex;
    });
    setSelectedTeststeps(updatedTeststeps);
    setTestcaseFormData((prevState) => ({
      ...prevState,
      arrayOfTeststeps: updatedTeststeps,
    }));
  };

  const onSelectedTeststepsChange = (value) => {
    setSelectedTeststeps((prevState) => [
      ...prevState,
      {
        ...value,
        selected_testdata: value.testdata.map((e) => e.id),
      },
    ]);
  };

  const onReorderSelectedTeststeps = (value) => {
    setSelectedTeststeps(value);
  };

  const onTestdataChangeInSelectedTeststep = (teststep) => {
    let updatedTeststeps = [...selectedTeststeps];
    updatedTeststeps[
      updatedTeststeps.findIndex((ele) => ele.id === teststep.id)
    ] = teststep;
    setSelectedTeststeps(updatedTeststeps);
  };

  const onAddTeststepDataSave = () => {
    setTestcaseFormData((prevState) => ({
      ...prevState,
      arrayOfTeststeps: selectedTeststeps,
    }));
  };

  const handleTestcaseFormDataChange = (key, value) => {
    setTestcaseFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmitTestcaseFormData = (e) => {
    e.preventDefault();
    const { id, name, description, arrayOfTeststeps } = testcaseFormData;

    const formDataToSubmit = {
      name,
      project: projectName,
      description,
      array_of_teststeps: arrayOfTeststeps.map((teststep) => ({
        teststep: teststep.id,
        testdata: teststep.selected_testdata,
      })),
    };

    if (cat === "add") {
      dispatch(addTestcasesRequest(formDataToSubmit));
    } else {
      dispatch(editTestcasesRequest({ ...formDataToSubmit, id }));
    }
  };

  const showViewComponent =
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0 &&
    !isLoading;

  return (
    !isExecuteFailed && (
      <>
        <SubComponentsNav
          title="Testcases"
          data={testcases}
          isLoading={isLoading}
          onAddBtnClick={() =>
            navigate(`/project/${projectName}/testcases/new`)
          }
          onSelectItemUrl={`/project/${projectName}/testcases`}
        />
        {cat ? (
          <AddNewTestcase
            cat={cat}
            isLoading={isLoading}
            data={testcaseFormData}
            teststepsOptions={options}
            selectedTeststeps={selectedTeststeps}
            onAddTeststepDataSave={onAddTeststepDataSave}
            onchange={handleTestcaseFormDataChange}
            onRemoveSelectedTeststep={onRemoveSelectedTeststep}
            onReorderSelectedTeststeps={onReorderSelectedTeststeps}
            onSelectedTeststepOrderChange={setSelectedTeststeps}
            onSelectedTeststepsChange={onSelectedTeststepsChange}
            onSubmit={handleSubmitTestcaseFormData}
            onTestdataChangeInSelectedTeststep={
              onTestdataChangeInSelectedTeststep
            }
            onDeleteSelectedTeststep={onDeleteSelectedTeststep}
          />
        ) : (
          showViewComponent && (
            <TestcaseViewComponent
              isLoading={isLoading}
              data={selectedItem}
              projectName={projectName}
              environments={environments}
              isEnvironmentsLoading={isEnvironmentsLoading}
              handleExecute={handleExecute}
            />
          )
        )}
      </>
    )
  );
};

TestcaseContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default TestcaseContainer;
