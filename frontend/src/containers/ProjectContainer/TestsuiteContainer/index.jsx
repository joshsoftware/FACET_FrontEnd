import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SubComponentsNav } from '../../../Components/ProjectsComponent';
import { getTestsuitesRequest } from '../../../store/Testsuites/actions';
import { AddNewTestsuite, TestsuiteViewComponent } from '../../../Components/ProjectsComponent/TestsuiteComponents';

const mapState = ({ testsuites }) => ({
    testsuites: testsuites.testsuites,
    isLoading: testsuites.isLoading
})

const TestsuiteContainer = (props) => {
    let dispatch = useDispatch();
    const { projectName, id } = useParams();
    let navigate = useNavigate();
    const { testsuites, isLoading } = useSelector(mapState);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        dispatch(getTestsuitesRequest({project: projectName}))    
    }, [projectName])

    useEffect(() => {
        setSelectedItem(testsuites.filter(e => e.id==id)[0]);
    }, [testsuites, id])
   

    return (
        <>
            <SubComponentsNav 
                title="Testsuites"
                data={testsuites}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/testsuites/new`)}
                onSelectItemUrl={`/project/${projectName}/testsuites`}
            />
            {props.cat==='add'&&<AddNewTestsuite />}

            {!isLoading&&selectedItem&&<TestsuiteViewComponent data={selectedItem} />}
        </>
    )
}

export default TestsuiteContainer;