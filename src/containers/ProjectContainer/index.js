import React from "react";
import { Outlet } from "react-router-dom";

import ProjectLayout from "Layout/ProjectLayout";

const ProjectContainer = () => {
  return (
    <div>
      <ProjectLayout>
        <Outlet />
      </ProjectLayout>
    </div>
  );
};

export default ProjectContainer;
