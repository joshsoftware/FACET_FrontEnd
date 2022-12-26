import React from "react";
import PropTypes from "prop-types";

import { SubNav } from "Components/ProjectsComponent";

const ProjectLayout = ({ children }) => {
  return (
    <div className="d-flex flex-row">
      <SubNav />
      {children}
    </div>
  );
};

export default ProjectLayout;

ProjectLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
