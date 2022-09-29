import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { SubComponentsNav } from 'Components/ProjectsComponent';
import { addPayloadsRequest, editPayloadsRequest, getPayloadsRequest } from 'store/Payloads/actions';
import { AddNewPayload, PayloadViewComponent } from 'Components/ProjectsComponent/PayloadComponents';
import { INITIAL_PAYLOAD_FORM_DATA } from 'constants/appConstants';

const mapState = ({ payloads }) => ({
    payloads: payloads.payloads,
    isLoading: payloads.isLoading
})

const PayloadContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { cat } = props;
    const { projectName, id } = useParams();
    const { payloads, isLoading } = useSelector(mapState);
    
    const [selectedItem, setSelectedItem] = useState({});
    const [payloadsFormData, setPayloadsFormData] = useState({ ...INITIAL_PAYLOAD_FORM_DATA, project: projectName });

    useEffect(() => {
        dispatch(getPayloadsRequest({ project: projectName }))
    }, [projectName])

    useEffect(() => {
        if(payloads.length){
            setSelectedItem(payloads.filter(e => e.id==id)[0]);
        }
    }, [payloads, id])

    const onPayloadFormDataChange = (key, value) => {
        // Accepts key and value of formData
        setPayloadsFormData(p => ({
            ...p,
            [key]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(payloadsFormData)
        if(cat==='add') {
            dispatch(addPayloadsRequest({
                ...payloadsFormData, 
                payload: JSON.parse(payloadsFormData.payload)
            }))
        } else if(cat==='edit') {
            dispatch(editPayloadsRequest({
                ...payloadsFormData,
                parameters: payloadsFormData.parameters, 
                payload: JSON.parse(payloadsFormData.payload)
            }))
        }
    }

    useEffect(() => {
        setPayloadsFormData(p => ({
            ...p,
            name: selectedItem?.name || INITIAL_PAYLOAD_FORM_DATA.name, 
            parameters: selectedItem?.parameters || INITIAL_PAYLOAD_FORM_DATA.parameters, 
            payload: JSON.stringify(selectedItem?.payload) || INITIAL_PAYLOAD_FORM_DATA.payload, 
            expected_outcome: selectedItem?.expected_outcome || INITIAL_PAYLOAD_FORM_DATA.expected_outcome,
            id: selectedItem?.id || INITIAL_PAYLOAD_FORM_DATA.id
        }))
    }, [selectedItem])
    
    return (
        <>
            <SubComponentsNav 
                title="Payloads"
                data={payloads}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/payloads/new`)}
                onSelectItemUrl={`/project/${projectName}/payloads`}
            />
            {cat?(
                <AddNewPayload 
                    cat={cat}
                    isLoading={isLoading}
                    data={payloadsFormData}
                    onchange={onPayloadFormDataChange}
                    handleSubmit={handleSubmit}
                />
            ):(
                <PayloadViewComponent 
                    isLoading={isLoading}
                    data={selectedItem}
                    projectName={projectName}
                />
            )}
        </>
    )
}

export default PayloadContainer;

PayloadContainer.propTypes = {
    cat: PropTypes.oneOf(['add', 'edit'])
}
