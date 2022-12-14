import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AddButton } from "Components/forms/Buttons";
import AddMembersInProject from "Components/DashboardComponent/ProjectAdmin/AddMembersInProject";
import MemberTableRow from "Components/ProjectsComponent/MemberComponent/MemberTableRow";
import TableComponent from "Components/CustomComponents/TableComponent/index";
import { ViewComponent } from "Components/CustomComponents";

import {
  addMembersInProjectRequest,
  getProjectMembersRequest,
  removeMembersInProjectRequest,
} from "store/ProjectMembers/actions";
import { getUsersRequest } from "store/User/actions";

const adminTableHeadings = ["#", "Member", "Role", "Actions"];
const nonAdminTableHeadings = ["#", "Member", "Role"];

const mapState = ({ projectMembers, user }) => ({
  members: projectMembers.members,
  project: projectMembers.project,
  isLoading: projectMembers.isLoading,
  projectAdmin: projectMembers.projectAdmin,
  user: user.currentUser,
  usersOptions: user.users.map((ele) => ({ label: ele.name, value: ele.id })),
  isUsersLoading: user.isLoading,
});

const MemberContainer = () => {
  const dispatch = useDispatch();

  const { projectName } = useParams();
  const {
    members,
    isLoading,
    projectAdmin,
    user,
    usersOptions,
    isUsersLoading,
  } = useSelector(mapState);

  const [show, setShow] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // toggle modal
  const toggleModal = () => setShow(!show);

  // get all members of the project
  useEffect(() => {
    dispatch(getProjectMembersRequest({ project: projectName }));
  }, [projectName]);

  // get users which are not members of the project when modal opens
  useEffect(() => {
    if (show) {
      dispatch(
        getUsersRequest({ exclude: "projectMembers", project: projectName })
      );
    }
    return () => setSelectedMembers([]);
  }, [projectName, show]);

  // helps to remove member from the project
  const removeMember = (id) =>
    dispatch(
      removeMembersInProjectRequest({ project: projectName, members: [id] })
    );

  // set selected members
  const onChangeMembers = (value) => setSelectedMembers(value);

  // helps to submit add members form
  const onSubmitMemberForm = () => {
    const membersData = selectedMembers.map((ele) => ele.value);
    dispatch(
      addMembersInProjectRequest({ project: projectName, members: membersData })
    );
    toggleModal();
  };

  // check whether loggedin user is the project admin or not
  const isProjectAdmin = projectAdmin === user.id;
  const tableHeadings = isProjectAdmin
    ? adminTableHeadings
    : nonAdminTableHeadings;

  return (
    <>
      {show && (
        <AddMembersInProject
          show={show}
          handleClose={toggleModal}
          usersOptions={usersOptions}
          value={selectedMembers}
          onChange={onChangeMembers}
          onSubmit={onSubmitMemberForm}
          isLoading={isUsersLoading}
          isDisabled={isUsersLoading}
        />
      )}
      <div className="py-5 w-100">
        <div className="d-flex justify-content-between align-items-center px-5">
          <h3>Team Members</h3>
          {isProjectAdmin && (
            <AddButton label="Add Member" handleClick={toggleModal} />
          )}
        </div>
        <ViewComponent disabledHeader>
          <TableComponent striped headings={tableHeadings}>
            {!isLoading &&
              members.map((item, index) => (
                <MemberTableRow
                  key={index}
                  index={index + 1}
                  data={item}
                  isProjectAdmin={isProjectAdmin}
                  onRemoveMember={removeMember}
                />
              ))}
          </TableComponent>
        </ViewComponent>
      </div>
    </>
  );
};

export default MemberContainer;
