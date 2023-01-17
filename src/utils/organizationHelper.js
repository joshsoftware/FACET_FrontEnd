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
