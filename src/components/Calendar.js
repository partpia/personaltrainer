import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import addMinutes from 'date-fns/addMinutes';
import formatISO from "date-fns/formatISO";
import parseISO from "date-fns/parseISO";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function Calendar() {

    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            if (response.ok)
                response.json()
                .then(data => setEvents(data.map(({activity, date, duration, customer }) => ({
                    title : activity + '/' + customer.firstname + ' ' + customer.lastname,
                    start : date,
                    end : formatISO(addMinutes(parseISO(date), duration))
        }))))
                else
                    alert('error')
        })
        .catch(err => console.error(err))
    }, [])

    return (
        <div style={{margin: 'auto', width: '95%'}}>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
                headerToolbar={{
                    left:'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                initialView='listMonth'
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12:false
                }}
                scrollTime="08:00:00"
                events={events}
                eventColor='#3fa6a6'
                eventTimeFormat= {{ 
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12:false
                }}
                height={600}
                firstDay={1}
                nowIndicator={true}
                
            />
        </div>
    );
}

export default Calendar;