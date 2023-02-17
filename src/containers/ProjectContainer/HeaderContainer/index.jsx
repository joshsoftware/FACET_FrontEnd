import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import {
  AddNewHeader,
  HeaderViewComponent,
} from "Components/ProjectsComponent/HeaderComponents";
import { SubComponentsNav } from "Components/ProjectsComponent";

import {
  addHeadersRequest,
  editHeadersRequest,
  getHeadersRequest,
} from "store/Headers/actions";
import { buildRoute } from "utils/helper";

import { ADD_HEADER_ROUTE, HEADERS_ROUTE } from "constants/routeConstants";

const mapState = ({ headers }) => ({
  headers: headers.headers,
  isLoading: headers.isLoading,
});

const INITIAL_FORM_DATA = {
  name: "",
  header: {},
};

const HeaderContainer = ({ cat }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName, id } = useParams();
  const { headers, isLoading } = useSelector(mapState);

  const [selectedItem, setSelectedItem] = useState({});
  const [headersFormData, setHeadersFormData] = useState({
    ...INITIAL_FORM_DATA,
    project: projectName,
  });

  useEffect(() => {
    dispatch(getHeadersRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    if (headers) {
      setSelectedItem(headers.filter((e) => e.id == id)[0]);
    }
  }, [headers, id]);

  // if edit formdata is active then set headersFoemData
  useEffect(() => {
    if (cat === "edit" && selectedItem) {
      const { name, header, id: headerId } = selectedItem;
      setHeadersFormData((prevState) => ({
        ...prevState,
        name: name || "",
        header: { ...header },
        id: headerId || INITIAL_FORM_DATA.id,
      }));
    }
    return () =>
      setHeadersFormData({ ...INITIAL_FORM_DATA, project: projectName });
  }, [selectedItem, cat, projectName]);

  const onFormDataChange = (e) => {
    setHeadersFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onKeyValuePairsChange = (result) => {
    setHeadersFormData((prevState) => ({
      ...prevState,
      header: result,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cat === "edit") {
      dispatch(editHeadersRequest(headersFormData));
    } else {
      dispatch(addHeadersRequest(headersFormData));
    }
  };

  const navigateToAddHeader = useCallback(() => {
    const addHeaderRoute = buildRoute(ADD_HEADER_ROUTE, { projectName });
    navigate(addHeaderRoute);
  }, [projectName]);

  const headerBaseURL = buildRoute(HEADERS_ROUTE, { projectName });

  return (
    <>
      <SubComponentsNav
        title="Headers"
        data={headers}
        isLoading={isLoading}
        onAddBtnClick={navigateToAddHeader}
        componentBaseUrl={headerBaseURL}
      />
      {cat ? (
        <AddNewHeader
          cat={cat}
          isLoading={isLoading}
          data={headersFormData}
          onchange={onFormDataChange}
          onKeyValuePairsChange={onKeyValuePairsChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <HeaderViewComponent
          isLoading={isLoading}
          data={selectedItem}
          projectName={projectName}
        />
      )}
    </>
  );
};

HeaderContainer.propTypes = {
  cat: PropTypes.string,
};

export default HeaderContainer;
