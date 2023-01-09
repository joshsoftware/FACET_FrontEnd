import React from "react";
import { Card } from "react-bootstrap";

import "./style.css";

// eslint-disable-next-line react/prop-types
const AccountTypeCard = ({ data, accountType, setAccountType }) => {
  // eslint-disable-next-line react/prop-types
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

export default AccountTypeCard;
