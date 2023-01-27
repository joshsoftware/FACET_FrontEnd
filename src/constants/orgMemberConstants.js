import { ORG_ROLES } from "./roleConstants";

// helps to org members change role form
export const ORG_MEMBERS_ROLE = [
  {
    title: "Project Admin",
    value: ORG_ROLES.PROJECT_ADMIN,
    subTitle:
      "Can create projects and manage project teams in the organization.",
  },
  {
    title: "Member",
    value: ORG_ROLES.MEMBER,
    subTitle: "Can contribute to assigned projects.",
  },
];
