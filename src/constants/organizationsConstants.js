import { Gear, House, Kanban, People } from "react-bootstrap-icons";
import {
  ORG_MEMBERS_ROUTE,
  ORG_OVERVIEW_ROUTE,
  ORG_PROJECTS_ROUTE,
  ORG_SETTINGS_ROUTE,
} from "./routeConstants";

// organization header tab items
export const ORG_HEADER_TAB_ITEMS = [
  {
    title: "Overview",
    icon: House,
    url: ORG_OVERVIEW_ROUTE,
  },
  {
    title: "Projects",
    icon: Kanban,
    url: ORG_PROJECTS_ROUTE,
  },
  {
    title: "Members",
    icon: People,
    url: ORG_MEMBERS_ROUTE,
  },
  {
    title: "Settings",
    icon: Gear,
    url: ORG_SETTINGS_ROUTE,
  },
];
