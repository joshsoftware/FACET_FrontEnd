import React from "react";
import EndpointContainer from "./EndpointContainer";
import EnvironmentContainer from "./EnvironmentContainer";
import HeaderContainer from './HeaderContainer';
import PayloadContainer from './PayloadContainer';
import ProjectOverviewContainer from "./ProjectOverviewContainer";
import ReportsContainer from "./ReportsContainer";
import SettingsContainer from "./SettingsContainer";
import TestcaseContainer from './TestcaseContainer';
import TestsuiteContainer from './TestsuiteContainer';
import ExecuteContainer from "./ExecuteContainer";
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
    ExecuteContainer,
    HeaderContainer,
    PayloadContainer,
    ProjectOverviewContainer,
    ProjectContainer,
    ReportsContainer,
    SettingsContainer,
    TestcaseContainer,
    TestsuiteContainer
}