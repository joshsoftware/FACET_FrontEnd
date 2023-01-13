import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "Components/Loader";
import OrgProfileForm from "Components/OrganizationsComponents/OrgProfile/OrgProfileForm";

import { editOrganizationRequest } from "store/Organizations/actions";

const mapState = ({ orgs, user }) => ({
  organization: orgs.organization,
  isLoading: orgs.isLoading,
  isOrgOwner: user.isOrgOwner,
});

const OrgProfile = () => {
  const dispatch = useDispatch();

  const { organization, isOrgOwner, isLoading } = useSelector(mapState);

  const [orgProfileFormData, setOrgProfileFormData] = useState(organization);

  useEffect(() => {
    setOrgProfileFormData(organization);
  }, [organization]);

  // handles change in the org profile form and update the state
  const onOrgProfileFormDataChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      // if current user is not the orgOwner then user can't change org profile details
      isOrgOwner &&
        setOrgProfileFormData((prevState) => ({ ...prevState, [name]: value }));
    },
    [isOrgOwner]
  );

  // handles the form submit action and dispatch the edit profile action
  const onUpdateOrgProfileFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editOrganizationRequest(orgProfileFormData));
  };

  // show loader if organization data is fetching and org data objectnot contains any prev data
  const showLoader =
    isLoading &&
    typeof organization === "object" &&
    !Object(organization).length;

  return (
    <Container className="py-4 col-md-5">
      <h4 className="py-2">Organization Profile</h4>
      <div className="my-3 p-4 rounded bg-white">
        {showLoader ? (
          <div className="w-100 text-center">
            <Loader />
          </div>
        ) : (
          <OrgProfileForm
            data={orgProfileFormData}
            onChange={onOrgProfileFormDataChange}
            onSubmit={onUpdateOrgProfileFormSubmit}
            isOrgOwner={isOrgOwner}
          />
        )}
      </div>
    </Container>
  );
};

export default OrgProfile;
