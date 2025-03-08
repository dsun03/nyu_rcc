"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from "./calendar.module.css";
import Navbar from "../../components/NavBar";

interface EventType {
  title: string;
  description: string;
  date: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventType[]>([
    { title: "NYU RCC Meetup", date: "2025-03-15", description: "Join us for a fun meetup!" },
    { title: "Speedcubing Tournament", date: "2025-03-20", description: "Compete in our speedcubing tournament!" },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent({
      title: info.event.title,
      description: info.event.extendedProps.description || "No description available",
      date: info.event.start?.toISOString().split("T")[0] || "Unknown date",
    });
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };


  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Upcoming Events</h1>
        <div style={{
          width: "90%",
          maxWidth: "1000px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
        }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            selectable={true}
            editable={false}
            buttonText={{
              today: "Today",
              month: "Month",
              week: "Week",
              day: "Day",
            }}
            eventContent={(arg) => (
              <div style={{
                backgroundColor: "#F76C6C",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                whiteSpace: "normal",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                {arg.event.title}
              </div>
            )}
          />
        </div>

        {selectedEvent && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.eventModal} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.description}</p>
              <button className={styles.modalClose} onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
