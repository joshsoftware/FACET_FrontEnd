import React from "react";
import { Person } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const UserSelectFieldLabel = ({ data }) => {
  const { name, username, image } = data;

  return (
    <div className="d-flex align-items-center">
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <Person size={24} className="me-2" />
      )}
      <div>
        {username}
        <div>
          <small className="text-muted">{name}</small>
        </div>
      </div>
    </div>
  );
};

UserSelectFieldLabel.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserSelectFieldLabel;
