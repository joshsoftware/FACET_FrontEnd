import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  privateRoutesConfig,
  projectRoutesConfig,
  publicRoutesConfig,
} from "Router";

import { ROOT_ROUTE } from "constants/routeConstants";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoutes = lazy(() => import("./PrivateRoutes"));
const ProjectContainer = lazy(() => import("containers/ProjectContainer"));

function App() {
  return (
    <div className="App">
      <ToastContainer />
      {/* TO-Do
        Fallback loader component to be add
      */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* authenticated routes */}
          <Route path="/" element={<PrivateRoutes />}>
            {privateRoutesConfig.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <route.component />
                  </Suspense>
                }
              />
            ))}
            {/* project Routes */}
            <Route path="/project" element={<ProjectContainer />}>
              {projectRoutesConfig.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <route.component {...route.props} />
                    </Suspense>
                  }
                />
              ))}
            </Route>
            <Route path="*" element={<Navigate to={ROOT_ROUTE} replace />} />
          </Route>

          {/* public routes */}
          {publicRoutesConfig.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <route.component />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
