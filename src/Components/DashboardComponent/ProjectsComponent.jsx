import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import ProjectBox from "./ProjectBox";
import ProjectBoxSkeleton from "./ProjectBoxSkeleton";
import NotFound from "../../assets/images/notFound.svg";
import "./style.css";

const ProjectsComponent = (props) => {
  const { data, isLoading } = props;
  let navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

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
            <p>You are not assigned to any project.</p>
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

export default ProjectsComponent;

ProjectsComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};
