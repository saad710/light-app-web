import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import events from './events';

const localizer = momentLocalizer(moment)

const SchduleCalender = () => {
    return (
        <div style={{ height: 700 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default SchduleCalender;