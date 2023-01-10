import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AddButton } from "Components/forms/Buttons";
import OrgMemberTableRow from "Components/OrganizationsComponents/Organization/OrgMemberTableRow";
import TableComponent from "Components/CustomComponents/TableComponent";

import { getOrgMembersRequest } from "store/Organizations/OrgMembers/actions";

import { INVITE_ORGANIZATION_ROUTE } from "constants/routeConstants";

const adminTableHeadings = ["Member", "Role", "Actions"];
// eslint-disable-next-line no-unused-vars
const nonAdminTableHeadings = ["#", "Member", "Role"];

const mapState = ({ orgMembers }) => ({
  members: orgMembers.members,
  isLoading: orgMembers.isLoading,
});

const OrgMembers = () => {
  const dispatch = useDispatch();

  const { members } = useSelector(mapState);

  useEffect(() => {
    dispatch(getOrgMembersRequest());
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Organization Members</h4>
            <AddButton
              label="Invite Members"
              as={Link}
              to={INVITE_ORGANIZATION_ROUTE}
              size="sm"
            />
          </div>
          <div className="px-5 py-4 bg-light rounded">
            <TableComponent headings={adminTableHeadings} striped>
              {members?.map((item, index) => (
                <OrgMemberTableRow key={index} data={item} />
              ))}
            </TableComponent>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrgMembers;
