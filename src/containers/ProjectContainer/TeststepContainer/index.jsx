import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import AddNewTeststep from "Components/ProjectsComponent/TeststepComponents/AddNewTeststep";
import SubComponentsNav from "Components/ProjectsComponent/SubComponentsNav";
import TeststepViewComponent from "Components/ProjectsComponent/TeststepComponents/TeststepViewComponent";

import { addTestdataRequest, getTestdataRequest } from "store/Testdata/actions";
import {
  addTeststepsRequest,
  editTeststepsRequest,
  getTeststepsRequest,
} from "store/Teststeps/actions";
import { getEndpointsRequest } from "store/Endpoints/actions";
import { getHeadersRequest } from "store/Headers/actions";
import { getPayloadsRequest } from "store/Payloads/actions";
import { toastMessage } from "utils/toastMessage";

import {
  INITIAL_TESTSTEP_FORM_DATA,
  INITIAL_TESTDATA_FORM_DATA,
  HTTP_METHODS_OPTIONS,
} from "constants/appConstants";
import { ALL_FIELDS_REQUIRED } from "constants/userMessagesConstants";

const mapState = ({ endpoints, headers, payloads, teststeps, testdata }) => ({
  isLoading: teststeps.isLoading,
  teststeps: teststeps.teststeps,
  testdata: testdata.testdata,
  endpointOptions: endpoints.endpoints.map((ele) => ({
    label: ele.name,
    value: ele.id,
  })),
  headerOptions: headers.headers.map((ele) => ({
    label: ele.name,
    value: ele.id,
  })),
  payloadOptions: payloads.payloads.map((ele) => ({
    label: ele.name,
    value: ele.id,
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
  } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [teststepFormData, setTeststepFormData] = useState(
    INITIAL_TESTSTEP_FORM_DATA
  );
  const [testdataFormData, setTestdataFormData] = useState(
    INITIAL_TESTDATA_FORM_DATA
  );
  const [showAddTestdataForm, setShowAddTestdataForm] = useState(false);

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
  }, [cat, projectName]);

  // set selected teststep item data
  useEffect(() => {
    if (id) {
      setSelectedItem(teststeps.filter((ele) => ele.id == id)[0] || {});
      dispatch(getTestdataRequest({ teststep: id }));
    }
    return () => setSelectedItem({});
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

  // sets testdata form data when testdata forms active
  useEffect(() => {
    if (showAddTestdataForm && selectedItem) {
      const { id: teststepId, payload } = selectedItem;
      const {
        teststep: initialTDId,
        name: initialTDName,
        parameters: initialTDParams,
        payload: initialTDPayload,
        expectedOutcome: initialTDExpOutcome,
        selectedExpOutcome: initialTDSelectedExpOutcome,
      } = INITIAL_TESTDATA_FORM_DATA;

      setTestdataFormData((prevState) => ({
        ...prevState,
        name: initialTDName,
        teststep: teststepId || initialTDId,
        payload: JSON.stringify(payload?.payload || initialTDPayload),
        parameters: payload?.parameters || initialTDParams,
        expectedOutcome: payload?.expected_outcome || initialTDExpOutcome,
        selectedExpOutcome: initialTDSelectedExpOutcome,
      }));
    }
    return () => setTestdataFormData(INITIAL_TESTDATA_FORM_DATA);
  }, [showAddTestdataForm]);

  // toggle testdata form visibility
  const toggleAddTestdataForm = () =>
    setShowAddTestdataForm(!showAddTestdataForm);

  // handles testdataFormData changes
  const handleTestdataFormChange = (key, value) => {
    setTestdataFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  // handle testdata form submit action: validates all fields then dispatch action
  const handleTestdataFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const {
        name,
        teststep,
        parameters,
        payload,
        expectedOutcome,
        selectedExpOutcome,
      } = testdataFormData;

      const expected_outcome = expectedOutcome.find(
        (ele) => ele.id === selectedExpOutcome?.value
      )?.expected_outcome;

      if (!name || !teststep || !JSON.parse(payload) || !expected_outcome) {
        toastMessage(ALL_FIELDS_REQUIRED, "error");
      } else {
        dispatch(
          addTestdataRequest({
            name,
            teststep,
            parameters,
            payload: JSON.parse(payload),
            expected_outcome,
          })
        );
        toggleAddTestdataForm();
      }
    },
    [testdataFormData]
  );

  const showViewComponent =
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0 &&
    !isLoading;

  return (
    <>
      <SubComponentsNav
        title="Teststeps"
        data={teststeps}
        isLoading={isLoading}
        onAddBtnClick={() => navigate(`/project/${projectName}/teststeps/new`)}
        onSelectItemUrl={`/project/${projectName}/teststeps`}
      />
      {cat ? (
        <AddNewTeststep
          cat={cat}
          data={teststepFormData}
          onChange={handleFormDataChange}
          endpointOptions={endpointOptions}
          headerOptions={headerOptions}
          payloadOptions={payloadOptions}
          methodOptions={HTTP_METHODS_OPTIONS}
          onSubmit={handleTeststepFormSubmit}
        />
      ) : (
        showViewComponent && (
          <TeststepViewComponent
            isLoading={isLoading}
            data={selectedItem}
            projectName={projectName}
            testdata={testdata}
            showAddTestdataForm={showAddTestdataForm}
            toggleAddTestdataForm={toggleAddTestdataForm}
            testdataFormData={testdataFormData}
            onTestdataFormChange={handleTestdataFormChange}
            onTestdataFormSubmit={handleTestdataFormSubmit}
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
