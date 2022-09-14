import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import { 
    FormInput, 
    // FormSelect 
} from 'Components/forms/Inputs';
// import DragDropComponent from 'Components/DragDropComponent';
import { ConvertToSlug } from 'utils';
import AddTeststepsModal from './components/AddTeststepsModal';
import BadgeComponent from 'Components/BadgeComponent/index';


const AddNewTestcase = (props) => {
    const { 
        cat, 
        data, 
        isLoading,
        selectedTeststeps,
        onAddTeststepDataSave,
        onchange,
        onRemoveSelectedTeststep,
        // onSelectedTeststepOrderChange,
        onSelectedTeststepsChange,
        onSubmit,
        onTestdataChangeInSelectedTeststep,
        teststepsOptions
    } = props;

    const [showteststepModal, setShowteststepModal] = useState(false);

    const handleChange = (e) => {
        onchange(e.target.name, e.target.value);
    }

    const toggleTeststepModal = () => {
        setShowteststepModal(!showteststepModal);
    }

    return !isLoading && typeof(data)==='object' && Object.entries(data).length &&(
        <Form className='w-100' onSubmit={onSubmit}>
            <ViewComponent
                title="Add New"
                type="save"
                onSave={onSubmit}
            >
                <AddTeststepsModal 
                    show={showteststepModal}
                    onClose={toggleTeststepModal}
                    teststepsOptions={teststepsOptions}
                    onSelectedTeststepsChange={onSelectedTeststepsChange}
                    selectedTeststeps={selectedTeststeps}
                    onAddTeststepDataSave={onAddTeststepDataSave}
                    onRemoveSelectedTeststep={onRemoveSelectedTeststep}
                    onTestdataChangeInSelectedTeststep={onTestdataChangeInSelectedTeststep}
                />
                <FormInput 
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    text={data.name.length!==0?`Your testcase will created as ${ConvertToSlug(data.name)}`:""}
                    isRequired
                    disabled={cat==="edit"}
                />
                <FormInput 
                    type="textarea"
                    rows={2}
                    label="Description"
                    placeholder="Write short description here..."
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                />

                {/* TO DO: Create a button to open modal */}
                <div>
                    <label>Teststeps<span className='text-danger'>*</span></label>
                    <div className='background-secondary w-100 py-3 px-3 rounded'>
                        {selectedTeststeps?.map((step, index) => {
                            return (
                                <BadgeComponent 
                                    key={index}
                                    bg="secondary"
                                    label={step.name}
                                    className="py-2 px-3 me-2"
                                />
                            )
                        })}
                        <small 
                            className={`text-success px-3 ${selectedTeststeps?.length===0 && "d-flex justify-content-center"}`}
                            role='button'
                            onClick={toggleTeststepModal}
                        >
                            + Add More
                        </small>
                    </div>
                </div>
            </ViewComponent>
        </Form>
    )
}

export default AddNewTestcase;

AddNewTestcase.propTypes = {
    cat: PropTypes.string, 
    data: PropTypes.object, 
    isLoading: PropTypes.bool,
    selectedTeststeps: PropTypes.array,
    onchange: PropTypes.func,
    onRemoveSelectedTeststep: PropTypes.func,
    onSelectedTeststepOrderChange: PropTypes.func,
    onSelectedTeststepsChange: PropTypes.func,
    onSubmit: PropTypes.func,
    teststepsOptions: PropTypes.objectOf(
        PropTypes.array
    ),
    onTestdataChangeInSelectedTeststep: PropTypes.func,
    onAddTeststepDataSave: PropTypes.func
}
