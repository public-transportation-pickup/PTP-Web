import React from 'react';


const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return {
    formattedDate,
    formattedTime,
  };
};

export const GetDate = ({ date }) => {
  const { formattedDate, formattedTime } = formatDate(new Date(date));

  return <span>{formattedDate}</span>;
};

export const DateTimeFormat = ({ date }) => {
  const { formattedDate, formattedTime } = formatDate(new Date(date));

  return (
    <div>
       <span>{formattedTime}</span> - <span>{formattedDate}</span>

    </div>
  );
};

const convertWeekdays = (weekdays) => {
  const mapping = {
    Monday: "T2",
    Tuesday:"T3",
    Wednesday:"T4",
    Thursday: "T5",
    Friday: "T6",
    Saturday: "T7",
    Sunday: "CN"
  };

  return weekdays.map((day) => mapping[day]).join(", ");
};

export const GetDayOfWeek = ({days}) => {
  console.log(days);
  if(days!==undefined)
  {
    const weekdays=days.trim().split(', ');

    const convertedWeekdays = convertWeekdays(weekdays);
  
    return <p>{convertedWeekdays}</p>;
  }
  
};


