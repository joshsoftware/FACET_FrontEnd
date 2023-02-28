import React from "react";
import PropTypes from "prop-types";

import { ViewComponent } from "Components/CustomComponents";
import { AddButton } from "Components/forms/Buttons";
import NoResultsFound from "Components/NoResultsFound";
import TableComponent from "Components/CustomComponents/TableComponent";

import ScheduleTableRow from "./components/ScheduleTableRow";

const tableHeadings = [
  "#",
  "Name",
  "Type",
  "Environment",
  "Frequency",
  "Created on",
  "Status",
  "Scheduled By",
];

const ScheduleViewComponent = ({ data, navigateToScheduleForm }) => {
  const viewComponentRight = (
    <AddButton label="Schedule New" handleClick={navigateToScheduleForm} />
  );

  return (
    <ViewComponent
      title="Schedule Testcases"
      hideBtns
      rightChildrens={viewComponentRight}
    >
      {!data.length ? (
        <NoResultsFound
          btnLabel="Schedule New Testcase/Testsuite"
          btnOnclick={navigateToScheduleForm}
        />
      ) : (
        <TableComponent striped bordered headings={tableHeadings}>
          {data.map(
            (
              {
                level,
                testcase,
                testsuite,
                environment,
                frequency,
                status,
                frequency_type: frequencyType,
                created_at: createdAt,
                scheduled_by: scheduledBy,
              },
              index
            ) => (
              <ScheduleTableRow
                key={index}
                index={index}
                level={level}
                testcase={testcase}
                testsuite={testsuite}
                environment={environment}
                frequency={frequency}
                status={status}
                frequencyType={frequencyType}
                createdAt={createdAt}
                scheduledBy={scheduledBy}
              />
            )
          )}
        </TableComponent>
      )}
    </ViewComponent>
  );
};

ScheduleViewComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  navigateToScheduleForm: PropTypes.func.isRequired,
};

export default ScheduleViewComponent;
