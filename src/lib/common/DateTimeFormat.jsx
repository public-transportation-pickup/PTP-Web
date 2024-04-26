import PropTypes from 'prop-types'



const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;
  
    return {
      formattedDate,
      formattedTime,
    };
  };

  const DateTimeFormat = ({ date }) => {
    const { formattedDate, formattedTime } = formatDate(new Date(date));
  
    return (
      <div>
         <span>{formattedTime}</span> - <span>{formattedDate}</span>

      </div>
    );
  };
  
  export default DateTimeFormat;

  DateTimeFormat.propTypes={
    date:PropTypes.any
  }

  export const DateFormat = ({ date }) => {
    const { formattedDate, formattedTime } = formatDate(new Date(date));
  
    return (
        <p className='pl-2'>  <span>{formattedTime}</span> - <span>{formattedDate}</span></p>  
    );
  };

  DateFormat.propTypes={
    date:PropTypes.any
  }

  export const GetDate = ({ date }) => {
    const { formattedDate, formattedTime } = formatDate(new Date(date));
  
    return (
      <div>
        <span>{formattedDate}</span>
      </div>
    );
  };

  GetDate.propTypes={
    date:PropTypes.any
  }
  

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
    const weekdays=days.trim().split(', ');

    const convertedWeekdays = convertWeekdays(weekdays);
  
    return <p>{convertedWeekdays}</p>;
  };

  GetDayOfWeek.propTypes={
    days:PropTypes.string
  }
  
  