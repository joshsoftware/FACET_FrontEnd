import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom';

import ExecuteComponent from 'Components/ProjectsComponent/ExecuteComponent';

const mapState = ({ execute }) => ({
    results: execute.results,
    data: execute.data,
    isLoading: execute.isLoading,
    isError: execute.isError
})

const ExecuteContainer = () => {
    const { results, data, isLoading, isError } = useSelector(mapState);
    const { projectName, id } = useParams();

    return !isLoading && (isError || Object.entries(data).length===0 )?(
        <Navigate to={`/project/${projectName}/testsuites/${id}`} />
    ):(
        <ExecuteComponent 
            results={results}
            data={data}
        />
    )
}

export default ExecuteContainer;