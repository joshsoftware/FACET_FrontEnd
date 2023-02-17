import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import {
  AddNewEnvironment,
  EnvironmentViewComponent,
} from "Components/ProjectsComponent/EnvironmentComponents";
import { SubComponentsNav } from "Components/ProjectsComponent";

import {
  addEnvironmentsRequest,
  editEnvironmentsRequest,
  getEnvironmentsRequest,
} from "store/Environments/actions";
import { buildRoute } from "utils/helper";

import {
  ADD_ENVIRONMENT_ROUTE,
  ENVIRONMENTS_ROUTE,
} from "constants/routeConstants";

const mapState = ({ environments }) => ({
  environments: environments.environments,
  isLoading: environments.isLoading,
});

const INITIAL_FORM_DATA = {
  name: "",
  url: "",
};

const EnvironmentContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName, id } = useParams();
  const { environments, isLoading } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [envFormData, setEnvFormData] = useState({
    ...INITIAL_FORM_DATA,
    project: projectName,
  });

  useEffect(() => {
    // get all environments
    dispatch(getEnvironmentsRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    // set selectedItem
    if (environments) {
      setSelectedItem(environments.filter((e) => e.id == id)[0]);
    }
  }, [environments, id]);

  const onFormDataChange = (e) => {
    setEnvFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cat === "edit") {
      dispatch(editEnvironmentsRequest(envFormData));
    } else {
      dispatch(addEnvironmentsRequest(envFormData));
    }
  };

  useEffect(() => {
    setEnvFormData((p) => ({
      ...p,
      name: selectedItem?.name || "",
      url: selectedItem?.url || "",
      id: selectedItem?.id || INITIAL_FORM_DATA.id,
    }));
  }, [selectedItem]);

  const navigateToAddEnvironment = useCallback(() => {
    const addEnvironmentRoute = buildRoute(ADD_ENVIRONMENT_ROUTE, {
      projectName,
    });
    navigate(addEnvironmentRoute);
  }, [projectName]);

  const environmentBaseURL = buildRoute(ENVIRONMENTS_ROUTE, { projectName });

  return (
    <>
      <SubComponentsNav
        title="Environments"
        data={environments}
        isLoading={isLoading}
        onAddBtnClick={navigateToAddEnvironment}
        componentBaseUrl={environmentBaseURL}
      />
      {cat ? (
        <AddNewEnvironment
          cat={cat}
          isLoading={isLoading}
          data={envFormData}
          onchange={onFormDataChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <EnvironmentViewComponent
          isLoading={isLoading}
          data={selectedItem}
          projectName={projectName}
        />
      )}
    </>
  );
};

EnvironmentContainer.propTypes = {
  cat: PropTypes.string,
};

export default EnvironmentContainer;
