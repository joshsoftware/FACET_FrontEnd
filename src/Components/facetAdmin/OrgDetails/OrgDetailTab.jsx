import React from "react";
import { Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const OrgDetailTab = ({ data }) => {
  const { name, description, contact_email_id: contactEmail } = data;

  return (
    <Container className="py-4">
      <Col className="py-2">
        <small>
          <b>Organization Name:</b>
        </small>
        <div className="text-capitalize">{name}</div>
      </Col>
      <Col className="py-2">
        <small>
          <b>Description:</b>
        </small>
        <div>{description ?? "-"}</div>
      </Col>
      <Col className="py-2">
        <small>
          <b>Contact:</b>
        </small>
        <div>{contactEmail}</div>
      </Col>
    </Container>
  );
};

OrgDetailTab.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    contact_email_id: PropTypes.string,
  }).isRequired,
};

export default OrgDetailTab;
