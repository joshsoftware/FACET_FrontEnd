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
} from "store/Payloads/actions";
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
});

const PayloadContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName, id } = useParams();
  const { payloads, isLoading } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [payloadsFormData, setPayloadsFormData] = useState({
    ...INITIAL_PAYLOAD_FORM_DATA,
    project: projectName,
  });

  useEffect(() => {
    dispatch(getPayloadsRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    if (payloads) {
      setSelectedItem(payloads.filter((e) => e.id == id)[0]);
    }
  }, [payloads, id]);

  const onPayloadFormDataChange = (key, value) => {
    // Accepts key and value of formData
    setPayloadsFormData((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cat === "add") {
      dispatch(
        addPayloadsRequest({
          ...payloadsFormData,
          payload: JSON.parse(payloadsFormData.payload),
        })
      );
    } else if (cat === "edit") {
      dispatch(
        editPayloadsRequest({
          ...payloadsFormData,
          parameters: payloadsFormData.parameters,
          payload: JSON.parse(payloadsFormData.payload),
        })
      );
    }
  };

  useEffect(() => {
    setPayloadsFormData((p) => ({
      ...p,
      name: selectedItem?.name || INITIAL_PAYLOAD_FORM_DATA.name,
      parameters:
        selectedItem?.parameters || INITIAL_PAYLOAD_FORM_DATA.parameters,
      payload:
        JSON.stringify(selectedItem?.payload) ||
        INITIAL_PAYLOAD_FORM_DATA.payload,
      expected_outcome:
        selectedItem?.expected_outcome ||
        INITIAL_PAYLOAD_FORM_DATA.expected_outcome,
      id: selectedItem?.id || INITIAL_PAYLOAD_FORM_DATA.id,
    }));
  }, [selectedItem]);

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
