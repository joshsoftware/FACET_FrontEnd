import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import InfiniteScroll from "Components/InfiniteScroll";
import NoResultsFound from "Components/NoResultsFound";
import ReportTableRow from "Components/ProjectsComponent/ReportsComponent/ReportTableRow";
import TableComponent from "Components/CustomComponents/TableComponent";
import { ViewComponent } from "Components/CustomComponents";

import { getReportsRequest } from "store/Reports/actions";

const tableHeadings = [
  "Report Id",
  "Name",
  "Type",
  "Status",
  "Executed By",
  "Executed On",
  "",
];

const mapState = ({ reports }) => ({
  reports: reports.reports,
  page: reports.page,
  totalResults: reports.totalResults,
  isLoading: reports.isReoprtsLoading,
});

const ReportsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectName } = useParams();
  const { isLoading, page, reports, totalResults } = useSelector(mapState);

  useEffect(() => {
    dispatch(getReportsRequest({ project: projectName, page: 1 }));
  }, [projectName]);

  const fetchMoreReports = () => {
    dispatch(getReportsRequest({ project: projectName, page: page + 1 }));
  };

  const onNoResultsButtonClick = () =>
    navigate(`/project/${projectName}/testcases`);

  return (
    <>
      <ViewComponent hideBtns title="Reports">
        {!isLoading && reports.length === 0 ? (
          <NoResultsFound
            btnLabel="Run New Testcase"
            btnOnclick={onNoResultsButtonClick}
          />
        ) : (
          <InfiniteScroll
            dataLength={reports.length}
            next={fetchMoreReports}
            hasMore={reports.length !== totalResults}
          >
            <TableComponent striped bordered headings={tableHeadings}>
              {reports.map((item, index) => (
                <ReportTableRow
                  key={index}
                  data={item}
                  projectName={projectName}
                />
              ))}
            </TableComponent>
          </InfiniteScroll>
        )}
      </ViewComponent>
    </>
  );
};

export default ReportsContainer;
