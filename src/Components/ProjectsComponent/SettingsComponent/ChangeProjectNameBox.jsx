import React from "react";
import { Card, Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import { SaveButton } from "Components/forms/Buttons";

import { convertToSlug } from "utils";

const ChangeProjectNameBox = ({
  project,
  formData,
  onChange,
  handleSubmit,
}) => {
  const { is_project_admin: isProjectAdmin } = project;
  const { project: currProjName, newProjName } = formData;

  // check whether form is able to submit or not
  const isSaveButtonDisabled =
    !isProjectAdmin || newProjName.length === 0 || currProjName === newProjName;

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Card.Body className="pt-4">
          <div className="pb-3">
            <h3>Project Name</h3>
            <small>
              Used to identify your Project on the Dashboard, and in the URL of
              project components.
            </small>
          </div>
          <FormInput
            name="newProjName"
            value={newProjName}
            onChange={onChange}
            text={`Project name will updated as ${convertToSlug(newProjName)}`}
            disabled={!isProjectAdmin}
          />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <SaveButton onClick={handleSubmit} disabled={isSaveButtonDisabled} />
        </Card.Footer>
      </Form>
    </Card>
  );
};

ChangeProjectNameBox.propTypes = {
  project: PropTypes.shape({
    is_project_admin: PropTypes.bool,
  }).isRequired,
  formData: PropTypes.shape({
    project: PropTypes.string,
    newProjName: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

ChangeProjectNameBox.defaultProps = {
  formData: {
    project: "",
    newProjName: "",
  },
};

export default ChangeProjectNameBox;
