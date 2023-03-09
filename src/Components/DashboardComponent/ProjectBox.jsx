import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import { convertToLocalDate } from "utils/convertToLocalDate";

const ProjectBox = ({ data, onClick }) => {
  const { name, description, modified_at: modifiedAt } = data;

  return (
    <Card className="h-100 project-card" onClick={onClick}>
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="text-muted mt-auto">
          <small>Last updated on {convertToLocalDate(modifiedAt)}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

ProjectBox.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    modified_at: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProjectBox;
