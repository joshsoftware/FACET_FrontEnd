import React, { useState } from "react";
import { Card, Col, Container, Form, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import InviteMembersSelect from "Components/OrganizationsComponents/InviteUsers/InviteMembersSelect";
import UserSelectFieldLabel from "Components/OrganizationsComponents/InviteUsers/UserSelectFieldLabel";
import { SaveButton } from "Components/forms/Buttons";

import { getUsersRequest } from "store/User/actions";
import { inviteUsersInOrganizationRequest } from "store/Organizations/actions";

const mapState = ({ user }) => ({
  users: user.users.map((userData) => ({
    label: <UserSelectFieldLabel data={userData} />,
    value: userData.id,
  })),
  isLoading: user.isLoading,
});

const InviteUsers = () => {
  const dispatch = useDispatch();

  const { org } = useParams();
  const { users, isLoading } = useSelector(mapState);

  const [selectedMembers, setSelectedMembers] = useState([]);

  // loads users options when query changed
  const loadOptions = (inputValue) =>
    new Promise((resolve) => {
      dispatch(getUsersRequest({ q: inputValue }));
      if (!isLoading) {
        resolve(users);
      }
    });

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
                  loadOptions={loadOptions}
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
