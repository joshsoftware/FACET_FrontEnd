import React from "react";
import { EyeFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import BadgeComponent from "Components/BadgeComponent";
import TableComponent from "Components/CustomComponents/TableComponent";

const outcomeTableHeadings = [
  "#",
  "Field Name",
  "Field Type",
  "Status",
  "Errors",
  "",
];

const TestdataOutcomeTable = ({ data }) => {
  // returns bootstrap class for background color based on status
  const statusColor = (status) => {
    switch (status) {
      case "passed":
        return "success";

      case "failed":
        return "danger";

      default:
        return "warning";
    }
  };

  // returns error message if error comes as string which is not empty
  const errorMessage = (error) => {
    switch (error) {
      case error.length === 0:
        return "-";

      case typeof error === "string":
        return error;

      default:
        return "-";
    }
  };

  return (
    <TableComponent striped bordered headings={outcomeTableHeadings}>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item?.name}</td>
          <td>{item?.type}</td>
          <td>
            <BadgeComponent
              label={item?.status}
              bg={statusColor(item?.status)}
            />
          </td>
          <td>{errorMessage(item.error)}</td>
          <td>
            <EyeFill role="button" className="text-secondary" />
          </td>
        </tr>
      ))}
    </TableComponent>
  );
};

TestdataOutcomeTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TestdataOutcomeTable;
