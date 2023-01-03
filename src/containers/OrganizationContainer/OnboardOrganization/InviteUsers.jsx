import React, { useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import InviteMembersSelect from "Components/OrganizationsComponents/InviteUsers/InviteMembersSelect";
import UserSelectFieldLabel from "Components/OrganizationsComponents/InviteUsers/UserSelectFieldLabel";

import { getUsersRequest } from "store/User/actions";

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

  const loadOptions = (inputValue) =>
    new Promise((resolve) => {
      dispatch(getUsersRequest({ q: inputValue }));
      if (!isLoading) {
        resolve(users);
      }
    });

  return (
    <Container className="d-flex justify-content-center">
      <Col md={8} className="py-5">
        <h2 className="text-center">Welcome to {org}</h2>
        <Card className="my-4">
          <Card.Body className="py-4">
            <h5>Add organization members</h5>
            <div className="text-muted">
              Organization members will be able to view projects, organize into
              teams, and collaborate on the project that is assigned to them.
            </div>
            <InviteMembersSelect
              org={org}
              value={selectedMembers}
              onChange={setSelectedMembers}
              loadOptions={loadOptions}
            />
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default InviteUsers;
