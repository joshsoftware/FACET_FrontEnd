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
const initialState = { project: "", members: [] };

const mapState = ({ projectMembers, user }) => ({
  members: projectMembers.members,
  project: projectMembers.project,
  isLoading: projectMembers.isLoading,
  projectAdmin: projectMembers.projectAdmin,
  user: user.currentUser,
  allUsers: user.users,
});

const MemberContainer = () => {
  const dispatch = useDispatch();

  const { projectName } = useParams();
  const { members, isLoading, projectAdmin, user, allUsers } =
    useSelector(mapState);

  const [show, setShow] = useState(false);
  const [addMemberFormData, setAddMemberFormData] = useState({
    ...initialState,
    project: projectName,
  });
  const [usersOptions, setUsersOptions] = useState([]);

  const toggleModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(getProjectMembersRequest({ project: projectName }));
  }, [projectName]);

  useEffect(() => {
    if (projectName) {
      dispatch(
        getUsersRequest({ exclude: "projectMembers", project: projectName })
      );
    }
  }, [projectName]);

  useEffect(() => {
    let options_data = [];
    if (allUsers) {
      allUsers.forEach((ele) => {
        options_data.push({ value: ele.id, label: ele.name });
      });
    }
    setUsersOptions(options_data);
  }, [allUsers]);

  const removeMember = (id) => {
    dispatch(
      removeMembersInProjectRequest({ project: projectName, members: [id] })
    );
  };

  const onchangeMembers = (_name, val) => {
    setAddMemberFormData((prevState) => ({
      ...prevState,
      members: val,
    }));
  };

  const onSubmitMemberForm = () => {
    const members = addMemberFormData.members.map((e) => e.value);
    dispatch(addMembersInProjectRequest({ ...addMemberFormData, members }));
    toggleModal();
    setAddMemberFormData((prevState) => ({ ...prevState, members: [] }));
  };

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
          onchange={onchangeMembers}
          value={addMemberFormData.members}
          handleSubmit={onSubmitMemberForm}
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
