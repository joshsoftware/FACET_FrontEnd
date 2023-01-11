import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AddButton } from "Components/forms/Buttons";
import ChangeOrgMemberRole from "Components/OrganizationsComponents/Organization/ChangeOrgMemberRole";
import OrgMemberTableRow from "Components/OrganizationsComponents/Organization/OrgMemberTableRow";
import TableComponent from "Components/CustomComponents/TableComponent";

import {
  changeMemberRoleRequest,
  getOrgMembersRequest,
  removeMemberFromOrgRequest,
} from "store/Organizations/OrgMembers/actions";

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

  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [changeRoleFormData, setChangeRoleFormData] = useState({
    member: "",
    currRole: "",
    updatedRole: "",
  });

  useEffect(() => {
    dispatch(getOrgMembersRequest());
  }, []);

  // on change role of member
  const onChangeMemberRole = useCallback(
    (e) =>
      setChangeRoleFormData((prevState) => ({
        ...prevState,
        updatedRole: e.target.value,
      })),
    []
  );

  // toggles the change role modal
  const toggleChangeRoleModal = () =>
    setShowChangeRoleModal(!showChangeRoleModal);

  // set change role form data and opens the modal
  const onOpenChangeRoleModal = useCallback((member, role) => {
    toggleChangeRoleModal();
    setChangeRoleFormData((prevState) => ({
      ...prevState,
      member,
      currRole: role,
      updatedRole: role,
    }));
  }, []);

  // submit change member role form
  // TO-DO: changes needed once api is done: send data in form of backend requires
  const onRoleChangeFormSubmit = (e) => {
    e.preventDefault();
    toggleChangeRoleModal();
    dispatch(changeMemberRoleRequest(changeRoleFormData));
  };

  // dispatch action to remove member from organization
  const onRemoveMember = useCallback((member) => {
    dispatch(removeMemberFromOrgRequest({ member }));
  }, []);

  return (
    <Container className="py-5">
      <ChangeOrgMemberRole
        data={changeRoleFormData}
        onChange={onChangeMemberRole}
        onSubmit={onRoleChangeFormSubmit}
        show={showChangeRoleModal}
        onClose={toggleChangeRoleModal}
      />
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
                <OrgMemberTableRow
                  key={index}
                  data={item}
                  openChangeRoleModal={onOpenChangeRoleModal}
                  onRemoveMember={onRemoveMember}
                />
              ))}
            </TableComponent>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrgMembers;
