import React from "react";
import PropTypes from "prop-types";

import BadgeComponent from "Components/BadgeComponent";

// returns the pass fail badge component which will reuse with same code and diffrent values
const PassFailBadges = ({ passFields, failFields }) => (
  <>
    <BadgeComponent
      bg="success"
      label={`${passFields} Pass`}
      className="mx-1"
    />
    <BadgeComponent bg="danger" label={`${failFields} Fail`} />
  </>
);

PassFailBadges.propTypes = {
  passFields: PropTypes.number.isRequired,
  failFields: PropTypes.number.isRequired,
};

export default PassFailBadges;
