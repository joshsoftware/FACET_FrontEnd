import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import FormSelect from "Components/forms/Inputs/FormSelect";
import Loader from "Components/Loader";
import { ViewComponent } from "Components/CustomComponents";

const ExecuteForm = ({
  label,
  data,
  environments,
  isEnvsLoading,
  handleExecute,
}) => {
  const [selectedEnv, setSelectedEnv] = useState(null);

  // set selected environment's value
  const handleEnvChange = (value) => setSelectedEnv(value);

  // helps to call execute action function by passing id and env as parameters
  const onExecute = () => handleExecute(data?.id, selectedEnv.value);

  return (
    <ViewComponent hideHeader>
      <small>
        <b>Execute {label}</b>
      </small>
      {isEnvsLoading ? (
        <Loader />
      ) : (
        <div className="d-flex align-items-center">
          <Col md={6}>
            <FormSelect
              placeholder="Select Environment..."
              options={environments}
              value={selectedEnv}
              onChange={handleEnvChange}
              isLoading={isEnvsLoading}
              isDisabled={isEnvsLoading}
            />
          </Col>
          <Button
            variant="success"
            onClick={onExecute}
            className="mx-2 mb-3"
            disabled={!selectedEnv}
          >
            Execute
          </Button>
        </div>
      )}
    </ViewComponent>
  );
};

ExecuteForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  environments: PropTypes.array.isRequired,
  isEnvsLoading: PropTypes.bool,
  handleExecute: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ExecuteForm;
