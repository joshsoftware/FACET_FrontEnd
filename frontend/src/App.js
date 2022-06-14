import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Header from './components/Header';
import LoginContainer from './containers/LoginContainer';
import SignUpContainer from './containers/SignUpContainer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DashBoard from './containers/DashBoard';
import ProjectContainer from './containers/ProjectContainer';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/project/:projectName' element={<ProjectContainer />} />
        </Route>
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/signup' element={<SignUpContainer />} />
      </Routes>
    </div>
  );
}

export default App;
