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

const TestdataOutcomeTable = ({ data, onOpenOutcomeModal }) => {
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

  const onOutcomeFieldClick = () => {
    onOpenOutcomeModal();
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
            <EyeFill
              role="button"
              className="text-secondary"
              onClick={onOutcomeFieldClick}
            />
          </td>
        </tr>
      ))}
    </TableComponent>
  );
};

TestdataOutcomeTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      error: PropTypes.string,
      executed_status: PropTypes.oneOf(["passed", "failed"]).isRequired,
      isExact: PropTypes.bool,
      name: PropTypes.string.isRequired,
      res_value: PropTypes.any,
      status: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.any,
    })
  ).isRequired,
  onOpenOutcomeModal: PropTypes.func.isRequired,
};

export default TestdataOutcomeTable;
