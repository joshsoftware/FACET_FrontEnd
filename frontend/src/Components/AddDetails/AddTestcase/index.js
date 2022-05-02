import React from "react";
import { Form,Button } from "react-bootstrap";

const AddTestcase = (props) => {
    const { projSlug, tab, handleClose } = props;
    
    const onSubmit = (e) => {
        handleClose();
        e.preventDefault();
        console.log('submit working well');
        console.log(projSlug)
    }
    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" id="name" />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Testcase</Form.Label>
                    <Form.Control type="text" name="name" id="name" />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleClose} className="me-2">Close</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </div>
            </Form>
        </>
    )
}

export default AddTestcase;