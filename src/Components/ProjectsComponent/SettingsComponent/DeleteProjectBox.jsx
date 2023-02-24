import React, { useState } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import { DeleteButton } from "Components/forms/Buttons";
import DeleteConfirmationModal from "Components/DeleteConfirmationModal";

const DeleteProjectBox = ({ project, handleDelete }) => {
  const [show, setShow] = useState(false);

  const onToggleModal = () => {
    setShow(!show);
  };
  const onDeleteConfirm = () => {
    handleDelete();
    onToggleModal();
  };

  const modalBodyText = (
    <>
      Are you sure you want to DELETE the project{" "}
      <span className="fw-bold">{project.name}</span>?
    </>
  );

  return (
    <>
      <DeleteConfirmationModal
        show={show}
        title="Delete Project"
        handleClose={onToggleModal}
        onDelete={onDeleteConfirm}
        text={modalBodyText}
      />
      <Card className="my-5 border-danger">
        <Card.Body>
          <div className="pt-2 pb-3">
            <h3>Delete Project</h3>
            <small>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="fw-bold">{project.name}</span> project, its
              testsuites, testcases, reports, templates, and remove all
              collaborator associations.
            </small>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <DeleteButton
            handleClick={onToggleModal}
            disabled={!project.is_project_admin}
          />
        </Card.Footer>
      </Card>
    </>
  );
};

DeleteProjectBox.propTypes = {
  project: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteProjectBox;
