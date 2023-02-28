import React from "react";
import PropTypes from "prop-types";

import { truncate } from "utils/helper";
import { convertToLocalDate } from "utils/convertToLocalDate";

const ScheduleTableRow = ({
  index,
  testcase,
  testsuite,
  level,
  environment,
  frequency,
  frequencyType,
  createdAt,
  scheduledBy,
  status,
}) => {
  const name = level === "testcase" ? testcase : testsuite;

  return (
    <tr>
      <td>{index + 1}</td>
      <td title={name}>{truncate(name, 20)}</td>
      <td className="text-capitalize">{level}</td>
      <td title={environment}>{truncate(environment, 20)}</td>
      <td className="text-capitalize">
        {frequencyType === "custom"
          ? frequency.days +
            "d:" +
            frequency.hours +
            "h:" +
            frequency.minutes +
            "m"
          : frequencyType}
      </td>
      <td>{convertToLocalDate(createdAt)}</td>
      <td className="text-capitalize">{status}</td>
      <td>{scheduledBy}</td>
    </tr>
  );
};

ScheduleTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  testcase: PropTypes.string.isRequired,
  testsuite: PropTypes.string.isRequired,
  level: PropTypes.oneOf(["testcase", "testsuite"]).isRequired,
  environment: PropTypes.string.isRequired,
  frequency: PropTypes.shape({
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
  }).isRequired,
  frequencyType: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  scheduledBy: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default ScheduleTableRow;
