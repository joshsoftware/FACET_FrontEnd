import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Fallback from "Components/Loader/fallback";
import {
  adminRoutesConfig,
  privateRoutesConfig,
  projectRoutesConfig,
  publicRoutesConfig,
} from "routes/Router";

import { ROOT_ROUTE } from "constants/routeConstants";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const AdminRoutes = lazy(() => import("routes/AdminRoutes"));
const PrivateRoutes = lazy(() => import("routes/PrivateRoutes"));
const ProjectContainer = lazy(() => import("containers/ProjectContainer"));

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Suspense fallback={<Fallback />}>
        <Routes>
          {/* Facet Admin routes */}
          <Route path="/admin" element={<AdminRoutes />}>
            {adminRoutesConfig.map((route) => (
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
          </Route>

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
