/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

const CustomModal = (props) => {
  const { show, onClose, title, children } = props;

  return (
    <Modal show={show} onHide={onClose} {...props}>
      <Modal.Header className="alert-secondary" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
};

CustomModal.Body = ({ children, ...props }) => {
  return <Modal.Body {...props}>{children}</Modal.Body>;
};

CustomModal.Footer = ({ children, ...props }) => {
  return <Modal.Footer {...props}>{children}</Modal.Footer>;
};

export default CustomModal;

CustomModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

CustomModal.Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

CustomModal.Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
