import React, { useEffect } from "react";
import { Col, Container, Image, Nav } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OrgNavItem from "Components/OrganizationsComponents/Organization/OrgNavItem";

import { getOrganizationRequest } from "store/Organizations/actions";
import { buildRoute, truncate } from "utils/helper";

import { ORG_HEADER_TAB_ITEMS } from "constants/organizationsConstants";
import { ORG_OVERVIEW_ROUTE } from "constants/routeConstants";

import "./style.css";

const mapState = ({ orgs }) => ({
  organizationInfo: orgs.organization,
  isLoading: orgs.isLoading,
});

const Organization = () => {
  const dispatch = useDispatch();

  const { org } = useParams();
  const { organizationInfo } = useSelector(mapState);

  const { name, description, image: imageSrc } = organizationInfo;

  useEffect(() => {
    org && dispatch(getOrganizationRequest({ org }));
  }, [org]);

  const activeRoute = buildRoute(ORG_OVERVIEW_ROUTE, { org });

  return (
    <Container className="my-2 border-bottom border-light">
      <Col md={9} className="py-2">
        <div className="d-flex align-items-center">
          <Image
            src={imageSrc}
            width={64}
            height={64}
            rounded
            className="border border-secondary"
          />
          <div className="ps-3">
            <span className="fs-3">{name}</span>
            <div>
              <small className="text-muted">{truncate(description)}</small>
            </div>
          </div>
        </div>
      </Col>
      <Nav variant="tabs" activeKey={activeRoute}>
        {ORG_HEADER_TAB_ITEMS?.map((item, index) => (
          <OrgNavItem key={index} data={item} org={org} />
        ))}
      </Nav>
      <Outlet />
    </Container>
  );
};

export default Organization;
