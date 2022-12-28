import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { buildRoute } from "utils/helper";

import { ORG_OVERVIEW_ROUTE } from "constants/routeConstants";

import orgDefaultAvatar from "assets/images/orgAvatar.png";

import "./style.css";

const OrganizationRow = ({ data, onLeaveOrg }) => {
  const { name, image, is_owner: isOwner } = data;

  const orgAvatar = image || orgDefaultAvatar;
  const role = isOwner ? "Owner" : "Member";

  const onLeaveOrgButtonClick = () => onLeaveOrg(name);

  return (
    <Card className="py-2 px-3 d-flex flex-row justify-content-between align-items-center">
      <div>
        <img src={image || orgAvatar} className="rounded org-avatar" />
        <span className="ps-2">
          <Link
            to={buildRoute(ORG_OVERVIEW_ROUTE, { org: name })}
            className="text-dark text-decoration-none fw-bold"
          >
            {name}
          </Link>
          <small className="px-1 text-muted">{role}</small>
        </span>
      </div>
      <Button
        size="sm"
        variant="outline-danger"
        className="py-0"
        onClick={onLeaveOrgButtonClick}
      >
        Leave
      </Button>
    </Card>
  );
};

OrganizationRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    is_owner: PropTypes.bool,
    image: PropTypes.string,
  }).isRequired,
  onLeaveOrg: PropTypes.func.isRequired,
};

export default OrganizationRow;
