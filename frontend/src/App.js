import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Header from './components/Header';
import LoginContainer from './containers/LoginContainer';
import SignUpContainer from './containers/SignUpContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<PrivateRoutes />}>

        </Route>
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/signup' element={<SignUpContainer />} />
      </Routes>
    </div>
  );
}

export default App;
