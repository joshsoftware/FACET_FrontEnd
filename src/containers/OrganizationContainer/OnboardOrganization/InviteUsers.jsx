import React, { useState } from "react";
import { Card, Col, Container, Form, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import InviteMembersSelect from "Components/OrganizationsComponents/InviteUsers/InviteMembersSelect";
import { SaveButton } from "Components/forms/Buttons";

import { inviteUsersInOrganizationRequest } from "store/Organizations/actions";

const mapState = ({ orgs }) => ({
  organization: orgs.organization?.name,
});

const InviteUsers = () => {
  const dispatch = useDispatch();

  const { organization } = useSelector(mapState);

  const [selectedMembers, setSelectedMembers] = useState([]);

  // handles invite users form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const inviteUsersInOrg = selectedMembers.map(({ value }) => value);
    dispatch(
      inviteUsersInOrganizationRequest({ invited_members: inviteUsersInOrg })
    );
  };

  // check whether all fields of form are filled
  const isSaveButtonDisabled = !selectedMembers.length;

  return (
    <Container className="d-flex justify-content-center">
      <Col md={8} className="py-5">
        <h2 className="text-center">Welcome to {organization}</h2>
        <Card className="my-4">
          <Card.Body className="py-4">
            <h5>Add organization members</h5>
            <small className="text-muted">
              Organization members will be able to view projects, organize into
              teams, and collaborate on the project that is assigned to them.
            </small>
            <Form onSubmit={handleSubmit}>
              <div className="pt-4 pb-3">
                <FormLabel>Enter email address</FormLabel>
                <InviteMembersSelect
                  org={organization}
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
