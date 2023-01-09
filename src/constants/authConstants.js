import { Buildings, PersonCircle } from "react-bootstrap-icons";

// singup initial form Data
export const SIGNUP_INITIAL_DATA = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "",
};

// account type details which user needs to select while creating account
export const ACCOUNT_TYPES = [
  {
    Icon: PersonCircle,
    title: "Personal Use",
    subTitle: "Create projects, store API data, validate APIs, etc",
    value: "personal",
  },
  {
    Icon: Buildings,
    title: "Enterprise Use",
    subTitle: "Create teams, generate reports, schedule executions, etc",
    value: "organization",
  },
];
