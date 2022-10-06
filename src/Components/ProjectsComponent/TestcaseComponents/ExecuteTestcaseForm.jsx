import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import { FormSelect } from 'Components/forms/Inputs';


const ExecuteTestcaseForm = (props) => {
    const { data, environments, isEnvironmentsLoading, handleExecute } = props;

    const [options, setOptions] = useState([]);
    const [selectedEnv, setSelectedEnv] = useState();

    useEffect(() => {
        let env_options = [];
        environments.forEach(ele => {
            env_options.push({value: ele.id, label: ele.name})
        })
        setOptions(env_options);
    }, [environments])

    const handleEnvChange = (_name, value) => {
        setSelectedEnv(value);
    }
    
    const onExecute = () => {
        handleExecute(data.id, selectedEnv)
    }

    
    return !isEnvironmentsLoading && (
        <ViewComponent
            disabledHeader
        >
            <small><b>Execute Testcase</b></small>
            <div className='d-flex align-items-center'>
                <Col md={6}>
                    <FormSelect 
                        placeholder="Select Environment..."
                        options={options}
                        handlechange={handleEnvChange}
                    />
                </Col>
                <Button
                    variant='success'
                    onClick={onExecute}
                    className="mx-2 mb-3"
                    disabled={!selectedEnv}
                >
                    Execute
                </Button>
            </div>
        </ViewComponent>
    )
}

export default ExecuteTestcaseForm;

ExecuteTestcaseForm.propTypes = {
    data: PropTypes.object,
    environments: PropTypes.array, 
    isEnvironmentsLoading: PropTypes.bool,
    handleExecute: PropTypes.func
}
