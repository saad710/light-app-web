import Axios from 'axios';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { key } from '../../../apiKey';
import { ScheduleContext } from '../../../Providers/ScheduleProvider';
const UpdateSchedule = () => {
    const { schedule } = useContext(ScheduleContext)
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleString())
    const handleUpdate = (value) => {
        const id = value.id
        const schedule = value.schedule
        if (moment(schedule).format('MMMM Do YYYY, h:mm:ss a') <= moment(currentDate).format('MMMM Do YYYY, h:mm:ss a')  || moment(currentDate).format('MMMM Do YYYY, h:mm:ss a') === moment(schedule).format('MMMM Do YYYY, h:mm:ss a') ) {
            Axios.get(`${key}update-schedule/${id}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }else{
            console.log('noting to update');
        }
        
    }
    
    
    return (
        <div>
            {
                schedule.map(sche => (
                    <div>
                        {/* {moment(sche.schedule).format('MMMM Do YYYY, h:mm:ss a')} */}
                        <button hidden onClick={handleUpdate(sche)} > update </button>
                    </div>
                ))
            }
        </div>
    );
};

export default UpdateSchedule;