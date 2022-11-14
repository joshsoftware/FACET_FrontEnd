import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ExecuteComponent from "Components/ProjectsComponent/ExecuteComponent";
import { ViewComponent } from "Components/CustomComponents";

const mapState = ({ execute }) => ({
  results: execute.results,
  data: execute.data,
  isLoading: execute.isLoading,
  isError: execute.isError,
});

const ExecuteContainer = () => {
  const { projectName, id } = useParams();
  const {
    results: { result: resultsList, result_id: reportId },
    data: { name: reportName, fields },
    isLoading,
    isError,
  } = useSelector(mapState);
  console.log(reportId);
  

  const isReport =
    !isLoading && (isError || !reportName?.length || !fields?.length);

  return isReport ? (
    <Navigate to={`/project/${projectName}/testcases/${id}`} />
  ) : (
    <div className="w-100">
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
