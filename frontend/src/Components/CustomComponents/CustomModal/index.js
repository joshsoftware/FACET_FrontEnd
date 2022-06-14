import React from 'react'
import { Modal } from 'react-bootstrap';

const CustomModal = ({ 
    show, 
    handleClose,
    title,
    children
}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {children}
        </Modal>
    )
}

CustomModal.Body = ({ children }) => {
    return <Modal.Body>
        {children}
    </Modal.Body>
}

CustomModal.Footer = ({ children }) => {
    return <Modal.Footer>
        {children}
    </Modal.Footer>
}

export default CustomModal;