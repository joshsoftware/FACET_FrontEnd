import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import "./style.css";

const AccountTypeCard = ({ data, accountType, setAccountType }) => {
  const { Icon, title, subTitle, value } = data;

  const isActive =
    (!accountType && value === "personal") || accountType === value;

  return (
    <Card
      className={`h-100 pe-auto accountTypeCard ${
        isActive && "border-primary shadow"
      }`}
      onClick={() => setAccountType(value)}
    >
      <Card.Body className="text-center px-0 mx-0">
        <Icon size={48} className="text-secondary" />
        <Card.Title className="pt-3">{title}</Card.Title>
        <Card.Text className="text-muted fs-small">
          <small>{subTitle}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

AccountTypeCard.propTypes = {
  data: PropTypes.shape({
    Icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  accountType: PropTypes.string.isRequired,
  setAccountType: PropTypes.object.isRequired,
};

export default AccountTypeCard;
