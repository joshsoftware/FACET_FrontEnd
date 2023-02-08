import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { AddButton } from "Components/forms/Buttons";
import ProjectBox from "./ProjectBox";
import ProjectBoxSkeleton from "./ProjectBoxSkeleton";

import NotFound from "assets/images/notFound.svg";

import "./style.css";

const ProjectsComponent = ({
  data,
  isLoading,
  isAbleToAddProject,
  searchQuery,
  onAddProjectModalOpens,
}) => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  const noProjectFoundSubtitle = searchQuery ? (
    <>
      No projects found for your search <b>&quot;{searchQuery}&quot;</b>
    </>
  ) : isAbleToAddProject ? (
    "You haven't created any projects, create one"
  ) : (
    "You are not assigned to any project"
  );

  return (
    <div
      className={`${
        data.length === 0 && !isLoading ? "w-100" : "project-container"
      } py-4`}
    >
      {isLoading ? (
        <>
          <ProjectBoxSkeleton />
          <ProjectBoxSkeleton />
          <ProjectBoxSkeleton />
          <ProjectBoxSkeleton />
        </>
      ) : data.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img src={NotFound} className="not-found-icon" />
            <h4>No Projects Found!</h4>
            <p className="mb-1">{noProjectFoundSubtitle}</p>
            {isAbleToAddProject && (
              <AddButton
                size="sm"
                className="mt-0"
                label="Add New Project"
                handleClick={onAddProjectModalOpens}
              />
            )}
          </div>
        </div>
      ) : (
        data.map((item, index) => {
          return (
            <ProjectBox
              key={index}
              data={item}
              onClick={() => onNavigate(`/project/${item.name}`)}
            />
          );
        })
      )}
    </div>
  );
};

ProjectsComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string,
  isLoading: PropTypes.bool,
  isAbleToAddProject: PropTypes.bool,
  onAddProjectModalOpens: PropTypes.func.isRequired,
};

export default ProjectsComponent;
