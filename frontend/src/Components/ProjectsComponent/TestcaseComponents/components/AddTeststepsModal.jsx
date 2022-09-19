import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import { CustomModal } from 'Components/CustomComponents';
import SelectedTeststepComponent from './SelectedTeststepComponent';
import { SaveButton } from 'Components/forms/Buttons/index';

const AddTeststepsModal = (props) => {
    const { 
        show,
        onClose,
        onAddTeststepDataSave,
        onRemoveSelectedTeststep,
        onSelectedTeststepsChange,
        selectedTeststeps,
        teststepsOptions,
        onTestdataChangeInSelectedTeststep
    } = props;

    const onSave = () => {
        onAddTeststepDataSave();
        onClose();
    }

    return (
        <CustomModal show={show} onClose={onClose} size="lg" title="Edit Teststeps in Testcase">
            <CustomModal.Body>
                <Row>
                    <Col md={4} className="border-end">
                        <h6 className='text-center'>Teststeps</h6>
                        <hr />
                        {teststepsOptions?.updatedOptions.map((item, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="w-100 py-1 px-3 rounded"
                                    onClick={() => onSelectedTeststepsChange(item?.name, item)}
                                >
                                    {item?.name}
                                </div>
                            )
                        })}
                    </Col>
                    <Col md={8}>
                        <h6 className='text-center'>Selected Teststeps</h6>
                        <hr />
                        <div className='background-secondary rounded py-2 px-3'>
                            {selectedTeststeps?.map((item, index) => {
                                return (
                                    <SelectedTeststepComponent 
                                        key={index}
                                        data={item}
                                        index={index}
                                        onRemoveSelectedTeststep={onRemoveSelectedTeststep}
                                        onTestdataChangeInSelectedTeststep={onTestdataChangeInSelectedTeststep}
                                    />
                                )
                            })}
                        </div>
                    </Col>
                </Row>
            </CustomModal.Body>
            <CustomModal.Footer>
                <SaveButton 
                    handleClick={onSave}
                />
            </CustomModal.Footer>
        </CustomModal>
    )
}

export default AddTeststepsModal;

AddTeststepsModal.propTypes = {
    teststepsOptions: PropTypes.object,
    onSelectedTeststepsChange: PropTypes.func,
    selectedTeststeps: PropTypes.array,
    onRemoveSelectedTeststep: PropTypes.func,
    onTestdataChangeInSelectedTeststep: PropTypes.func,
    onAddTeststepDataSave: PropTypes.func,
    show: PropTypes.bool,
    onClose: PropTypes.func
}
