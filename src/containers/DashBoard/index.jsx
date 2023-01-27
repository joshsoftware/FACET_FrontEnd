import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AddProjectModal,
  DashboardSubHeader,
  ProjectsComponent,
} from "Components/DashboardComponent";
import { DashboardLayout } from "Layout";

import { addProjectRequest, getProjectsRequest } from "store/Projects/actions";

const initialProjectFormData = { name: "", description: "" };

const mapState = ({ user, projects }) => ({
  isLoggedIn: user.isLoggedIn,
  projects: projects.projects,
  isProjectsLoading: projects.isLoading,
  isAbleToAddProject: user.isOrgOwner || user.isAdmin,
});

const DashBoard = () => {
  const dispatch = useDispatch();

  const { isAbleToAddProject, isLoggedIn, isProjectsLoading, projects } =
    useSelector(mapState);

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [addProjectFormData, setAddProjectFormData] = useState(
    initialProjectFormData
  );

  useEffect(() => {
    dispatch(getProjectsRequest());
  }, []);

  // toggles the modal
  const toggleModal = () => {
    setShowAddProjectModal(!showAddProjectModal);
  };

  // handles when project form data changes
  const onChangeProjectFormData = (e) => {
    setAddProjectFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handles submit create project form
  const handleSubmitAddProjectForm = (e) => {
    e.preventDefault();
    dispatch(addProjectRequest(addProjectFormData));
    toggleModal();
    setAddProjectFormData(initialProjectFormData);
  };

  return (
    <DashboardLayout>
      <AddProjectModal
        show={showAddProjectModal}
        handleClose={toggleModal}
        data={addProjectFormData}
        onChange={onChangeProjectFormData}
        onSubmit={handleSubmitAddProjectForm}
      />
      <DashboardSubHeader
        setShowAddProjectModal={toggleModal}
        isAbleToAddProject={isAbleToAddProject}
        isLoggedIn={isLoggedIn}
      />
      <ProjectsComponent data={projects} isLoading={isProjectsLoading} />
    </DashboardLayout>
  );
};

export default DashBoard;
