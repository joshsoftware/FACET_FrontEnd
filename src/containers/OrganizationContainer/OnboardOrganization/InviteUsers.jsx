import React, { useState } from "react";
import { Card, Col, Container, Form, FormLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import InviteMembersSelect from "Components/OrganizationsComponents/InviteUsers/InviteMembersSelect";
import { SaveButton } from "Components/forms/Buttons";

import { inviteUsersInOrganizationRequest } from "store/Organizations/actions";

const InviteUsers = () => {
  const dispatch = useDispatch();

  const { org } = useParams();

  const [selectedMembers, setSelectedMembers] = useState([]);

  // handles invite users form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const inviteUsersInOrg = selectedMembers.map(({ value, __isNew__ }) => ({
      type: __isNew__ ? "email" : "user",
      value: value,
    }));
    dispatch(inviteUsersInOrganizationRequest(inviteUsersInOrg));
  };

  // check whether all fields of form are filled
  const isSaveButtonDisabled = !selectedMembers.length;

  return (
    <Container className="d-flex justify-content-center">
      <Col md={8} className="py-5">
        <h2 className="text-center">Welcome to {org}</h2>
        <Card className="my-4">
          <Card.Body className="py-4">
            <h5>Add organization members</h5>
            <small className="text-muted">
              Organization members will be able to view projects, organize into
              teams, and collaborate on the project that is assigned to them.
            </small>
            <Form onSubmit={handleSubmit}>
              <div className="pt-4 pb-3">
                <FormLabel>Search by username, email address</FormLabel>
                <InviteMembersSelect
                  org={org}
                  value={selectedMembers}
                  onChange={setSelectedMembers}
                />
              </div>
              <SaveButton
                type="submit"
                disabled={isSaveButtonDisabled}
                className="w-100"
              />
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default InviteUsers;
