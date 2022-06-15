import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { PlusLg, Search } from 'react-bootstrap-icons';
import AddProjectModal from './AddProjectModal';

const DashboardSubHeader = ({ setShowAddProjectModal }) => {
    return (
        <>
            <AddProjectModal />
            <div className='d-flex flex-items-start align-items-center pb-2 border-bottom border-dark'>
                <div className='col-12'>
                    <div className='d-flex flex-column flex-lg-row flex-auto'>
                        <InputGroup className='me-3 w-100'>
                            <InputGroup.Text id="basic-addon1">
                                <Search />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <div className='d-flex flex-wrap col-2'>  
                            <Button className='w-100' onClick={setShowAddProjectModal}>
                                <PlusLg />
                                New Project
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSubHeader;