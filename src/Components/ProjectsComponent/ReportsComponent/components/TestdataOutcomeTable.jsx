import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { EyeFill } from 'react-bootstrap-icons';

import BadgeComponent from 'Components/BadgeComponent';
import TestdatOutcomeModal from './TestdatOutcomeModal';
import TableComponent from 'Components/CustomComponents/TableComponent/index';

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
            <TableComponent
                striped
                bordered
                headings={[
                    "#",
                    "Field Name",
                    "Field Type",
                    "Status",
                    "Errors",
                    ""
                ]}
            >
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
            </TableComponent>
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
