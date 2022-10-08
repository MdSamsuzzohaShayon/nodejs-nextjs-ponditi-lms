/* eslint-disable no-undef */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

const initialDaysOfWeek = [
  { id: 1, day: 'Saturday' },
  { id: 2, day: 'Sunday' },
  { id: 3, day: 'Monday' },
  { id: 4, day: 'Tuesday' },
  { id: 5, day: 'Wednesday' },
  { id: 6, day: 'Thursday' },
  { id: 7, day: 'Friday' },
];
const initialMonthList = [
  {
    id: 1,
    short: 'jan',
    name: 'January',
  },
  {
    id: 2,
    short: 'fab',
    name: 'Fabruary',
  },
  {
    id: 3,
    short: 'mar',
    name: 'March',
  },
  {
    id: 4,
    short: 'apr',
    name: 'April',
  },
  {
    id: 5,
    short: 'may',
    name: 'May',
  },
  {
    id: 6,
    short: 'jun',
    name: 'June',
  },
  {
    id: 7,
    short: 'jul',
    name: 'July',
  },
  {
    id: 8,
    short: 'aug',
    name: 'August',
  },
  {
    id: 9,
    short: 'sep',
    name: 'September',
  },
  {
    id: 10,
    short: 'oct',
    name: 'October',
  },
  {
    id: 11,
    short: 'nov',
    name: 'November',
  },
  {
    id: 12,
    short: 'dec',
    name: 'December',
  },
];

const arrangeMonth = (
  selectedMonth,
  daysInMonth,
  selectedYear,
  selectedDay,
  daysOfWeek,
  selectedDate
) => {
  // Generate month
  const findMonth = initialMonthList.find((iml) => iml.id === selectedMonth);
  const totalDays = daysInMonth(findMonth.short, selectedYear);

  // Invert initial days of week
  const reverseDaysOfMonth = [];
  let invertedLoop = selectedDay - 1;
  // for (let i = unfillDays - 1; i >= 0; i -= 1) {
  for (let i = 0; i < selectedDate; i += 1) {
    // console.log(i);
    if (daysOfWeek[invertedLoop]) {
      reverseDaysOfMonth.push(daysOfWeek[invertedLoop].day);
    }
    if (invertedLoop === 0) {
      invertedLoop = daysOfWeek.length - 1;
    } else {
      invertedLoop -= 1;
    }
  }
  const offsetDaysOfMonth = reverseDaysOfMonth.reverse();

  // console.log(offsetDaysOfMonth);
  // console.log(findDay);

  const allDaysOfMonth = [];
  const firstElement = true;
  let dayLoop = selectedDay - 1;

  for (let i = 0; i < totalDays; i += 1) {
    const newDay = {
      num: i + 1,
    };
    if (i + 1 >= selectedDate) {
      // console.log(daysOfWeek[dayLoop]);

      if (dayLoop >= 6) {
        newDay.day = daysOfWeek[dayLoop].day;
        dayLoop = 0;
        // console.log(daysOfWeek[dayLoop]);
      } else {
        newDay.day = daysOfWeek[dayLoop].day;
        dayLoop += 1;
      }
    } else {
      /**
       * @set days before
       * */
      // console.log(unfillDays);
      if (offsetDaysOfMonth[i]) {
        newDay.day = offsetDaysOfMonth[i];
      }
    }
    // console.log('Array Item', dayLoop);
    allDaysOfMonth.push(newDay);
    // console.log(dayLoop);
  }
  return allDaysOfMonth;
};

const itemStyle = `
                .day-item {
                  flex-basis: 14.28%;
                }
                .day-item:hover {
                  background: #852b3a !important;
                  color: white !important;
                }
                .active-day {
                  background: #852b3a !important;
                  color: white !important;
                }
                .disable-day {
                  background: #bf858e !important
                  color: white !important;
                }
                .today-day {
                  background: #bd8a8a !important;
                }
              
`;

function Calendar(props) {
  const isMounted = true;

  const [daysOfWeek, setDaysOfWeek] = useState(initialDaysOfWeek);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedDay, setSelectedDay] = useState(
    Math.abs(7 - (new Date().getDay() + 2))
  );

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [startOfWeek, setStartOfWeek] = useState(7 - selectedDay);

  function daysInMonth(month, year) {
    const monthNum = new Date(Date.parse(`${month} 1,${year}`)).getMonth() + 1;
    return new Date(year, monthNum, 0).getDate();
  }

  const serielizeMonth = arrangeMonth(
    selectedMonth,
    daysInMonth,
    selectedYear,
    selectedDay,
    daysOfWeek,
    selectedDate
  );
  const [daysOfMonthList, setDayListOfMonth] = useState(serielizeMonth);

  // daysInMonth('feb', 2015)
  // //28

  // daysInMonth('feb', 2008)

  const arrangeDaysOfWeek = () => {};

  const selectedDateHandler = (sde, day) => {
    console.log(sde);
    console.log(day);
  };

  const keyboardHandler = (khe) => {};
  

  const weekContent = () => {
    const cols = [];

    // console.log({selectedDate, sdo: selectedDate+7});
    // console.log(daysOfMonthList);
    for (let i = selectedDate - 1; i < selectedDate - 1 + 7; i += 1) {
      if (daysOfMonthList[i]) {
        cols.push(
          <li
            className={
              i === selectedDate - 1
                ? 'bg-secondary text-primary py-3 day-item text-center rounded-1 vertical-center today-day'
                : 'bg-secondary text-primary py-3 day-item text-center rounded-1 vertical-center'
            }
            style={{ flexBasis: '14.28%' }}
            role="button"
            key={i}
            onKeyUp={keyboardHandler}
            onClick={(sde) =>
              props.onDateChange(sde, {
                date: daysOfMonthList[i].num,
                month: selectedMonth,
                year: selectedYear,
              })
            }
          >
            <span>{daysOfMonthList[i].num}</span>
            <span>{daysOfMonthList[i].day}</span>
            <style jsx>{itemStyle}</style>
          </li>
        );
      }
    }
    return (
      <ul className="d-flex justify-content-between flex-wrap align-items-center list-unstyled weeks w-full">
        {cols}
      </ul>
    );
  };

  return (
    <div className="Calendar">
      <div className="controller d-flex mb-2">
        <button className="previous btn btn-primary" type="button">
          Previous
        </button>
        <button className="previous btn btn-primary" type="button">
          Next
        </button>
      </div>
      <div className="week-calender">{weekContent()}</div>
    </div>
  );
}

export default Calendar;
