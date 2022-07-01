import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SubComponentsNav } from '../../../components/ProjectsComponent';
import { getEnvironmentsRequest } from '../../../store/Environments/actions';
import { AddNewEnvironment, EnvironmentViewComponent } from '../../../components/ProjectsComponent/EnvironmentComponents';

const mapState = ({ environments }) => ({
    environments: environments.environments,
    isLoading: environments.isLoading
})

const EnvironmentContainer = (props) => {
    let dispatch = useDispatch();
    const { projectName, id } = useParams();
    let navigate = useNavigate();
    const { environments, isLoading } = useSelector(mapState);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        dispatch(getEnvironmentsRequest({project: projectName}))    
    }, [projectName])

    useEffect(() => {
        setSelectedItem(environments.filter(e => e.id==id)[0]);
    }, [environments, id])
    

    return (
        <>
            <SubComponentsNav 
                title="Environments" 
                data={environments}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/environments/new`)}
                onSelectItemUrl={`/project/${projectName}/environments`}
            />
            {props.cat==='add'&&<AddNewEnvironment />}

            {!isLoading&&selectedItem&&<EnvironmentViewComponent data={selectedItem} />}

        </>
    )
}

export default EnvironmentContainer;