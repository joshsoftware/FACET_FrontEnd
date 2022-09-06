import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { SubComponentsNav } from 'Components/ProjectsComponent';
import { addEnvironmentsRequest, editEnvironmentsRequest, getEnvironmentsRequest } from 'store/Environments/actions';
import { AddNewEnvironment, EnvironmentViewComponent } from 'Components/ProjectsComponent/EnvironmentComponents';

const mapState = ({ environments }) => ({
    environments: environments.environments,
    isLoading: environments.isLoading
})

const INITIAL_FORM_DATA = {
    name: "",
    url: ""
}

const EnvironmentContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { cat } = props;
    const { projectName, id } = useParams();
    const { environments, isLoading } = useSelector(mapState);
    
    const [selectedItem, setSelectedItem] = useState({});
    const [envFormData, setEnvFormData] = useState({...INITIAL_FORM_DATA, project: projectName});

    useEffect(() => {
        // get all environments
        dispatch(getEnvironmentsRequest({project: projectName}))    
    }, [projectName])

    useEffect(() => {
        // set selectedItem
        if(environments){
            setSelectedItem(environments.filter(e => e.id==id)[0]);
        }
    }, [environments, id])
    
    const onFormDataChange = (e) => {
        setEnvFormData(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='edit'){
            dispatch(editEnvironmentsRequest(envFormData))
        } else {
            dispatch(addEnvironmentsRequest(envFormData))
        }
    }

    useEffect(() => {
        setEnvFormData(p => ({
            ...p,
            name: selectedItem?.name || "",
            url: selectedItem?.url || "",
            id: selectedItem?.id || INITIAL_FORM_DATA.id
        }))
    }, [selectedItem])
    

    return (
        <>
            <SubComponentsNav 
                title="Environments" 
                data={environments}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/environments/new`)}
                onSelectItemUrl={`/project/${projectName}/environments`}
            />
            {cat?(
                <AddNewEnvironment 
                    cat={cat}
                    isLoading={isLoading}
                    data={envFormData}
                    onchange={onFormDataChange}
                    handleSubmit={handleSubmit}
                />
            ):(
                <EnvironmentViewComponent 
                    isLoading={isLoading}
                    data={selectedItem}
                    projectName={projectName}
                />
            )}
        </>
    )
}

export default EnvironmentContainer;

EnvironmentContainer.propTypes = {
    cat: PropTypes.string
}
