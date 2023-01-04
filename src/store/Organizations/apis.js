/* eslint-disable no-unused-vars */
// TO-DO
// Currently this apis file functions returns mockdata
// When Apis are available then this functions will be replaced
// by api calls
import organizationsData from "utils/mockdata/organizations";

export const getOrganizationsApi = () => organizationsData;

export const getOrganizationApi = (data) => organizationsData.organizations[0];

export const addOrganizationApi = (data) => data;

export const inviteUsersInOragnizationApi = (data) => data;
