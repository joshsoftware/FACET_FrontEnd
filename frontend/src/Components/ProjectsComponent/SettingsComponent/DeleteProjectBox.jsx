import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import { DeleteButton } from 'Components/forms/Buttons';
import DeleteConfirmationModal from 'Components/DeleteConfirmationModal';

const DeleteProjectBox = (props) => {
    const {
        project,
        handleDelete
    } = props;
    const [show, setShow] = useState(false);

    const onToggleModal = () => {
        setShow(!show);
    }
    const onDeleteConfirm = () => {
        handleDelete();
        onToggleModal();
    }
    
    return (
        <>
            <DeleteConfirmationModal 
                show={show}
                handleClose={onToggleModal}
                onDelete={onDeleteConfirm}
            /> 
            <Card className='my-5 border-danger'>
                <Card.Body>
                    <div className='pt-2 pb-3'>
                        <h3>Delete Project</h3>
                        <small>This action cannot be undone. This will permanently delete the <span className='fw-bold'>project/{project.name}</span> project, its testsuites, testcases, reports, templates, and remove all collaborator associations.</small>
                    </div>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-end'>
                    <DeleteButton 
                        handleClick={onToggleModal}
                        disabled={!project.is_project_admin}
                    />
                </Card.Footer>
            </Card>
        </>
    )
}

export default DeleteProjectBox;

DeleteProjectBox.propTypes = {
    project: PropTypes.object.isRequired,
    handleDelete: PropTypes.func
}
