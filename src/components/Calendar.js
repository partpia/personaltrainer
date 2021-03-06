import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import addMinutes from 'date-fns/addMinutes';
import formatISO from "date-fns/formatISO";
import parseISO from "date-fns/parseISO";

function Calendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => {
                if (response.ok)
                    response.json()
                        .then(data => setEvents(data.map(({ activity, date, duration, customer }) => ({
                            title: customer ? activity + '/' + customer.firstname + ' ' + customer.lastname : activity,
                            start: date,
                            end: date ? formatISO(addMinutes(parseISO(date), duration)) : null
                        }))))
                else
                    alert('error')
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div style={{ margin: '30px', width: '95%' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                initialView='dayGridMonth'
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                scrollTime="08:00:00"
                events={events}
                eventColor='#3fa6a6'
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                height={600}
                firstDay={1}
                nowIndicator={true}
            />
        </div>
    );
}

export default Calendar;