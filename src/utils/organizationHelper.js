import { ORG_ROLES } from "constants/roleConstants";

// helps to convert roles as backend requires
export const convertRoles = (role) => {
  switch (role) {
    case ORG_ROLES.MEMBER:
      return "member";

    case ORG_ROLES.PROJECT_ADMIN:
      return "admin";

    default:
      return "member";
  }
};

// helps to convert roles booleans to string form to show on the UI
export const convertRolesToStr = (isSuperAdmin, isAdmin) => {
  if (isSuperAdmin) {
    return ORG_ROLES.OWNER;
  }
  if (isAdmin) {
    return ORG_ROLES.PROJECT_ADMIN;
  }
  return ORG_ROLES.MEMBER;
};

// helps to create uninivited members toast message
export const uninvitedMembersToastMessage = (data) => (
  <>
    <span>Users with following emails are already exists: </span>
    <ul>
      {data?.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </>
);
