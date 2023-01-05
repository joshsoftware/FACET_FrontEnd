import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Fallback from "Components/Loader/fallback";
import {
  privateRoutesConfig,
  projectRoutesConfig,
  publicRoutesConfig,
} from "Router";

import { ORG_OVERVIEW_ROUTE, ROOT_ROUTE } from "constants/routeConstants";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const Organization = lazy(() =>
  import("containers/OrganizationContainer/Organizations")
);
const PrivateRoutes = lazy(() => import("./PrivateRoutes"));
const ProjectContainer = lazy(() => import("containers/ProjectContainer"));

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Suspense fallback={<Fallback />}>
        <Routes>
          {/* authenticated routes */}
          <Route path="/" element={<PrivateRoutes />}>
            {privateRoutesConfig.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <Suspense fallback={<Fallback />}>
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
                    <Suspense fallback={<Fallback />}>
                      <route.component {...route.props} />
                    </Suspense>
                  }
                />
              ))}
            </Route>
            {/* Organization Routes */}
            <Route path={ORG_OVERVIEW_ROUTE} element={<Organization />} />
            <Route path="*" element={<Navigate to={ROOT_ROUTE} replace />} />
          </Route>

          {/* public routes */}
          {publicRoutesConfig.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
