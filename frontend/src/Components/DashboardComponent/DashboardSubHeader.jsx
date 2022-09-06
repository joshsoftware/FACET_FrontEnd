import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const DashboardSubHeader = (props) => {
    const { setShowAddProjectModal, user, isLoggedIn } = props;

    return (
        <>
            <div className='d-flex flex-items-start align-items-center pb-2 border-bottom border-dark'>
                <div className='col-12'>
                    <div className='d-flex flex-column flex-lg-row flex-auto'>
                        <InputGroup className='me-3 w-100'>
                            <InputGroup.Text id="basic-addon1">
                                <Search />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search Projects..."
                                aria-label="Search Projects"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        {isLoggedIn && (user.is_super_admin || user.is_admin) && (
                            <div className='d-flex flex-wrap col-2'>  
                                <Button className='w-100 d-flex justify-content-center align-items-center' onClick={setShowAddProjectModal}>
                                    + New Project
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSubHeader;

DashboardSubHeader.propTypes = {
    setShowAddProjectModal: PropTypes.func,
    user: PropTypes.object,
    isLoggedIn: PropTypes.bool
}
