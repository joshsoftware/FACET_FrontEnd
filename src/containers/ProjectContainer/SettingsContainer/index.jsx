import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  ChangeProjectNameBox,
  DeleteProjectBox,
} from "Components/ProjectsComponent/SettingsComponent";
import Loader from "Components/Loader";

import {
  deleteProjectRequest,
  getProjectRequest,
  updateProjectNameRequest,
} from "store/Projects/actions";
import { ConvertToSlug } from "utils";

const mapState = ({ user, projects }) => ({
  user: user.currentUser,
  currentProject: projects.project,
  isLoading: projects.isLoading,
  isSuccess: projects.isSuccess,
});

const SettingsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectName } = useParams();
  const { user, currentProject, isLoading, isSuccess } = useSelector(mapState);

  const [changeNameFormData, setChangeNameFormData] = useState({
    project: "",
    newProjName: "",
  });

  useEffect(() => {
    if (projectName) {
      dispatch(getProjectRequest({ project: projectName }));
    }
  }, [projectName]);

  useEffect(() => {
    if (currentProject.name) {
      setChangeNameFormData((prevState) => ({
        ...prevState,
        project: currentProject.name,
        newProjName: currentProject.name,
      }));
    }
  }, [currentProject]);

  const onChangeName = (e) => {
    setChangeNameFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitChangeNameForm = (e) => {
    e.preventDefault();
    dispatch(
      updateProjectNameRequest({
        ...changeNameFormData,
        newProjName: ConvertToSlug(changeNameFormData.newProjName),
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteProjectRequest({ project: projectName }));
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isSuccess && changeNameFormData.newProjName.length !== 0) {
      navigate(`/project/${changeNameFormData.newProjName}/settings`);
    }
  }, [isSuccess]);

  return (
    <div className="px-5 py-4 w-100">
      <div className={`py-3 d-flex justify-content-between`}>
        <div>
          <div className="text-primary">
            <span
              className="d-flex align-items-center"
              style={{ cursor: "pointer", width: "fit-content" }}
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              Back
            </span>
          </div>
          <h2>Settings</h2>
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <>
          <ChangeProjectNameBox
            user={user}
            project={currentProject}
            formData={changeNameFormData}
            onChange={onChangeName}
            handleSubmit={handleSubmitChangeNameForm}
          />
          <DeleteProjectBox
            project={currentProject}
            handleDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default SettingsContainer;
