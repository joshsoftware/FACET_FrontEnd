import React from 'react'
import { AddNewSchedule, ScheduleViewComponent } from '../../../Components/ProjectsComponent/ScheduleComponents';

const ScheduleContainer = (props) => {
    return (
        <div className='w-100'>
            {props.cat==="add"?(
                <AddNewSchedule />  
            ):(
                <ScheduleViewComponent />
            )}
        </div>
    )
}

export default ScheduleContainer;