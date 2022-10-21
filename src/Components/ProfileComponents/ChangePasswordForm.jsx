import { Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

import FormInput from "Components/forms/Inputs/FormInput";
import { SaveButton } from "Components/forms/Buttons";

const ChangePasswordForm = ({ data, isLoading, onChange, onSubmit }) => {
    return (
        <Container fluid="sm" className="bg-white mt-5 my-3 rounded py-4 px-4">
            <h5>Change Password</h5>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col md={6}>
                        <FormInput
                            label="Current Password"
                            name="currPass"
                            type="password"
                            value={data.currPass}
                            onChange={onChange}
                            isRequired
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput
                            label="New Password"
                            name="newPass"
                            type="password"
                            value={data.newPass}
                            onChange={onChange}
                            isRequired
                        />
                    </Col>
                    <Col>
                        <FormInput
                            label="Confirm New Password"
                            name="conNewPass"
                            type="password"
                            value={data.conNewPass}
                            onChange={onChange}
                            isRequired
                        />
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    <SaveButton
                        type="submit"
                        handleClick={onSubmit}
                        disabled={
                            isLoading ||
                            data.currPass.length === 0 ||
                            data.newPass.length === 0 ||
                            data.conNewPass.length === 0
                        }
                    />
                </div>
            </Form>
        </Container>
    );
};

ChangePasswordForm.propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
