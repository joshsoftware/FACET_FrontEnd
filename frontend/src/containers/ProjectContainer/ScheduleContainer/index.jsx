import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddNewSchedule, ScheduleViewComponent } from '../../../Components/ProjectsComponent/ScheduleComponents';
import { getAllSchedulesRequest } from '../../../store/Schedule/actions';

const mapState = ({ schedules }) => ({
    isLoading: schedules.isLoading,
    scheduledSuites: schedules.scheduledSuites
})

const ScheduleContainer = (props) => {
    let dispatch = useDispatch();
    const { projectName } = useParams();
    const { isLoading, scheduledSuites } = useSelector(mapState);

    useEffect(() => {
        dispatch(getAllSchedulesRequest({ project: projectName }))
    }, [projectName])
    

    return (
        <div className='w-100'>
            {props.cat==="add"?(
                <AddNewSchedule />  
            ):(
                !isLoading&&<ScheduleViewComponent data={scheduledSuites} />
            )}
        </div>
    )
}

export default ScheduleContainer;