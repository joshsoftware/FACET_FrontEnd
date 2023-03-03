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
import {
  convertArrayToObject,
  convertToKeyValuePairsArray,
  isSameKeyExist,
} from "utils/helpers/keyValuePairs";
import { buildRoute } from "utils/helper";
import { toastMessage } from "utils/toastMessage";

import {
  ADD_HEADER_ROUTE,
  EDIT_HEADER_ROUTE,
  HEADERS_ROUTE,
} from "constants/routeConstants";
import { HEADERS_DUPLICATE_KEY_ERROR } from "constants/userMessagesConstants";

const mapState = ({ headers }) => ({
  headers: headers.headers,
  isLoading: headers.isLoading,
});

const INITIAL_FORM_DATA = {
  name: "",
  header: [{ key: "", value: "" }],
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
      const headerData = convertToKeyValuePairsArray(header);
      setHeadersFormData((prevState) => ({
        ...prevState,
        name: name || "",
        header: headerData,
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
    const { header, ...restHeadersData } = headersFormData;
    // if multiple headers with same key exists then show toast error
    if (isSameKeyExist(header)) {
      toastMessage(HEADERS_DUPLICATE_KEY_ERROR, "error");
      return;
    }
    const headersData = {
      ...restHeadersData,
      header: convertArrayToObject(header),
    };
    if (cat === "edit") {
      dispatch(editHeadersRequest(headersData));
    } else {
      dispatch(addHeadersRequest(headersData));
    }
  };

  const redirectToEditHeaderForm = useCallback(() => {
    const editFormRoute = buildRoute(EDIT_HEADER_ROUTE, { projectName, id });
    navigate(editFormRoute);
  }, [projectName, id]);

  const navigateToAddHeader = useCallback(() => {
    const addHeaderRoute = buildRoute(ADD_HEADER_ROUTE, { projectName });
    navigate(addHeaderRoute);
  }, [projectName]);

  const headerBaseURL = buildRoute(HEADERS_ROUTE, { projectName });

  // check whether header selected or not, if selected then shows the viewComponent
  const isShowViewComponent =
    typeof selectedItem === "object" &&
    Object.entries(selectedItem).length !== 0 &&
    !isLoading;

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
          onChange={onFormDataChange}
          onKeyValuePairsChange={onKeyValuePairsChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        isShowViewComponent && (
          <HeaderViewComponent
            data={selectedItem}
            onEditButtonClick={redirectToEditHeaderForm}
          />
        )
      )}
    </>
  );
};

HeaderContainer.propTypes = {
  cat: PropTypes.string,
};

export default HeaderContainer;
