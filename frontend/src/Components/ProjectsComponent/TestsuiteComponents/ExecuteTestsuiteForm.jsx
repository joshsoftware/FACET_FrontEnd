import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { getEnvironmentsRequest } from '../../../store/Environments/actions';
import { addExecuteRequest } from '../../../store/Execute/actions';
import { ViewComponent } from '../../CustomComponents';
import { FormSelect } from '../../forms/Inputs';

const mapState = ({ environments }) => ({
    environments: environments.environments,
    isLoading: environments.isLoading
})

const ExecuteTestsuiteForm = ({ data }) => {
    let navigate = useNavigate();
    const { projectName } = useParams();
    let dispatch = useDispatch();
    const { environments, isLoading } = useSelector(mapState);
    const [options, setOptions] = useState([]);
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        dispatch(getEnvironmentsRequest({ project: projectName }));
    }, [projectName])

    useEffect(() => {
        let env_options = [];
        environments.forEach(ele => {
            env_options.push({value: ele.id, label: ele.name})
        })
        setOptions(env_options);
    }, [environments])

    const handleExecute = () => {
        dispatch(addExecuteRequest({testsuite: data, environment: selectedItem}));
        navigate(`/project/${projectName}/execute/${data.id}`)
    }
    
    

    return (
        <ViewComponent
            disabledHeader
        >
            <small><b>Execute Testsuite</b></small>
            <div className='d-flex align-items-center'>
                <Col md={6}>
                    <Select
                        placeholder="Select Environment..."
                        options={options}
                        onChange={e => setSelectedItem(e.value)}
                    />
                </Col>
                <Button
                    variant='success'
                    onClick={handleExecute}
                    className="mx-2"
                    disabled={!selectedItem}
                >
                    Execute
                </Button>
            </div>
        </ViewComponent>
    )
}

export default ExecuteTestsuiteForm;