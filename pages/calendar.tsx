import React, {useState} from 'react';
import Head from "next/head";
import Layout from "@/layout";
import {Anchor, Breadcrumbs, Container, Paper, Stack, Text, Title} from "@mantine/core";
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {PATH_DASHBOARD} from "@/routes";
import {createEventId, INITIAL_EVENTS} from "@/utils";

const items = [
    {title: 'Dashboard', href: PATH_DASHBOARD.default},
    {title: 'Pages', href: '#'},
    {title: 'Calendar', href: '#'},
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));

function renderEventContent(eventInfo: any) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event: any) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
        </li>
    )
}
function Calendar() {
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    }

    const handleDateSelect = (selectInfo: any) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const handleEventClick = (clickInfo: any) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    const handleEvents = (events: any) => {
        setCurrentEvents(events)
    }

    const renderSidebar = () => {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={weekendsVisible}
                            onChange={handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>
                        {currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout>
                <Container>
                    <Stack>
                        <Title>Settings</Title>
                        <Breadcrumbs>{items}</Breadcrumbs>
                    </Stack>
                    <Paper>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            initialView='dayGridMonth'
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={weekendsVisible}
                            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                            select={handleDateSelect}
                            eventContent={renderEventContent} // custom render function
                            eventClick={handleEventClick}
                            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                            /* you can update a remote database when these fire:
                            eventAdd={function(){}}
                            eventChange={function(){}}
                            eventRemove={function(){}}
                            */
                        />
                    </Paper>
                </Container>
            </Layout>
        </>
    );
}

export default Calendar;