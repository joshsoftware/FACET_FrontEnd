import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { EyeFill } from 'react-bootstrap-icons';

import BadgeComponent from 'Components/BadgeComponent';
import TestdatOutcomeModal from './TestdatOutcomeModal';

const TestdataOutcomeTable = (props) => {
    const { testdataName, data } = props;

    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const onOpenModal = (item) => {
        setSelectedData(item);
        toggleModal();
    }
    
    return (
        <div>
            {showModal&&(
                <TestdatOutcomeModal 
                    show={showModal}
                    handleClose={toggleModal}
                    data={{...selectedData, testdata_name: testdataName}}
                />
            )}
            <Table bordered striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Field name</th>
                        <th>Field Type</th>
                        <th>Status</th>
                        <th>Errors</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind+1}</td>
                                <td>{e.name}</td>
                                <td>{e.type}</td>
                                <td>
                                    <BadgeComponent 
                                        label={e.status}
                                        bg={e.status==="passed"
                                            ?"success"
                                            :e.status==="failed"
                                                ?"danger"
                                                :"warning"
                                        }
                                    />
                                </td>
                                <td>
                                    {e.error.length?e.error:"-"}
                                </td>
                                <td>
                                    <Button
                                        onClick={() => onOpenModal(e)}
                                        size="sm"
                                        variant='secondary'
                                        className='d-flex align-items-center'
                                    >
                                        <EyeFill />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
        </div>
    )
}

export default TestdataOutcomeTable;

TestdataOutcomeTable.propTypes = { 
    testdataName: PropTypes.string, 
    data: PropTypes.arrayOf(
        PropTypes.object
    ) 
}
