import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import AddNewTestsuite from "Components/ProjectsComponent/TestsuiteComponent/AddNewTestsuite";
import SubComponentsNav from "Components/ProjectsComponent/SubComponentsNav";
import TestsuiteViewComponent from "Components/ProjectsComponent/TestsuiteComponent/TestsuiteViewComponent";

import { addExecuteRequest } from "store/Execute/actions";
import {
  addTestsuiteRequest,
  editTestsuiteRequest,
  getTestsuitesRequest,
} from "store/Testsuites/actions";
import { getEnvironmentsRequest } from "store/Environments/actions";
import { getTestcasesRequest } from "store/Testcases/actions";
import { toastMessage } from "utils/toastMessage";

import { ALL_FIELDS_REQUIRED } from "constants/userMessagesConstants";

const mapState = ({ testsuites, testcases, environments }) => ({
  isLoading: testsuites.isLoading,
  testsuites: testsuites.testsuites,
  testcases: testcases.testcases,
  environments: environments.environments.map((ele) => ({
    label: ele.name,
    value: ele.id,
  })),
  isEnvLoading: environments.isEnvLoading,
});

const TestsuiteContainer = ({ cat }) => {
  // TO-Do:
  // needs to refactor this container and it's component with add comments wherever necessary
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, projectName } = useParams();
  const { isLoading, testsuites, testcases, environments, isEnvLoading } =
    useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [testsuiteFormData, setTestsuiteFormData] = useState({
    project: projectName,
    name: "",
    testcases: [],
    testcasesOptions: [],
  });

  useEffect(() => {
    dispatch(getTestsuitesRequest({ project: projectName }));
    dispatch(getEnvironmentsRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    // call testcases api if category of form changes and valid
    if (cat) {
      dispatch(getTestcasesRequest({ project: projectName }));
    }
  }, [cat]);

  useEffect(() => {
    setSelectedItem(testsuites.filter((item) => item.id == id)[0]);
  }, [testsuites, id]);

  useEffect(() => {
    let testcasesData = testcases.map((ele) => ({
      value: ele.id,
      label: ele.name,
    }));
    handleOnChangeForm("testcasesOptions", testcasesData);
  }, [testcases]);

  useEffect(() => {
    if (selectedItem) {
      let { name, testcases: selectedTestcases } = selectedItem;
      selectedTestcases = selectedTestcases?.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setTestsuiteFormData((prevState) => ({
        ...prevState,
        name,
        testcases: selectedTestcases,
      }));
    }

    return () =>
      setTestsuiteFormData((prevState) => ({
        ...prevState,
        name: "",
        project: projectName,
        testcases: [],
      }));
  }, [selectedItem]);

  const handleOnChangeForm = (name, value) => {
    setTestsuiteFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitTestsuiteForm = (e) => {
    e.preventDefault();
    // Here FD means FormData
    let {
      project,
      name: testsuiteName,
      testcases: testcasesFD,
    } = testsuiteFormData;

    if (!project || !testsuiteName || testcasesFD.length === 0) {
      toastMessage(ALL_FIELDS_REQUIRED, "error");
      return;
    } else {
      testcasesFD = testcasesFD.map((ele) => ele.value);

      let formPayload = {
        project,
        name: testsuiteName,
        array_of_testcases: testcasesFD,
      };

      switch (cat) {
        case "add":
          dispatch(addTestsuiteRequest(formPayload));
          break;

        case "edit":
          dispatch(editTestsuiteRequest({ ...formPayload, id }));
          break;

        default:
          break;
      }
    }
  };

  const handleExecute = (testsuite, env) => {
    dispatch(
      addExecuteRequest({
        testsuite,
        environment: env,
        data: { name: selectedItem?.name, fields: selectedItem?.testcases },
        level: "testsuite",
      })
    );
    navigate(`/project/${projectName}/execute/${testsuite}`);
  };

  const showViewComponent =
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0 &&
    !isLoading;

  return (
    <>
      <SubComponentsNav
        title="Testsuites"
        data={testsuites}
        isLoading={isLoading}
        onAddBtnClick={() => navigate(`/project/${projectName}/testsuites/new`)}
        onSelectItemUrl={`/project/${projectName}/testsuites`}
      />
      {cat ? (
        <AddNewTestsuite
          cat={cat}
          isLoading={isLoading}
          data={testsuiteFormData}
          onChange={handleOnChangeForm}
          onSubmit={handleSubmitTestsuiteForm}
        />
      ) : (
        showViewComponent && (
          <TestsuiteViewComponent
            data={selectedItem}
            projectName={projectName}
            environments={environments}
            isEnvLoading={isEnvLoading}
            handleExecute={handleExecute}
          />
        )
      )}
    </>
  );
};

TestsuiteContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default TestsuiteContainer;
