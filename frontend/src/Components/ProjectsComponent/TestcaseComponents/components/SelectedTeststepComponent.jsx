import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';

import FormCheckBox from 'Components/forms/Inputs/FormCheckBox';

const SelectedTeststepComponent = (props) => {
    const { 
        data, 
        index, 
        onRemoveSelectedTeststep, 
        onTestdataChangeInSelectedTeststep 
    } = props;

    const [openCollapse, setOpenCollapse] = useState(false);

    const onChangeTestdata = (e) => {
        let selected_testdata = data?.selected_testdata;
        let value = Number(e.target.name);

        if(selected_testdata?.includes(value)){
            // remove from array
            selected_testdata?.splice(selected_testdata.indexOf(value), 1)
        } else {
            // Add to the array
            selected_testdata?.push(value);
        }

        data.selected_testdata = selected_testdata;
        
        onTestdataChangeInSelectedTeststep(data);
    }

    return (
        <div className="rounded my-2" draggable>
            <div 
                className="bg-white px-4 py-2 rounded  border border-primary d-flex justify-content-between align-items-center"
                onClick={() => setOpenCollapse(!openCollapse)}
            >
                <label>{data.name}</label>
                <Trash3Fill
                    role="button"
                    className="text-danger"
                    onClick={() => onRemoveSelectedTeststep(index)}
                />
            </div>
            <Collapse in={openCollapse}>
                <div className='bg-white py-2 px-4 border rounded border-primary border-top-0 text-break'>
                    {data?.testdata?.map((item, index) => {
                        return (
                            <div key={index}>
                                <FormCheckBox 
                                    label={item.name}
                                    name={item.id}
                                    value={data?.selected_testdata?.includes(item.id)}
                                    handlechange={onChangeTestdata}
                                />
                            </div>
                        )
                    })}
                </div>
            </Collapse>
        </div>
    )
}

export default SelectedTeststepComponent;

SelectedTeststepComponent.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    onRemoveSelectedTeststep: PropTypes.func,
    onTestdataChangeInSelectedTeststep: PropTypes.func
}
