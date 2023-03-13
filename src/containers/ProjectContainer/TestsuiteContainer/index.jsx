import React, { useCallback, useEffect, useState } from "react";
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
import { buildRoute } from "utils/helper";
import { convertToSlug } from "utils";
import { getEnvironmentsRequest } from "store/Environments/actions";
import { getTestcasesRequest } from "store/Testcases/actions";
import { toastMessage } from "utils/toastMessage";

import { ALL_FIELDS_REQUIRED } from "constants/userMessagesConstants";
import {
  ADD_TESTSUITE_ROUTE,
  EDIT_TESTSUITE_ROUTE,
  EXECUTE_ROUTE,
  TESTSUITES_ROUTE,
} from "constants/routeConstants";
import { INITIAL_TESTSUITE_FORM_DATA } from "constants/appConstants";

const mapState = ({ testsuites, testcases, environments }) => ({
  isLoading: testsuites.isLoading,
  testsuites: testsuites.testsuites,
  testcasesOptions: testcases.testcases.map((testcase) => ({
    label: testcase.name,
    value: testcase.id,
  })),
  environments: environments.environments.map((environment) => ({
    label: environment.name,
    value: environment.id,
  })),
  isEnvLoading: environments.isEnvLoading,
});

const TestsuiteContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, projectName } = useParams();
  const {
    isLoading,
    testsuites,
    testcasesOptions,
    environments,
    isEnvLoading,
  } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [testsuiteFormData, setTestsuiteFormData] = useState(
    INITIAL_TESTSUITE_FORM_DATA
  );

  useEffect(() => {
    dispatch(getTestsuitesRequest({ project: projectName }));
    dispatch(getEnvironmentsRequest({ project: projectName }));
  }, [projectName]);

  // call testcases api if category of form changes and valid
  useEffect(() => {
    if (cat) {
      dispatch(getTestcasesRequest({ project: projectName }));
    }
  }, [cat]);

  // set selected testsuite data
  useEffect(() => {
    if (testsuites.length && id) {
      setSelectedItem(testsuites.filter((item) => item.id == id)[0]);
    }
    return () => setSelectedItem({});
  }, [testsuites, id]);

  // set testsuite form data for selected suite when cat is edit
  useEffect(() => {
    if (Object.keys(selectedItem).length && cat === "edit") {
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

    return () => setTestsuiteFormData(() => INITIAL_TESTSUITE_FORM_DATA);
  }, [selectedItem, cat]);

  const handleOnFormChange = (name, value) => {
    setTestsuiteFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // handles the testsuite form submit action
  const handleSubmitTestsuiteForm = (e) => {
    e.preventDefault();
    // Here FD means FormData
    let { name: testsuiteName, testcases: testcasesFD } = testsuiteFormData;

    if (!projectName || !testsuiteName || !testcasesFD.length) {
      toastMessage(ALL_FIELDS_REQUIRED, "error");
    } else {
      testcasesFD = testcasesFD.map((testcase) => testcase.value);

      const formPayload = {
        project: projectName,
        name: convertToSlug(testsuiteName),
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

  // calls the execute testsuite action by taking testsuite and environment's id as parameter
  const handleExecute = (testsuite, env) => {
    dispatch(
      addExecuteRequest({
        testsuite,
        environment: env,
        data: { name: selectedItem?.name, fields: selectedItem?.testcases },
        level: "testsuite",
      })
    );
    const executionRouteUrl = buildRoute(EXECUTE_ROUTE, {
      projectName,
      type: "testsuite",
      id: testsuite,
    });
    navigate(executionRouteUrl);
  };

  const navigateToEditTestsuite = useCallback(() => {
    const editTestsuiteRoute = buildRoute(EDIT_TESTSUITE_ROUTE, {
      projectName,
      id,
    });
    navigate(editTestsuiteRoute);
  }, [projectName, id]);

  const navigateToAddTestsuite = useCallback(() => {
    const addTestsuiteRoute = buildRoute(ADD_TESTSUITE_ROUTE, { projectName });
    navigate(addTestsuiteRoute);
  }, [projectName]);

  const testsuiteBaseURL = buildRoute(TESTSUITES_ROUTE, { projectName });

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
        onAddBtnClick={navigateToAddTestsuite}
        componentBaseUrl={testsuiteBaseURL}
      />
      {cat ? (
        <AddNewTestsuite
          cat={cat}
          isLoading={isLoading}
          data={testsuiteFormData}
          testcasesOptions={testcasesOptions}
          onChange={handleOnFormChange}
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
            onEditButtonClick={navigateToEditTestsuite}
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
