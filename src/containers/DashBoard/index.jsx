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
  currentUser: user.currentUser,
  isLoggedIn: user.isLoggedIn,
  projects: projects.projects,
  isProjectsLoading: projects.isLoading,
});

const DashBoard = () => {
  let dispatch = useDispatch();
  const { currentUser, isLoggedIn, isProjectsLoading, projects } =
    useSelector(mapState);

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [addProjectFormData, setAddProjectFormData] = useState(
    initialProjectFormData
  );

  const toggleModal = () => {
    setShowAddProjectModal(!showAddProjectModal);
  };

  const onChangeProjectFormData = (e) => {
    setAddProjectFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitAddProjectForm = (e) => {
    e.preventDefault();
    dispatch(addProjectRequest(addProjectFormData));
    toggleModal();
    setAddProjectFormData(initialProjectFormData);
  };

  useEffect(() => {
    dispatch(getProjectsRequest());
  }, []);

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
        user={currentUser}
        isLoggedIn={isLoggedIn}
      />
      <ProjectsComponent data={projects} isLoading={isProjectsLoading} />
    </DashboardLayout>
  );
};

export default DashBoard;
