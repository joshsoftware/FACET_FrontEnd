import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getHeadersRequest } from '../../../store/Headers/actions';
import { SubComponentsNav } from '../../../Components/ProjectsComponent';
import { useState } from 'react';
import { AddNewHeader, HeaderViewComponent } from '../../../Components/ProjectsComponent/HeaderComponents';

const mapState = ({ headers }) => ({
    headers: headers.headers,
    isLoading: headers.isLoading
})

const HeaderContainer = (props) => {
    let dispatch = useDispatch();
    const { projectName, id } = useParams();
    let navigate = useNavigate();
    const { headers, isLoading } = useSelector(mapState);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        dispatch(getHeadersRequest({project: projectName}))
    }, [projectName])
    
    useEffect(() => {
        setSelectedItem(headers.filter(e => e.id==id)[0]);
    }, [headers, id])
    

    return (
        <>
            <SubComponentsNav 
                title="Headers"
                data={headers}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/headers/new`)}
                onSelectItemUrl={`/project/${projectName}/headers`}
            />
            {props.cat==='add'&&<AddNewHeader cat="add"/>}

            {props.cat==='edit'?(
                !isLoading&&selectedItem&&<AddNewHeader cat="edit" data={selectedItem} />
            ):(
                !isLoading&&selectedItem&&<HeaderViewComponent data={selectedItem} />
            )}
        </>
    )
}

export default HeaderContainer;