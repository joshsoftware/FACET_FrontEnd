import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import {
  AddNewPayload,
  PayloadViewComponent,
} from "Components/ProjectsComponent/PayloadComponents";
import { SubComponentsNav } from "Components/ProjectsComponent";

import {
  addPayloadsRequest,
  editPayloadsRequest,
  getPayloadsRequest,
  resetPayloadSuccessAction,
} from "store/Payloads/actions";
import {
  convertArrayToObject,
  convertToKeyValuePairsArray,
} from "utils/helpers/keyValuePairs";
import { buildRoute } from "utils/helper";

import { INITIAL_PAYLOAD_FORM_DATA } from "constants/appConstants";
import {
  ADD_PAYLOAD_ROUTE,
  EDIT_PAYLOAD_ROUTE,
  PAYLOADS_ROUTE,
} from "constants/routeConstants";

const mapState = ({ payloads }) => ({
  payloads: payloads.payloads,
  isLoading: payloads.isLoading,
  isSuccess: payloads.isSuccess,
});

const PayloadContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName, id } = useParams();
  const { payloads, isLoading, isSuccess } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [payloadsFormData, setPayloadsFormData] = useState({
    ...INITIAL_PAYLOAD_FORM_DATA,
    project: projectName,
  });

  useEffect(() => {
    dispatch(getPayloadsRequest({ project: projectName }));
  }, [projectName]);

  // If the isSuccess flag is true then clear isSuccess flag and re-request payloads
  useEffect(() => {
    if (isSuccess) {
      dispatch(getPayloadsRequest({ project: projectName }));
    }
    return () => resetPayloadSuccessAction();
  }, [isSuccess, projectName]);

  // sets selected Item from payloads when id presents
  useEffect(() => {
    if (payloads && id) {
      setSelectedItem(payloads.filter((payload) => payload.id == id)[0] ?? {});
    }
    return () => setSelectedItem({});
  }, [payloads, id]);

  // If selected payload is valid then sets payload formData
  useEffect(() => {
    const isValidPayload =
      typeof selectedItem === "object" &&
      !Array.isArray(selectedItem) &&
      selectedItem !== null &&
      Object.entries(selectedItem).length;

    if (isValidPayload) {
      let {
        name,
        parameters,
        payload,
        expected_outcome: expectedOutcome,
        id,
      } = selectedItem;

      id = id ?? "";
      name = name ?? INITIAL_PAYLOAD_FORM_DATA.name;
      parameters = convertToKeyValuePairsArray(parameters);
      payload = JSON.stringify(payload) ?? INITIAL_PAYLOAD_FORM_DATA.payload;
      expectedOutcome =
        expectedOutcome ?? INITIAL_PAYLOAD_FORM_DATA.expectedOutcome;

      setPayloadsFormData((prevState) => ({
        ...prevState,
        id,
        name,
        parameters,
        payload,
        expectedOutcome,
      }));
    }

    return () => setPayloadsFormData({ ...INITIAL_PAYLOAD_FORM_DATA });
  }, [selectedItem]);

  const onPayloadFormDataChange = (key, value) => {
    // Accepts key and value of formData
    setPayloadsFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // handles the submit payload form event
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, id, payload, parameters, expectedOutcome } = payloadsFormData;
    const formDataToSubmit = {
      name,
      project: projectName,
      payload: JSON.parse(payload),
      parameters: convertArrayToObject(parameters),
      expected_outcome: expectedOutcome,
    };
    if (cat === "add") {
      dispatch(addPayloadsRequest(formDataToSubmit));
    } else if (cat === "edit") {
      dispatch(editPayloadsRequest({ ...formDataToSubmit, id }));
    }
  };

  const redirectToEditEndpointForm = useCallback(() => {
    const editFormRoute = buildRoute(EDIT_PAYLOAD_ROUTE, { projectName, id });
    navigate(editFormRoute);
  }, [projectName, id]);

  const navigateToAddPayload = useCallback(() => {
    const addPayloadRoute = buildRoute(ADD_PAYLOAD_ROUTE, { projectName });
    navigate(addPayloadRoute);
  }, [projectName]);

  const payloadBaseURL = buildRoute(PAYLOADS_ROUTE, { projectName });

  // check whether payload selected or not, if selected then shows the viewComponent
  const isShowViewComponent =
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0 &&
    !isLoading;

  return (
    <>
      <SubComponentsNav
        title="Payloads"
        data={payloads}
        isLoading={isLoading}
        onAddBtnClick={navigateToAddPayload}
        componentBaseUrl={payloadBaseURL}
      />
      {cat ? (
        <AddNewPayload
          cat={cat}
          isLoading={isLoading}
          data={payloadsFormData}
          onChange={onPayloadFormDataChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        isShowViewComponent && (
          <PayloadViewComponent
            data={selectedItem}
            onEditButtonClick={redirectToEditEndpointForm}
          />
        )
      )}
    </>
  );
};

PayloadContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default PayloadContainer;
