import React, { useEffect, useState } from "react";
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
  // This component and its methods need to be change with respect to FormSelect component
  const [options, setOptions] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState(0);

  useEffect(() => {
    let env_options = [];
    environments.forEach((ele) => {
      env_options.push({ value: ele.id, label: ele.name });
    });
    setOptions(env_options);
  }, [environments]);

  const handleEnvChange = (_name, value) => {
    setSelectedEnv(value);
  };

  const onExecute = () => {
    handleExecute(data.id, selectedEnv);
  };

  return (
    <ViewComponent disabledHeader>
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
              options={options}
              handlechange={handleEnvChange}
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
  data: PropTypes.object.isRequired,
  environments: PropTypes.array.isRequired,
  isEnvsLoading: PropTypes.bool,
  handleExecute: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ExecuteForm;
