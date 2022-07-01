import React from "react";
import EnvironmentContainer from "./EnvironmentContainer";
import EndpointContainer from "./EndpointContainer";
import ProjectOverviewContainer from "./ProjectOverviewContainer";
import { ProjectLayout } from "../../Layout";
import { Outlet } from "react-router-dom";

const ProjectContainer = () => {
    return (
        <div>
            <ProjectLayout>
                <Outlet />
            </ProjectLayout>
        </div>
    )
}

export {
    EnvironmentContainer,
    EndpointContainer,
    ProjectOverviewContainer,
    ProjectContainer
}