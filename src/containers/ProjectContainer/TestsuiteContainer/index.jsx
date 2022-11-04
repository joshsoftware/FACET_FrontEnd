import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import SubComponentsNav from "Components/ProjectsComponent/SubComponentsNav";
import { getTestsuitesRequest } from "store/Testsuites/actions";
import TestsuiteViewComponent from "Components/ProjectsComponent/TestsuiteComponent/TestsuiteViewComponent";

const mapState = ({ testsuites }) => ({
  isLoading: testsuites.isLoading,
  testsuites: testsuites.testsuites,
});

const TestsuiteContainer = () => {
  const { id, projectName } = useParams();
  const { isLoading, testsuites } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    dispatch(getTestsuitesRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    setSelectedItem(testsuites.filter((item) => item.id == id)[0]);
  }, [testsuites, id]);

  return (
    <>
      <SubComponentsNav
        title="Testsuites"
        data={testsuites}
        isLoading={isLoading}
        onAddBtnClick={() => navigate(`/project/${projectName}/testsuites/new`)}
        onSelectItemUrl={`/project/${projectName}/testsuites`}
      />
      {typeof selectedItem === "object" && (
        <TestsuiteViewComponent data={selectedItem} projectName={projectName} />
      )}
    </>
  );
};

TestsuiteContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default TestsuiteContainer;
