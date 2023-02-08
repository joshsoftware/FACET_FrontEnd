import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Backdrop from "Components/Backdrop";
import ExecuteComponent from "Components/ProjectsComponent/ExecuteComponent";
import Loader from "Components/Loader";
import { ViewComponent } from "Components/CustomComponents";

import { buildRoute } from "utils/helper";

import { TESTCASE_ROUTE, TESTSUITE_ROUTE } from "constants/routeConstants";

const mapState = ({ execute }) => ({
  results: execute.results,
  data: execute.data,
  isLoading: execute.isLoading,
  isError: execute.isError,
});

const ExecuteContainer = () => {
  const navigate = useNavigate();

  const { projectName, type, id } = useParams();
  const {
    results: { result: resultsList, result_id: reportId },
    data: { name: reportName, fields },
    isLoading,
    isError,
  } = useSelector(mapState);

  // check whether data like reportName and fields are available
  const isInvalidData =
    !isLoading && (isError || !reportName?.length || !fields?.length);

  // if the data coming from testcase or testsuite container is invalid or not present
  // then it will redirect to the previous page
  useEffect(() => {
    if (isInvalidData) {
      const redirectTo =
        type === "testsuite" ? TESTSUITE_ROUTE : TESTCASE_ROUTE;
      const navigateToParentPage = buildRoute(redirectTo, { projectName, id });
      navigate(navigateToParentPage);
    }
  }, [isInvalidData]);

  return (
    <div className="w-100 position-relative">
      {isLoading && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
      <ViewComponent title={reportName} disabledBtns>
        {fields?.map((item, index) => (
          <ExecuteComponent
            key={index}
            results={resultsList}
            reportId={reportId}
            data={item}
            project={projectName}
            isExecute={!isLoading}
          />
        ))}
      </ViewComponent>
    </div>
  );
};

export default ExecuteContainer;
