const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
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
