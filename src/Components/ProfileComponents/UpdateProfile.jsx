import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import { SaveButton } from "Components/forms/Buttons";

const UpdateProfile = ({ data, isLoading, onChange, onSubmit }) => {
  return (
    <Container fluid="sm" className="bg-white mt-5 my-3 rounded py-4 px-4">
      <h5>Profile</h5>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <FormInput
              label="Name"
              name="name"
              value={data.name}
              onChange={onChange}
              isRequired
            />
          </Col>
          <Col>
            <FormInput
              label="Email"
              name="email"
              value={data.email}
              isRequired
              disabled
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <SaveButton
            type="submit"
            handleClick={onSubmit}
            disabled={isLoading}
          />
        </div>
      </Form>
    </Container>
  );
};

UpdateProfile.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateProfile;
