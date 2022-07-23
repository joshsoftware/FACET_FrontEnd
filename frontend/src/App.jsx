import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Header from './Components/Header';
import LoginContainer from './containers/LoginContainer';
import SignUpContainer from './containers/SignUpContainer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DashBoard from './containers/DashBoard';
import {
  ProjectOverviewContainer,
  EnvironmentContainer,
  EndpointContainer,
  ProjectContainer,
  HeaderContainer,
  PayloadContainer,
  TestcaseContainer,
  TestsuiteContainer
} from './containers/ProjectContainer';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/project' element={<ProjectContainer />}>
            <Route path='/project/:projectName' element={<ProjectOverviewContainer />} />
            <Route path='/project/:projectName/environments' element={<EnvironmentContainer />} />
            <Route path='/project/:projectName/endpoints' element={<EndpointContainer />} />
            <Route path='/project/:projectName/headers' element={<HeaderContainer />} />
            <Route path='/project/:projectName/payloads' element={<PayloadContainer />} />
            <Route path='/project/:projectName/testcases' element={<TestcaseContainer />} />
            <Route path='/project/:projectName/testsuites' element={<TestsuiteContainer />} />

            <Route path='/project/:projectName/environments/:id' element={<EnvironmentContainer />} />
            <Route path='/project/:projectName/endpoints/:id' element={<EndpointContainer />} />
            <Route path='/project/:projectName/headers/:id' element={<HeaderContainer />} />
            <Route path='/project/:projectName/payloads/:id' element={<PayloadContainer />} />
            <Route path='/project/:projectName/testcases/:id' element={<TestcaseContainer />} />
            <Route path='/project/:projectName/testsuites/:id' element={<TestsuiteContainer />} />

            <Route path='/project/:projectName/environments/new' element={<EnvironmentContainer cat="add" />} />
            <Route path='/project/:projectName/endpoints/new' element={<EndpointContainer cat="add" />} />
            <Route path='/project/:projectName/headers/new' element={<HeaderContainer cat="add" />} />
            <Route path='/project/:projectName/payloads/new' element={<PayloadContainer cat="add" />} />
            <Route path='/project/:projectName/testcases/new' element={<TestcaseContainer cat="add" />} />
            <Route path='/project/:projectName/testsuites/new' element={<TestsuiteContainer cat="add" />} />
          </Route>

        </Route>
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/signup' element={<SignUpContainer />} />
      </Routes>
    </div>
  );
}

export default App;
