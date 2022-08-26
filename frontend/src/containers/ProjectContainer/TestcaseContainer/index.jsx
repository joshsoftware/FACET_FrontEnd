import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SubComponentsNav } from '../../../Components/ProjectsComponent';
import { getTestcasesRequest } from '../../../store/Testcases/actions';
import { AddNewTestcase, TestcaseViewComponent } from '../../../Components/ProjectsComponent/TestcaseComponents';
import { getTestdataRequest } from '../../../store/Testdata/actions';

const mapState = ({ testcases, testdata }) => ({
    testcases: testcases.testcases,
    isLoading: testcases.isLoading,
    testdata: testdata.testdata,
})

const TestcaseContainer = (props) => {
    let dispatch = useDispatch();
    const { projectName, id } = useParams();
    let navigate = useNavigate();
    const { testcases, isLoading, testdata } = useSelector(mapState);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        dispatch(getTestcasesRequest({project: projectName}));
    }, [projectName])

    useEffect(() => {
        setSelectedItem(testcases.filter(e => e.id==id)[0]);
        dispatch(getTestdataRequest({testcase: id}));
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
            {props.cat==='add'&&<AddNewTestcase cat='add' />}

            {props.cat==='edit'?(
                !isLoading&&selectedItem&&<AddNewTestcase cat="edit" data={selectedItem} />
            ):(
                !isLoading&&selectedItem!==undefined&&Object.keys(selectedItem).length&&<TestcaseViewComponent data={selectedItem} testdata={testdata} />
            )}
        </>
    )
}

export default TestcaseContainer;