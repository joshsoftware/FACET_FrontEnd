import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SubComponentsNav } from '../../../Components/ProjectsComponent';
import { getPayloadsRequest } from '../../../store/Payloads/actions';
import { AddNewPayload, PayloadViewComponent } from '../../../Components/ProjectsComponent/PayloadComponents';

const mapState = ({ payloads }) => ({
    payloads: payloads.payloads,
    isLoading: payloads.isLoading
})

const PayloadContainer = (props) => {
    let dispatch = useDispatch();
    const { projectName, id } = useParams();
    let navigate = useNavigate();
    const { payloads, isLoading } = useSelector(mapState);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        dispatch(getPayloadsRequest({project: projectName}))
    }, [projectName])

    useEffect(() => {
        setSelectedItem(payloads.filter(e => e.id==id)[0]);
    }, [payloads, id])
    
    
    return (
        <>
            <SubComponentsNav 
                title="Payloads"
                data={payloads}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/payloads/new`)}
                onSelectItemUrl={`/project/${projectName}/payloads`}
            />
            {props.cat==='add'&&<AddNewPayload cat="add" />}

            {props.cat==='edit'?(
                !isLoading&&selectedItem&&<AddNewPayload cat="edit" data={selectedItem} />
            ):(
                !isLoading&&selectedItem&&<PayloadViewComponent data={selectedItem} />
            )}
        </>
    )
}

export default PayloadContainer;