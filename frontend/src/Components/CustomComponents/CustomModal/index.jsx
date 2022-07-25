import React from 'react'
import { Modal } from 'react-bootstrap';

const CustomModal = ({ 
    show, 
    handleClose,
    title,
    children,
    ...props
}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            {...props}
        >
            <Modal.Header className="alert-secondary" closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {children}
        </Modal>
    )
}

CustomModal.Body = ({ children, ...props }) => {
    return <Modal.Body {...props}>
        {children}
    </Modal.Body>
}

CustomModal.Footer = ({ children, ...props }) => {
    return <Modal.Footer {...props}>
        {children}
    </Modal.Footer>
}

export default CustomModal;