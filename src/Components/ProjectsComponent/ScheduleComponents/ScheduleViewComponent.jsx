import React from "react";
import PropTypes from "prop-types";

import { ViewComponent } from "Components/CustomComponents";
import { AddButton } from "Components/forms/Buttons";
import NoResultsFound from "Components/NoResultsFound";
import TableComponent from "Components/CustomComponents/TableComponent/index";

const ScheduleViewComponent = (props) => {
  const { data, isLoading, onNavigate } = props;

  const AddNew = () => {
    onNavigate("new");
  };

  return (
    !isLoading && (
      <ViewComponent
        title="Schedule Testcases"
        disabledBtns
        rightChildrens={
          <AddButton label="Schedule Testcase" handleClick={AddNew} />
        }
      >
        {data.length === 0 ? (
          <NoResultsFound
            btnLabel="Schedule New Testcase"
            btnOnclick={AddNew}
          />
        ) : (
          <TableComponent
            striped
            bordered
            headings={[
              "#",
              "Testcase",
              "Environment",
              "Frequency",
              "Created on",
              "Status",
              "Scheduled By",
            ]}
          >
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.testcase}</td>
                  <td>{item.environment}</td>
                  <td className="text-capitalize">
                    {item.frequency_type === "custom"
                      ? item.frequency.days +
                        "d:" +
                        item.frequency.hours +
                        "h:" +
                        item.frequency.minutes +
                        "m"
                      : item.frequency_type}
                  </td>
                  <td>{item.created_at}</td>
                  <td className="text-capitalize">{item.status}</td>
                  <td>{item.scheduled_by}</td>
                </tr>
              );
            })}
          </TableComponent>
        )}
      </ViewComponent>
    )
  );
};

export default ScheduleViewComponent;

ScheduleViewComponent.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  onNavigate: PropTypes.func,
};
