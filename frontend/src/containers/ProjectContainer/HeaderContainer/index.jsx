import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { addHeadersRequest, editHeadersRequest, getHeadersRequest } from 'store/Headers/actions';
import { SubComponentsNav } from 'Components/ProjectsComponent';
import { AddNewHeader, HeaderViewComponent } from 'Components/ProjectsComponent/HeaderComponents';

const mapState = ({ headers }) => ({
    headers: headers.headers,
    isLoading: headers.isLoading
})

const INITIAL_FORM_DATA = {
    name: "",
    header: {}
}

const HeaderContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { cat } = props;
    const { projectName, id } = useParams();
    const { headers, isLoading } = useSelector(mapState);
    
    const [selectedItem, setSelectedItem] = useState({});
    const [headersFormData, setHeadersFormData] = useState({ ...INITIAL_FORM_DATA, project: projectName })

    useEffect(() => {
        dispatch(getHeadersRequest({project: projectName}))
    }, [projectName])
    
    useEffect(() => {
        if(headers){
            setSelectedItem(headers.filter(e => e.id==id)[0]);
        }
    }, [headers, id])

    const onFormDataChange = (e) => {
        setHeadersFormData(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    const onKeyValuePairsChange = (result) => {
        setHeadersFormData(p => ({
            ...p,
            header: result
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='edit'){
            dispatch(editHeadersRequest(headersFormData))
        } else {
            dispatch(addHeadersRequest(headersFormData))
        }
    }

    useEffect(() => {
        setHeadersFormData(p => ({
            ...p,
            name: selectedItem?.name || "",
            header: selectedItem?.header || {},
            id: selectedItem?.id || ""
        }))
    }, [selectedItem])
    

    return (
        <>
            <SubComponentsNav 
                title="Headers"
                data={headers}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/headers/new`)}
                onSelectItemUrl={`/project/${projectName}/headers`}
            />
            {cat?(
                <AddNewHeader 
                    cat={cat}
                    isLoading={isLoading}
                    data={headersFormData}
                    onchange={onFormDataChange}
                    onKeyValuePairsChange={onKeyValuePairsChange}
                    handleSubmit={handleSubmit}
                />
            ):(
                <HeaderViewComponent 
                    isLoading={isLoading}
                    data={selectedItem}
                    projectName={projectName}
                />
            )}
        </>
    )
}

export default HeaderContainer;

HeaderContainer.propTypes = {
    cat: PropTypes.string
}
