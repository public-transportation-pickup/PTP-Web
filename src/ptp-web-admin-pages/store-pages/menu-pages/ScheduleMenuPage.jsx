import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugn from '@fullcalendar/interaction';
import * as bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ScheduleMenuPage() {
    const data=[
        {
            Id:1,
            title: "Sales Presentation",
            start: new Date(2024,1,2,10,0),
            end: new Date(2024,1,2,10,30),
        },
        {
            Id:2,
            title: "Sales Presentation 1",
            start: new Date(2024,1,3,10,0),
            end: new Date(2024,1,3,10,30),
        }
    ]
  return (
    <div>
        <Fullcalendar
        plugins={[dayGridPlugin,timeGridPlugin,interactionPlugn]}
        initialView={"dayGridMonth"}
        headerToolbar={
            {
                start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                center: 'title',
                end: 'dayGridMonth timeGridWeek timeGridDay' // will normally be on the right. if RTL, will be on the left
            }
        }
        height={"90vh"}
        events={data}
        eventDidMount={(info)=>{
            return new bootstrap.Popover(info.el,{
                title:info.event.title,
                placement:"auto",
                trigger:"hover",
                customeClass: "popoverStyle",
                content:
                    "<p>Pop up ne</p>",
                html:true

            })
        }}
        />
    </div>
  )
}
