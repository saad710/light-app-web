import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../apiKey';
const { createContext } = require("react");


export const ScheduleContext = createContext({ schedule: 'loading' })

const ScheduleProvider = (props) => {
    const [schedule, setSchedule] = useState([])
   
    const { children } = props
    useEffect(() => {
        Axios.get(`${key}all-schedule-mail`)
            .then(res => {
                setSchedule(res.data)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    return (
        <ScheduleContext.Provider value={{ schedule, setSchedule  }}>
            { children}
        </ScheduleContext.Provider>
    );
};

export default ScheduleProvider;