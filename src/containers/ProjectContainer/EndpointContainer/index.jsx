import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { SubComponentsNav } from 'Components/ProjectsComponent';
import { AddNewEndpoint, EndpointViewComponent } from 'Components/ProjectsComponent/EndpointComponent';
import { addEndpointsRequest, editEndpointsRequest, getEndpointsRequest } from 'store/Endpoints/actions';

const mapState = ({ endpoints }) => ({
    endpoints: endpoints.endpoints,
    isLoading: endpoints.isLoading
})

const INITIAL_FORM_DATA = {
    name: "", 
    endpoint: ""
}

const EndpointContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    const { cat } = props;
    const { projectName, id } = useParams();
    const { endpoints, isLoading } = useSelector(mapState);

    const [selectedItem, setSelectedItem] = useState({});
    const [endpointFormData, setEndpointFormData] = useState({ ...INITIAL_FORM_DATA, project: projectName });

    useEffect(() => {
        // get all endpoints of project
        dispatch(getEndpointsRequest({project: projectName}))
    }, [projectName])

    useEffect(() => {
        // set selectedItem
        if(endpoints){
            setSelectedItem(endpoints.filter(e => e.id==id)[0]);
        }
    }, [endpoints, id])

    const onFormDataChange = (e) => {
        setEndpointFormData(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='add') {
            dispatch(addEndpointsRequest(endpointFormData));
        } else {
            dispatch(editEndpointsRequest(endpointFormData))
        }
    }
    
    useEffect(() => {
        setEndpointFormData(p => ({
            ...p,
            name: selectedItem?.name || "",
            endpoint: selectedItem?.endpoint || "",
            id: selectedItem?.id || INITIAL_FORM_DATA.id
        }))
    }, [selectedItem])
    


    return (
        <>
            <SubComponentsNav
                title="Endpoints"
                data={endpoints}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/endpoints/new`)}
                onSelectItemUrl={`/project/${projectName}/endpoints`}
            />
            {cat?(
                <AddNewEndpoint 
                    cat={cat} 
                    isLoading={isLoading}
                    data={endpointFormData}
                    onchange={onFormDataChange}
                    handleSubmit={handleSubmit}
                />
            ):(
                <EndpointViewComponent
                    isLoading={isLoading}
                    data={selectedItem}
                    projectName={projectName}
                />
            )}
        </>
    )
}

export default EndpointContainer;

EndpointContainer.propTypes = {
    cat: PropTypes.oneOf(["add", "edit"])
}
