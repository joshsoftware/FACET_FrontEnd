import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import AddNewTeststep from "Components/ProjectsComponent/TeststepComponents/AddNewTeststep";
import AddNewTestdata from "Components/ProjectsComponent/TeststepComponents/AddNewTestdata";
import SubComponentsNav from "Components/ProjectsComponent/SubComponentsNav";
import TeststepViewComponent from "Components/ProjectsComponent/TeststepComponents/TeststepViewComponent";

import {
  addTestdataRequest,
  clearTestdataState,
  editTestdataRequest,
  getTestdataRequest,
} from "store/Testdata/actions";
import {
  addTeststepsRequest,
  editTeststepsRequest,
  getTeststepsRequest,
} from "store/Teststeps/actions";
import { buildRoute } from "utils/helper";
import {
  convertArrayToObject,
  convertToKeyValuePairsArray,
  isSameKeyExist,
} from "utils/helpers/keyValuePairs";
import { getEndpointsRequest } from "store/Endpoints/actions";
import { getHeadersRequest } from "store/Headers/actions";
import { getPayloadsRequest } from "store/Payloads/actions";
import { toastMessage } from "utils/toastMessage";

import {
  INITIAL_TESTSTEP_FORM_DATA,
  INITIAL_TESTDATA_FORM_DATA,
  HTTP_METHODS_OPTIONS,
} from "constants/appConstants";
import {
  ALL_FIELDS_REQUIRED,
  PARAMETERS_DUPLICATE_KEY_ERROR,
} from "constants/userMessagesConstants";
import {
  ADD_TESTSTEP_ROUTE,
  EDIT_TESTSTEP_ROUTE,
  TESTSTEPS_ROUTE,
} from "constants/routeConstants";

const mapState = ({ endpoints, headers, payloads, teststeps, testdata }) => ({
  isLoading: teststeps.isLoading,
  teststeps: teststeps.teststeps,
  testdata: testdata.testdata,
  isTestdataSuccess: testdata.isSuccess,
  endpointOptions: endpoints.endpoints.map((endpoint) => ({
    label: endpoint.name,
    value: endpoint.id,
  })),
  headerOptions: headers.headers.map((header) => ({
    label: header.name,
    value: header.id,
  })),
  payloadOptions: payloads.payloads.map((payload) => ({
    label: payload.name,
    value: payload.id,
  })),
});

const TeststepContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName, id } = useParams();
  const {
    endpointOptions,
    headerOptions,
    payloadOptions,
    teststeps,
    isLoading,
    testdata,
    isTestdataSuccess,
  } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [teststepFormData, setTeststepFormData] = useState(
    INITIAL_TESTSTEP_FORM_DATA
  );
  const [testdataFormData, setTestdataFormData] = useState(
    INITIAL_TESTDATA_FORM_DATA
  );
  const [isShowAddTestdataForm, setIsShowAddTestdataForm] = useState(false);

  // get list of teststeps of the project
  useEffect(() => {
    dispatch(getTeststepsRequest({ project: projectName }));
  }, [projectName]);

  // get all endpoints, headers, payloads when cat changes
  useEffect(() => {
    if (cat) {
      dispatch(getEndpointsRequest({ project: projectName }));
      dispatch(getHeadersRequest({ project: projectName }));
      dispatch(getPayloadsRequest({ project: projectName }));
    }
    return () => setTeststepFormData(INITIAL_TESTSTEP_FORM_DATA);
  }, [cat, projectName]);

  // set selected teststep item data
  useEffect(() => {
    if (id) {
      setSelectedItem(teststeps.filter((ele) => ele.id == id)[0] || {});
      dispatch(getTestdataRequest({ teststep: id }));
    }
    return () => {
      setIsShowAddTestdataForm(false);
      setSelectedItem({});
    };
  }, [teststeps, id]);

  // set teststep form data for selected teststep when cat is edit
  useEffect(() => {
    if (Object.keys(selectedItem).length && cat === "edit") {
      let { endpoint, header, method, payload } = selectedItem;
      endpoint = { value: endpoint?.id, label: endpoint?.name };
      payload = { value: payload?.id, label: payload?.name };
      header = { value: header?.id, label: header?.name };
      method = HTTP_METHODS_OPTIONS.filter(
        (ele) => ele.value === method?.toUpperCase()
      );

      setTeststepFormData((prevState) => ({
        ...prevState,
        ...selectedItem,
        endpoint,
        method,
        payload,
        header,
      }));
    }

    return () => setTeststepFormData(INITIAL_TESTSTEP_FORM_DATA);
  }, [selectedItem, cat]);

  // clear and the testdata state and refetch the testdata once testdata added or updated
  useEffect(() => {
    if (isTestdataSuccess) {
      dispatch(clearTestdataState());
      dispatch(getTestdataRequest({ teststep: id }));
      handleCloseTestdataForm();
    }
  }, [isTestdataSuccess, id]);

  // on teststep form data change
  const handleFormDataChange = (key, value) => {
    setTeststepFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  // submit teststep form data
  const handleTeststepFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const {
        name,
        header: { value: header_id },
        method: { value: method },
        payload: { value: payload_id },
        endpoint: { value: endpoint_id },
      } = teststepFormData;

      const formDataToSubmit = {
        name,
        method,
        endpoint_id,
        header_id,
        payload_id,
        project: projectName,
      };
      if (cat === "add") {
        dispatch(addTeststepsRequest(formDataToSubmit));
      } else {
        dispatch(editTeststepsRequest({ ...formDataToSubmit, id }));
      }
    },
    [teststepFormData]
  );

  // toggle testdata form visibility
  const handleCloseTestdataForm = () => {
    setTestdataFormData(INITIAL_TESTDATA_FORM_DATA);
    setIsShowAddTestdataForm(!isShowAddTestdataForm);
  };

  // handles testdataFormData changes
  const handleTestdataFormChange = (key, value) => {
    setTestdataFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  // handle testdata form submit action: validates all fields then dispatch action
  const handleTestdataFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const {
        id: testdataId,
        name,
        teststep,
        parameters,
        payload,
        expectedOutcome,
        selectedExpOutcome,
        isEditForm,
      } = testdataFormData;

      // If the parameters with same key exist then show toast error
      if (isSameKeyExist(parameters)) {
        toastMessage(PARAMETERS_DUPLICATE_KEY_ERROR, "error");
        return;
      }

      // if the request for edit the testdata then directly pass the expectedOutcome as it was selected expected outcome
      // if the request is to create testdata then it filter out selected expected outcome field from list of expected outcomes
      const expected_outcome = isEditForm
        ? expectedOutcome
        : expectedOutcome.find((ele) => ele.id === selectedExpOutcome?.value)
            ?.expected_outcome;

      if (!name || !teststep || !JSON.parse(payload) || !expected_outcome) {
        toastMessage(ALL_FIELDS_REQUIRED, "error");
      } else {
        const formDataToSubmit = {
          name,
          teststep,
          parameters: convertArrayToObject(parameters),
          payload: JSON.parse(payload),
          expected_outcome,
        };

        if (testdataId) {
          // if testdataId is present then dispatch edit testdata request
          dispatch(
            editTestdataRequest({
              id: testdataId,
              ...formDataToSubmit,
            })
          );
        } else {
          // dispatch add testdata request
          dispatch(addTestdataRequest(formDataToSubmit));
        }
      }
    },
    [testdataFormData]
  );

  // if argument testdataToEdit available then set testdataFormData from it to edit
  // otherwise set testdataFormData from template to create new testdata
  const onOpenTestdataForm = useCallback(
    (testdataToEdit) => {
      if (testdataToEdit) {
        const {
          id: testdataId,
          teststep,
          name,
          payload,
          parameters,
          expected_outcome: expectedOutcome,
        } = testdataToEdit;

        setTestdataFormData((prevState) => ({
          ...prevState,
          id: testdataId,
          teststep,
          name,
          parameters: convertToKeyValuePairsArray(parameters),
          payload: JSON.stringify(payload),
          expectedOutcome,
          isEditForm: true,
        }));
      } else {
        const { id: teststepId, payload } = selectedItem;
        const {
          teststep: initialTDId,
          name: initialTDName,
          payload: initialTDPayload,
          expectedOutcome: initialTDExpOutcome,
          selectedExpOutcome: initialTDSelectedExpOutcome,
        } = INITIAL_TESTDATA_FORM_DATA;

        setTestdataFormData((prevState) => ({
          ...prevState,
          name: initialTDName,
          teststep: teststepId || initialTDId,
          payload: JSON.stringify(payload?.payload) || initialTDPayload,
          parameters: convertToKeyValuePairsArray(payload?.parameters),
          expectedOutcome: payload?.expected_outcome || initialTDExpOutcome,
          selectedExpOutcome: initialTDSelectedExpOutcome,
        }));
      }
      setIsShowAddTestdataForm(true);
    },
    [selectedItem]
  );

  const navigateToEditTeststep = useCallback(() => {
    const editTeststepRoute = buildRoute(EDIT_TESTSTEP_ROUTE, {
      projectName,
      id,
    });
    navigate(editTeststepRoute);
  }, [projectName, id]);

  // helps to navigate add new teststep form page
  const navigateToAddNewTeststep = useCallback(
    () => navigate(buildRoute(ADD_TESTSTEP_ROUTE, { projectName })),
    [projectName]
  );

  // create teststep url
  const teststepsURL = buildRoute(TESTSTEPS_ROUTE, { projectName });

  const isShowViewComponent =
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0 &&
    !isLoading;

  return (
    <>
      <SubComponentsNav
        title="Teststeps"
        data={teststeps}
        isLoading={isLoading}
        onAddBtnClick={navigateToAddNewTeststep}
        componentBaseUrl={teststepsURL}
      />
      {cat ? (
        <AddNewTeststep
          cat={cat}
          isLoading={isLoading}
          data={teststepFormData}
          onChange={handleFormDataChange}
          endpointOptions={endpointOptions}
          headerOptions={headerOptions}
          payloadOptions={payloadOptions}
          methodOptions={HTTP_METHODS_OPTIONS}
          onSubmit={handleTeststepFormSubmit}
        />
      ) : isShowAddTestdataForm ? (
        <AddNewTestdata
          data={testdataFormData}
          onChange={handleTestdataFormChange}
          onSubmit={handleTestdataFormSubmit}
          onClose={handleCloseTestdataForm}
        />
      ) : (
        isShowViewComponent && (
          <TeststepViewComponent
            isLoading={isLoading}
            data={selectedItem}
            projectName={projectName}
            testdata={testdata}
            onOpenTestdataForm={onOpenTestdataForm}
            onEditButtonClick={navigateToEditTeststep}
          />
        )
      )}
    </>
  );
};

TeststepContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default TeststepContainer;
