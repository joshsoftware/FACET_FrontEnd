import React from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";
import { FormInput } from "../../forms/Inputs";
import { SaveButton } from "../../forms/Buttons";

const ChangeProjectNameBox = (props) => {
  const { project, formData, onchange, handleSubmit } = props;

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
            value={formData.newProjName}
            onChange={onchange}
            text={`Project name will updated as ${formData.newProjName}`}
            disabled={!project.is_project_admin}
          />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <SaveButton
            onClick={handleSubmit}
            disabled={
              !project.is_project_admin ||
              formData.newProjName.length === 0 ||
              formData.project === formData.newProjName
            }
          />
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default ChangeProjectNameBox;

ChangeProjectNameBox.propTypes = {
  project: PropTypes.object.isRequired,
  formData: PropTypes.objectOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  onchange: PropTypes.func.isRequired,
};

ChangeProjectNameBox.defaultProps = {
  formData: {
    project: "",
    newProjName: "",
  },
};
