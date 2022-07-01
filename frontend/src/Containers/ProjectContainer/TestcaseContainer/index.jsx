import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SubComponentsNav } from '../../../components/ProjectsComponent';
import { getTestcasesRequest } from '../../../store/Testcases/actions';
import { AddNewTestcase, TestcaseViewComponent } from '../../../components/ProjectsComponent/TestcaseComponents';

const mapState = ({ testcases }) => ({
    testcases: testcases.testcases,
    isLoading: testcases.isLoading
})

const TestcaseContainer = (props) => {
    let dispatch = useDispatch();
    const { projectName, id } = useParams();
    let navigate = useNavigate();
    const { testcases, isLoading } = useSelector(mapState);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        dispatch(getTestcasesRequest({project: projectName}))    
    }, [projectName])

    useEffect(() => {
        setSelectedItem(testcases.filter(e => e.id==id)[0]);
    }, [testcases, id])
    

    return (
        <>
            <SubComponentsNav 
                title="Testcases"
                data={testcases}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/testcases/new`)}
                onSelectItemUrl={`/project/${projectName}/testcases`}
            />
            {props.cat==='add'&&<AddNewTestcase />}

            {!isLoading&&selectedItem&&<TestcaseViewComponent data={selectedItem} />}
        </>
    )
}

export default TestcaseContainer;