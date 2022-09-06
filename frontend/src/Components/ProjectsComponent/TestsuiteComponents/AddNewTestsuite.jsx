import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import { FormInput, FormSelect } from 'Components/forms/Inputs';
import DragDropComponent from 'Components/DragDropComponent';
import { ConvertToSlug } from 'utils';


const AddNewTestsuite = (props) => {
    const { 
        cat, 
        data, 
        isLoading,
        selectedTestcases,
        onchange,
        onRemoveSelectedTestcase,
        onSelectedTestcaseOrderChange,
        onSelectedTestcasesChange,
        onSubmit,
        testcasesOptions
    } = props;

    const handleChange = (e) => {
        onchange(e.target.name, e.target.value);
    }

    return !isLoading && typeof(data)==='object' && Object.entries(data).length &&(
        <Form className='w-100' onSubmit={onSubmit}>
            <ViewComponent
                title="Add New"
                type="save"
                onSave={onSubmit}
            >
                <FormInput 
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    handlechange={handleChange}
                    text={data.name.length!==0&&`Your testsuite will created as ${ConvertToSlug(data.name)}`}
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
                    handlechange={handleChange}
                />
                <div>
                    <label>Testcases<span className='text-danger'>*</span></label>
                    <div className=' background-secondary rounded'>
                        <div className='p-2'>
                            <DragDropComponent 
                                data={selectedTestcases}
                                onChange={onSelectedTestcaseOrderChange}
                                itemClass="bg-white px-4 py-2 rounded my-2 border border-primary"
                                dragClass="background-primary px-4 py-2 rounded border border-primary"
                                onDelete={onRemoveSelectedTestcase}
                            />
                        </div>
                        <FormSelect
                            name="array_of_testcases"
                            options={testcasesOptions.updatedOptions}
                            handlechange={onSelectedTestcasesChange}
                            value={selectedTestcases}
                            hideValues
                            isMulti
                            isRequired
                            className="mb-0"
                        />
                    </div>
                </div>

            </ViewComponent>
        </Form>
    )
}

export default AddNewTestsuite;

AddNewTestsuite.propTypes = {
    cat: PropTypes.string, 
    data: PropTypes.object, 
    isLoading: PropTypes.bool,
    selectedTestcases: PropTypes.array,
    onchange: PropTypes.func,
    onRemoveSelectedTestcase: PropTypes.func,
    onSelectedTestcaseOrderChange: PropTypes.func,
    onSelectedTestcasesChange: PropTypes.func,
    onSubmit: PropTypes.func,
    testcasesOptions: PropTypes.objectOf(
        PropTypes.array
    )
}
