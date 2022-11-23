import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AddNewTeststep from "Components/ProjectsComponent/TeststepComponents/AddNewTeststep";
import {
  addTestdataRequest,
  downloadExcelRequest,
  getTestdataRequest,
  uploadExcelRequest,
} from "store/Testdata/actions";
import {
  addTeststepsRequest,
  editTeststepsRequest,
  getTeststepsRequest,
} from "store/Teststeps/actions";
import { getEndpointsRequest } from "store/Endpoints/actions";
import { getHeadersRequest } from "store/Headers/actions";
import { getPayloadsRequest } from "store/Payloads/actions";
import { SubComponentsNav } from "Components/ProjectsComponent";
import TeststepViewComponent from "Components/ProjectsComponent/TeststepComponents/TeststepViewComponent";

import {
  INITIAL_TESTSTEP_FORM_DATA,
  INITIAL_TESTDATA_FORM_DATA,
  SELECT_OPTIONS_TESTDATA_FORM,
} from "constants/appConstants";
import { jsonToString, stringToJson } from "utils/convertJson";

const mapState = ({ endpoints, headers, payloads, teststeps, testdata }) => ({
  isLoading: teststeps.isLoading,
  endpoints: endpoints.endpoints,
  headers: headers.headers,
  payloads: payloads.payloads,
  testdata: testdata.testdata,
  teststeps: teststeps.teststeps,
});

const TeststepContainer = (props) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { cat } = props;
  const { projectName, id } = useParams();
  const { endpoints, headers, payloads, teststeps, isLoading, testdata } =
    useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [teststepFormData, setTeststepFormData] = useState({
    ...INITIAL_TESTSTEP_FORM_DATA,
    project: projectName,
  });
  const [testdataFormData, setTestdataFormData] = useState({
    ...INITIAL_TESTDATA_FORM_DATA,
  });
  const [showAddTestdataForm, setShowAddTestdataForm] = useState(false);
  const [options, setOptions] = useState(SELECT_OPTIONS_TESTDATA_FORM);

  useEffect(() => {
    dispatch(getTeststepsRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    // if cat available and changes then makes api calls for required data
    if (cat) {
      dispatch(getEndpointsRequest({ project: projectName }));
      dispatch(getHeadersRequest({ project: projectName }));
      dispatch(getPayloadsRequest({ project: projectName }));
    }
  }, [cat]);

  useEffect(() => {
    setSelectedItem(teststeps.filter((item) => item.id == id)[0] || {});
    dispatch(getTestdataRequest({ teststep: id }));
  }, [teststeps, id]);

  useEffect(() => {
    // set options to react-select format {value: "", label: ""}
    let endpoints_data = [];
    let headers_data = [];
    let payloads_data = [];

    endpoints.forEach((ele) => {
      endpoints_data.push({ value: ele.id, label: ele.name });
    });
    headers.forEach((ele) => {
      headers_data.push({ value: ele.id, label: ele.name });
    });
    payloads.forEach((ele) => {
      payloads_data.push({ value: ele.id, label: ele.name });
    });

    setOptions((prevState) => ({
      ...prevState,
      endpoints: endpoints_data,
      headers: headers_data,
      payloads: payloads_data,
    }));
  }, [endpoints, headers, payloads]);

  const handleFormDataChange = (key, value) => {
    // Accepts key, value
    setTeststepFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleTeststepFormSubmit = (e) => {
    // submit the form
    e.preventDefault();
    if (cat === "add") {
      dispatch(addTeststepsRequest(teststepFormData));
    } else {
      dispatch(editTeststepsRequest(teststepFormData));
    }
  };

  const setInitialTestdata = () => {
    const { id: teststepId, payload } = selectedItem;
    const {
      expected_outcome: initialTDExpOutcome,
      name: initialTDName,
      parameters: initialTDParams,
      payload: initialTDPayload,
      selected_expected_outcome: initialTDSelectedExpOutcome,
      teststep: initialTDId,
    } = INITIAL_TESTDATA_FORM_DATA;

    setTestdataFormData((prevState) => ({
      ...prevState,
      name: initialTDName,
      teststep: teststepId || initialTDId,
      payload: jsonToString(payload?.payload || initialTDPayload),
      parameters: payload?.parameters || initialTDParams,
      expected_outcome: payload?.expected_outcome || initialTDExpOutcome,
      selected_expected_outcome: initialTDSelectedExpOutcome,
    }));
  };

  useEffect(() => {
    // Here ts means teststep
    const {
      endpoint_id,
      header_id,
      id: teststepId,
      method,
      name: tsName,
      payload_id,
    } = selectedItem;
    const {
      endpoint_id: initialTsEndpoint,
      header_id: initialTsHeader,
      id: initialTsId,
      method: initialTsMethod,
      name: initialTsName,
      payload_id: initialTsPayload,
    } = INITIAL_TESTSTEP_FORM_DATA;

    setTeststepFormData((prevState) => ({
      ...prevState,
      name: tsName || initialTsName,
      id: teststepId || initialTsId,
      method: method || initialTsMethod,
      endpoint_id: endpoint_id || initialTsEndpoint,
      header_id: header_id || initialTsHeader,
      payload_id: payload_id || initialTsPayload,
    }));
    setInitialTestdata();
  }, [selectedItem]);

  const toggleAddTestdataForm = () => {
    setShowAddTestdataForm(!showAddTestdataForm);
    setInitialTestdata();
  };

  const handleTestdataFormChange = (key, value) => {
    setTestdataFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleTestdataFormSubmit = (e) => {
    e.preventDefault();
    let submitData = {
      ...testdataFormData,
      payload: stringToJson(testdataFormData.payload),
      expected_outcome: testdataFormData.expected_outcome.find(
        (ele) => ele.name === testdataFormData.selected_expected_outcome
      )?.expected_outcome,
    };
    delete submitData.selected_expected_outcome;
    dispatch(addTestdataRequest(submitData));
    toggleAddTestdataForm();
  };

  const handleDownloadTestdataExcelFile = () => {
    dispatch(
      downloadExcelRequest({ project: projectName, teststep: selectedItem.id })
    );
  };

  const handleUploadTestdataExcelFile = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("project", projectName);
      dispatch(uploadExcelRequest({ formData, teststep: selectedItem?.id }));
    }
  };

  const showViewComponent =
    !isLoading &&
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0;

  const onAddButtonClick = () =>
    navigate(`/project/${projectName}/teststeps/new`);

  return (
    <>
      <SubComponentsNav
        title="Teststeps"
        data={teststeps}
        isLoading={isLoading}
        onAddBtnClick={onAddButtonClick}
        onSelectItemUrl={`/project/${projectName}/teststeps`}
      />
      {cat ? (
        <AddNewTeststep
          cat={cat}
          isLoading={isLoading}
          data={teststepFormData}
          onchange={handleFormDataChange}
          options={options}
          handleSubmit={handleTeststepFormSubmit}
        />
      ) : (
        showViewComponent && (
          <TeststepViewComponent
            data={selectedItem}
            projectName={projectName}
            testdata={testdata}
            showAddTestdataForm={showAddTestdataForm}
            toggleAddTestdataForm={toggleAddTestdataForm}
            testdataFormData={testdataFormData}
            onTestdataFormChange={handleTestdataFormChange}
            onTestdataFormSubmit={handleTestdataFormSubmit}
            onDownloadTestdataExcel={handleDownloadTestdataExcelFile}
            onUploadTestdataExcel={handleUploadTestdataExcelFile}
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
