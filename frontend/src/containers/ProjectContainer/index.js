import React from "react";
import EndpointContainer from "./EndpointContainer";
import EnvironmentContainer from "./EnvironmentContainer";
import ExecuteContainer from "./ExecuteContainer";
import HeaderContainer from './HeaderContainer';
import MemberContainer from "./MemberContainer";
import PayloadContainer from './PayloadContainer';
import ProjectOverviewContainer from "./ProjectOverviewContainer";
import ReportsContainer from "./ReportsContainer";
import ScheduleContainer from "./ScheduleContainer";
import SettingsContainer from './SettingsContainer';
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
    ExecuteContainer,
    HeaderContainer,
    MemberContainer,
    PayloadContainer,
    ProjectOverviewContainer,
    ProjectContainer,
    ReportsContainer,
    ScheduleContainer,
    SettingsContainer,
    TestcaseContainer,
    TestsuiteContainer
}