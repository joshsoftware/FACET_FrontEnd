import React, { useEffect, useMemo, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

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

  // handles change search query input field
  const onChangeSearchQuery = (e) =>
    setSearchQuery(e.target.value?.toLowerCase());

  // filters projects on basis of searchQuery
  const filteredProjects = useMemo(
    () =>
      searchQuery
        ? projects.filter((project) => project.name?.includes(searchQuery))
        : projects,
    [searchQuery, projects]
  );

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
        onChangeSearchQuery={onChangeSearchQuery}
        searchQuery={searchQuery}
        isAbleToAddProject={isAbleToAddProject}
        isLoggedIn={isLoggedIn}
      />
      <ProjectsComponent
        data={filteredProjects}
        searchQuery={searchQuery}
        onAddProjectModalOpens={toggleModal}
        isLoading={isProjectsLoading}
        isAbleToAddProject={isAbleToAddProject}
      />
    </DashboardLayout>
  );
};

export default DashBoard;
