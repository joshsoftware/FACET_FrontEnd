import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AddNewTestsuite from "Components/ProjectsComponent/TestsuiteComponent/AddNewTestsuite";
import {
  addTestsuiteRequest,
  editTestsuiteRequest,
  getTestsuitesRequest,
} from "store/Testsuites/actions";
import { getTestcasesRequest } from "store/Testcases/actions";
import SubComponentsNav from "Components/ProjectsComponent/SubComponentsNav";
import TestsuiteViewComponent from "Components/ProjectsComponent/TestsuiteComponent/TestsuiteViewComponent";

const mapState = ({ testsuites, testcases }) => ({
  isLoading: testsuites.isLoading,
  testsuites: testsuites.testsuites,
  testcases: testcases.testcases,
});

const TestsuiteContainer = ({ cat }) => {
  const { id, projectName } = useParams();
  const { isLoading, testsuites, testcases } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState({ name: "", testcases: [] });
  const [testsuiteFormData, setTestsuiteFormData] = useState({
    project: projectName,
    name: "",
    testcases: [],
    testcasesOptions: [],
  });

  useEffect(() => {
    dispatch(getTestsuitesRequest({ project: projectName }));
    dispatch(getTestcasesRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    setSelectedItem(testsuites.filter((item) => item.id == id)[0]);
  }, [testsuites, id]);

  useEffect(() => {
    let testcasesData = testcases.map((ele) => ({
      value: ele.id,
      label: ele.name,
    }));
    handleOnChangeForm("testcasesOptions", testcasesData);
  }, [testcases]);

  useEffect(() => {
    if (selectedItem) {
      let { name, testcases: selectedTestcases } = selectedItem;
      selectedTestcases = selectedTestcases?.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setTestsuiteFormData((prevState) => ({
        ...prevState,
        name,
        testcases: selectedTestcases,
      }));
    }

    return () =>
      setTestsuiteFormData((prevState) => ({
        ...prevState,
        name: "",
        project: projectName,
        testcases: [],
      }));
  }, [selectedItem]);

  const handleOnChangeForm = (name, value) => {
    setTestsuiteFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitTestsuiteForm = (e) => {
    e.preventDefault();
    // Here FD means FormData
    let {
      project,
      name: testsuiteName,
      testcases: testcasesFD,
    } = testsuiteFormData;

    if (!project || !testsuiteName || testcasesFD.length === 0) {
      toast.error("All Fields Required!!");
      return;
    } else {
      testcasesFD = testcasesFD.map((ele) => ele.value);

      let formPayload = {
        project,
        name: testsuiteName,
        array_of_testcases: testcasesFD,
      };

      switch (cat) {
        case "add":
          dispatch(addTestsuiteRequest(formPayload));
          break;

        case "edit":
          dispatch(editTestsuiteRequest({ ...formPayload, id }));
          break;

        default:
          break;
      }
    }
  };

  return (
    <>
      <SubComponentsNav
        title="Testsuites"
        data={testsuites}
        isLoading={isLoading}
        onAddBtnClick={() => navigate(`/project/${projectName}/testsuites/new`)}
        onSelectItemUrl={`/project/${projectName}/testsuites`}
      />
      {cat ? (
        <AddNewTestsuite
          cat={cat}
          isLoading={isLoading}
          data={testsuiteFormData}
          onChange={handleOnChangeForm}
          onSubmit={handleSubmitTestsuiteForm}
        />
      ) : (
        typeof selectedItem === "object" && (
          <TestsuiteViewComponent
            data={selectedItem}
            projectName={projectName}
          />
        )
      )}
    </>
  );
};

TestsuiteContainer.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
};

export default TestsuiteContainer;
