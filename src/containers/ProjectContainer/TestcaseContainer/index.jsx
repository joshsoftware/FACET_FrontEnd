import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  addExecuteRequest,
  clearExecutionFailure,
} from "store/Execute/actions";
import {
  AddNewTestcase,
  TestcaseViewComponent,
} from "Components/ProjectsComponent/TestcaseComponents";
import {
  addTestcasesRequest,
  editTestcasesRequest,
  getTestcasesRequest,
} from "store/Testcases/actions";
import { getEnvironmentsRequest } from "store/Environments/actions";
import { getTeststepsRequest } from "store/Teststeps/actions";
import { SubComponentsNav } from "Components/ProjectsComponent";

import { GetDiffOfArrayOfObjects } from "utils";

const mapState = ({ testcases, environments, execute, teststeps }) => ({
  testcases: testcases.testcases,
  isLoading: testcases.isLoading,
  environments: environments.environments,
  isEnvironmentsLoading: environments.isLoading,
  isExecuteFailed: execute.isError,
  teststeps: teststeps.teststeps,
});

const INITIAL_TESTCASE_FORM_DATA = {
  name: "",
  description: "",
  array_of_teststeps: [],
};

const TestcaseContainer = (props) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

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
    setOptions({
      initialOptions: teststeps,
      updatedOptions: teststeps,
    });
  }, [teststeps]);

  useEffect(() => {
    let diff = GetDiffOfArrayOfObjects(
      options.initialOptions,
      selectedTeststeps
    );
    setOptions((prevState) => ({
      ...prevState,
      updatedOptions: diff,
    }));
  }, [selectedTeststeps]);

  useEffect(() => {
    setTestcaseFormData((prevState) => ({
      ...prevState,
      name: selectedItem?.name || INITIAL_TESTCASE_FORM_DATA.name,
      id: selectedItem?.id || INITIAL_TESTCASE_FORM_DATA.id,
      description:
        selectedItem?.description || INITIAL_TESTCASE_FORM_DATA.description,
      array_of_teststeps:
        selectedItem?.teststeps?.map((e) => {
          return {
            teststep: e.id,
            testdata: e.selected_testdata,
          };
        }) || INITIAL_TESTCASE_FORM_DATA.array_of_teststeps,
    }));
    setSelectedTeststeps(selectedItem?.teststeps || []);
  }, [selectedItem]);

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

  const onRemoveSelectedTeststep = (index) => {
    setSelectedTeststeps((prevState) => {
      let fields = prevState.filter(function (_value, ind) {
        return ind !== index;
      });
      return fields;
    });
  };

  const onSelectedTeststepsChange = (_name, value) => {
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
      array_of_teststeps: selectedTeststeps?.map((e) => {
        return {
          teststep: e.id,
          testdata: e.selected_testdata,
        };
      }),
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
    if (cat === "add") {
      dispatch(addTestcasesRequest(testcaseFormData));
    } else {
      dispatch(editTestcasesRequest(testcaseFormData));
    }
  };

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
          />
        ) : (
          <TestcaseViewComponent
            isLoading={isLoading}
            data={selectedItem}
            projectName={projectName}
            environments={environments}
            isEnvironmentsLoading={isEnvironmentsLoading}
            handleExecute={handleExecute}
          />
        )}
      </>
    )
  );
};

TestcaseContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default TestcaseContainer;
