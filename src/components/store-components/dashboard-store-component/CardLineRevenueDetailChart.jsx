import { useEffect, useState } from "react";


export default function CardLineRevenueDetailChart() {
    const [array, setArray] = useState([]);

    useEffect(() => {
      const currentDate = new Date();
      let count = 0;
  
      while (count < 10 && array.length===10) {
        const date = new Date();
        date.setDate(currentDate.getDate() - count);
        setArray([...array,date])
        count++;
      }
     // setArray(newArray);
    }, []);
  return (
    <div>CardLineRevenueDetailChart</div>
  )
}
