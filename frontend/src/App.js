import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Header from './components/Header';
import LoginContainer from './containers/LoginContainer';
import SignUpContainer from './containers/SignUpContainer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DashBoard from './containers/DashBoard';
import {
  ProjectOverviewContainer,
  EnvironmentContainer,
  EndpointContainer
} from './containers/ProjectContainer';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/project/:projectName' element={<ProjectOverviewContainer />} />
          <Route path='/project/:projectName/environments' element={<EnvironmentContainer />} />
          <Route path='/project/:projectName/endpoints' element={<EndpointContainer />} />
          <Route path='/project/:projectName/headers' element={<ProjectOverviewContainer />} />
          <Route path='/project/:projectName/payloads' element={<ProjectOverviewContainer />} />
          <Route path='/project/:projectName/testcases' element={<ProjectOverviewContainer />} />
          <Route path='/project/:projectName/testsuites' element={<ProjectOverviewContainer />} />

          <Route path='/project/:projectName/environments/:id' element={<EnvironmentContainer />} />
          <Route path='/project/:projectName/endpoints/:id' element={<EndpointContainer />} />

          <Route path='/project/:projectName/environments/new' element={<EnvironmentContainer cat="add" />} />
          <Route path='/project/:projectName/endpoints/new' element={<EndpointContainer cat="add" />} />

        </Route>
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/signup' element={<SignUpContainer />} />
      </Routes>
    </div>
  );
}

export default App;
