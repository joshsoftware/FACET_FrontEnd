import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { SubComponentsNav } from "Components/ProjectsComponent";
import {
  AddNewEndpoint,
  EndpointViewComponent,
} from "Components/ProjectsComponent/EndpointComponent";

import {
  addEndpointsRequest,
  editEndpointsRequest,
  getEndpointsRequest,
} from "store/Endpoints/actions";
import { buildRoute } from "utils/helper";

import {
  ADD_ENDPOINT_ROUTE,
  EDIT_ENDPOINT_ROUTE,
  ENDPOINTS_ROUTE,
} from "constants/routeConstants";

const mapState = ({ endpoints }) => ({
  endpoints: endpoints.endpoints,
  isLoading: endpoints.isLoading,
});

const INITIAL_FORM_DATA = {
  name: "",
  endpoint: "",
};

const EndpointContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName, id } = useParams();
  const { endpoints, isLoading } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [endpointFormData, setEndpointFormData] = useState({
    ...INITIAL_FORM_DATA,
    project: projectName,
  });

  useEffect(() => {
    // get all endpoints of project
    dispatch(getEndpointsRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    // set selectedItem
    if (endpoints) {
      setSelectedItem(endpoints.filter((e) => e.id == id)[0]);
    }
  }, [endpoints, id]);

  const onFormDataChange = (e) => {
    const { name, value } = e.target;
    setEndpointFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cat === "add") {
      dispatch(addEndpointsRequest(endpointFormData));
    } else {
      dispatch(editEndpointsRequest(endpointFormData));
    }
  };

  useEffect(() => {
    setEndpointFormData((prevState) => ({
      ...prevState,
      name: selectedItem?.name || "",
      endpoint: selectedItem?.endpoint || "",
      id: selectedItem?.id || INITIAL_FORM_DATA.id,
    }));
  }, [selectedItem]);

  const redirectToEditEndpointForm = () => {
    const editFormRoute = buildRoute(EDIT_ENDPOINT_ROUTE, { projectName, id });
    navigate(editFormRoute);
  };

  const navigateToAddEndpoint = useCallback(() => {
    const addEndpointRoute = buildRoute(ADD_ENDPOINT_ROUTE, {
      projectName,
    });
    navigate(addEndpointRoute);
  }, [projectName]);

  const endpointBaseURL = buildRoute(ENDPOINTS_ROUTE, { projectName });

  // check whether endpoint selected or not, if selected then shows the viewComponent
  const isShowViewComponent =
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0 &&
    !isLoading;

  return (
    <>
      <SubComponentsNav
        title="Endpoints"
        data={endpoints}
        isLoading={isLoading}
        onAddBtnClick={navigateToAddEndpoint}
        componentBaseUrl={endpointBaseURL}
      />
      {cat ? (
        <AddNewEndpoint
          cat={cat}
          isLoading={isLoading}
          data={endpointFormData}
          onchange={onFormDataChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        isShowViewComponent && (
          <EndpointViewComponent
            data={selectedItem}
            projectName={projectName}
            onEditButtonClick={redirectToEditEndpointForm}
          />
        )
      )}
    </>
  );
};

EndpointContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default EndpointContainer;
