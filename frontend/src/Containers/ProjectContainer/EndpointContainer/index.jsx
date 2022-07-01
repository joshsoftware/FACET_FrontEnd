import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SubComponentsNav } from '../../../components/ProjectsComponent';
import { AddNewEndpoint, EndpointViewComponent } from '../../../components/ProjectsComponent/EndpointComponent';
import { getEndpointsRequest } from '../../../store/Endpoints/actions';

const mapState = ({ endpoints }) => ({
    endpoints: endpoints.endpoints,
    isLoading: endpoints.isLoading
})

const EndpointContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const { projectName, id } = useParams();
    const { endpoints, isLoading } = useSelector(mapState);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        dispatch(getEndpointsRequest({project: projectName}))
    }, [projectName])

    useEffect(() => {
        setSelectedItem(endpoints.filter(e => e.id==id)[0]);
    }, [endpoints, id])
    
    

    return (
        <>
            <SubComponentsNav
                title="Endpoints"
                data={endpoints}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/endpoints/new`)}
                onSelectItemUrl={`/project/${projectName}/endpoints`}
            />
            {props.cat==='add'&&<AddNewEndpoint />}
            
            {!isLoading&&selectedItem&&<EndpointViewComponent data={selectedItem} />}
        </>
    )
}

export default EndpointContainer;