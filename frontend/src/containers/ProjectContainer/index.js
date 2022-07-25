import React from "react";
import EndpointContainer from "./EndpointContainer";
import EnvironmentContainer from "./EnvironmentContainer";
import HeaderContainer from './HeaderContainer';
import PayloadContainer from './PayloadContainer';
import ProjectOverviewContainer from "./ProjectOverviewContainer";
import TestcaseContainer from './TestcaseContainer';
import TestsuiteContainer from './TestsuiteContainer';
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
    HeaderContainer,
    PayloadContainer,
    ProjectOverviewContainer,
    ProjectContainer,
    TestcaseContainer,
    TestsuiteContainer
}