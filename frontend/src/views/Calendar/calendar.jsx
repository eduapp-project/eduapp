import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import BottomButtons from '../../components/bottomButtons/bottomButtons';
import { styled } from '@mui/material/styles';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  DateNavigator,
  DayView,
  Appointments,
  WeekView,
  Toolbar,
  ViewSwitcher,
  TodayButton,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import DarkModeChanger from '../../components/DarkModeChanger';
import View from './eventsView/View';
import './calendar.css';
import CreateView from './eventsView/CreateView';

export default function Calendar() {
  const [annotations, setAnnotations] = useState([]);
  const [ItsMobileDevice, setItsMobileDevice] = useState(false);
  const [activeEvent, setActiveEvent] = useState({});

  const today = new Date();
  const currentDate = today;

  const getCalendar = async () => {
    let temp = [];
    let annotations = await axios.get(
      'http://localhost:3000/calendar_annotations/'
    );
    for (let e of annotations.data) {
      let id = e.id;
      let startDate = e.annotation_start_date;
      let endDate = e.annotation_end_date;
      let title = e.annotation_title;
      let description = e.annotation_description;
      temp.push({
        id: id,
        startDate: startDate,
        endDate: endDate,
        title: title,
        description: description,
      });
    }
    setAnnotations(temp);
  };

  const getCalendarEvent = (eventId) => {
    for (let event of annotations) {
      if (event.id === eventId) {
        setActiveEvent(event);
        break;
      }
    }
  };
  const openCreate = async () => {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = 'flex';
    const backgroundCalendar =
      document.getElementsByClassName('background-shadow')[0];
    const calendar = document.getElementsByClassName('calendar')[0];
    backgroundCalendar.style.display = 'none';
    calendar.style.position = 'fixed';
    setTimeout(() => {
      backgroundCalendar.style.display = 'block';
    }, 100);
    setTimeout(() => {
      chatBox.classList.add('chat-box-opened');
      chatBox.classList.remove('calendar-view-create-hidden');
    }, 400);
  };

  const showEventView = async (eventId) => {
    getCalendarEvent(eventId);
    document
      .getElementsByClassName('calendar-view-main-container')[0]
      .classList.remove('calendar-view-hidden');
  };

  const StyledDiv = styled('div')(({ theme }) => ({}));
  const Appointment = ({ data, children, style, ...restProps }) => (
    <StyledDiv
      className={`event_${data.id}`}
      onClick={() => {
        showEventView(data.id);
      }}
    >
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          // backgroundColor: data.bgColor,
          borderRadius: '8px',
        }}
      >
        {children}
      </Appointments.Appointment>
    </StyledDiv>
  );
  const checkMediaQueries = () => {
    setInterval(() => {
      if (window.matchMedia('(max-width: 1100px)').matches) {
        DarkModeChanger(localStorage.getItem('darkMode'));
        setItsMobileDevice(true);
      } else {
        setItsMobileDevice(false);
      }
    }, 4000);
  };

  useEffect(() => {
    checkMediaQueries();
    getCalendar();

    DarkModeChanger(localStorage.getItem('darkMode'));
    if (window.matchMedia('(max-width: 1100px)').matches) {
      setItsMobileDevice(true);
    } else {
      setItsMobileDevice(false);
    }
  }, []);

  return (
    <div className="calendar-main-container">
      <Navbar mobile={ItsMobileDevice} location={'calendar'} />
      <section className={ItsMobileDevice ? 'mobileSection' : 'desktopSection'}>
        <div className="calendar">
          <div className="calendar-container">
            <div className="calendar-api">
              <Paper>
                <Scheduler
                  data={annotations}
                  locale={window.navigator.language}
                >
                  <ViewState defaultCurrentDate={currentDate} />
                  <WeekView startDayHour={6} endDayHour={24} />
                  <DayView startDayHour={6} endDayHour={24} />
                  <Toolbar />
                  <DateNavigator />
                  <TodayButton />
                  <ViewSwitcher />
                  <Appointments appointmentComponent={Appointment} />
                  <AppointmentTooltip showCloseButton visible={false} />
                </Scheduler>
              </Paper>
            </div>
          </div>
        </div>
      </section>
      <div className="button-calendar-option" onClick={openCreate}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </div>
      <div className="background-shadow"></div>
      <View data={activeEvent} />
      <CreateView />
      <BottomButtons mobile={ItsMobileDevice} location={'calendar'} />
    </div>
  );
}
