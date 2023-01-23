import React, { useEffect } from "react";
import { Card, Col, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from "Components/Loader";
import OrgDetailTab from "Components/facetAdmin/OrgDetails/OrgDetailTab";
import OrgMembersList from "Components/facetAdmin/OrgDetails/OrgMembersList";

import { getOrganizationRequest } from "store/facetAdmin/actions";

const mapState = ({ admin }) => ({
  organization: admin.organization?.organization || {},
  members: admin.organization?.org_members || [],
  isLoading: admin.isLoading && !Object.entries(admin.organization)?.length,
});

const OrganizationDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { organization, members, isLoading } = useSelector(mapState);

  useEffect(() => {
    id && dispatch(getOrganizationRequest({ org_id: id }));
  }, [id]);

  return (
    <Col className="py-4 px-5">
      <h2 className="text-capitalize">{organization?.name}</h2>
      <Card className="px-4 py-3">
        <Card.Body>
          {isLoading ? (
            <div className="w-100 text-center">
              <Loader />
            </div>
          ) : (
            <Tabs defaultActiveKey="details" justify>
              <Tab eventKey="details" title="Details">
                <OrgDetailTab data={organization} />
              </Tab>
              <Tab eventKey="members" title="Members">
                <OrgMembersList data={members} />
              </Tab>
            </Tabs>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default OrganizationDetails;
