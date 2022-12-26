import React from "react";
import PropTypes from "prop-types";
import noRecordsFound from "../../assets/images/noRecordsFound.png";
import { Button } from "react-bootstrap";

const NoResultsFound = (props) => {
  const { btnOnclick, hideBtn, btnLabel } = props;
  return (
    <div>
      <div className="my-5 text-center">
        <img src={noRecordsFound} alt="No Results Found" />
        <h5>No Results Found!</h5>
        {!hideBtn && (
          <Button
            size="sm"
            variant="success"
            className="mb-2"
            onClick={btnOnclick}
          >
            {btnLabel ? btnLabel : "+ Add New"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoResultsFound;

NoResultsFound.propTypes = {
  btnOnclick: PropTypes.func,
  hideBtn: PropTypes.bool,
  btnLabel: PropTypes.string,
};
