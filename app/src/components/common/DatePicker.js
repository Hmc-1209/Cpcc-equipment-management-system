import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { rentalFormContext } from "../rentalForm";

import { days_in_Month } from "../functions/date";
import "../../css/DatePicker.css";

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePicker = () => {
  let {
    dueDate,
    setDueDate,
    lendDate,
    setLendDate,
    editingItem,
    setEditingItem,
  } = useContext(rentalFormContext);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    editingItem === 1 ? setYear(lendDate[0]) : setYear(dueDate[0]);
    editingItem === 1 ? setMonth(lendDate[1]) : setMonth(dueDate[1]);
    // eslint-disable-next-line
  }, []);

  const checkDayClass = (year, month, day) => {
    // Check if the day is selected
    if (editingItem === 1) {
      return year === lendDate[0] &&
        month === lendDate[1] &&
        day === lendDate[2]
        ? "days daysSelected"
        : "days";
    }
    return year === dueDate[0] && month === dueDate[1] && day === dueDate[2]
      ? "days daysSelected"
      : "days";
  };

  const closeDatePicker = () => {
    // Close the date picker without selecting new date

    setEditingItem(null);
  };

  const prevMonth = () => {
    // Switch date picker to prev month

    const newMonth = month - 1 < 1 ? 12 : month - 1;
    if (newMonth === 12) setYear(year - 1);
    setMonth(newMonth);
  };

  const nextMonth = () => {
    // Switch date picker to next month

    const newMonth = month + 1 > 12 ? 1 : month + 1;
    if (newMonth === 1) setYear(year + 1);
    setMonth(newMonth);
  };

  const dayValid = (day) => {
    if (editingItem === 2) {
      const nowLendDate = new Date(
        lendDate[0] +
          "-" +
          String(lendDate[1]).padStart(2, "0") +
          "-" +
          String(lendDate[2]).padStart(2, "0")
      );
      const nowDueDate = new Date(
        year +
          "-" +
          String(month).padStart(2, "0") +
          "-" +
          String(day).padStart(2, "0")
      );
      const time = Math.ceil(
        (nowDueDate.getTime() - nowLendDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (time < 0 || time > 9) {
        return false;
      }
    }
    return true;
  };

  const lend_due_day_gap = (day) => {
    const nowLendDate = new Date(
      lendDate[0] +
        "-" +
        String(lendDate[1]).padStart(2, "0") +
        "-" +
        String(lendDate[2]).padStart(2, "0")
    );
    const nowDueDate = new Date(
      dueDate[0] +
        "-" +
        String(dueDate[1]).padStart(2, "0") +
        "-" +
        String(dueDate[2]).padStart(2, "0")
    );
    const gap = Math.ceil(
      (nowDueDate.getTime() - nowLendDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    let newDueDate = new Date(
      year +
        "-" +
        String(month).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0")
    );
    newDueDate.setDate(newDueDate.getDate() + gap);

    newDueDate = [
      newDueDate.getFullYear(),
      newDueDate.getMonth() + 1,
      newDueDate.getDate(),
    ];
    return newDueDate;
  };

  const selectDate = (day) => {
    // Set due date
    if (editingItem === 1) {
      setLendDate([year, month, day]);
      setDueDate(lend_due_day_gap(day));
    } else {
      setDueDate([year, month, day]);
    }
    closeDatePicker();
  };

  return (
    <div className="datePickerBase">
      <div className="datePickerYear">
        {year}
        <button className="closeDatePicker" onClick={closeDatePicker}>
          X
        </button>
      </div>

      {/* Month and change buttons */}
      <div style={{ textAlign: "center", display: "flex" }}>
        {/* Prev month button */}
        <button
          className="monthPNbutton"
          style={{ width: "33.3%" }}
          onClick={() => prevMonth()}
          type="button"
        >
          &#x3c;
        </button>
        {/* Month */}
        <div className="datePickerMonth" style={{ width: "33.3%" }}>
          - {month} -
        </div>
        {/* Next month button */}
        <button
          className="monthPNbutton"
          style={{ width: "33.3%" }}
          onClick={nextMonth}
          type="button"
        >
          &#x3e;
        </button>
      </div>

      {/* Days name in a week */}
      <div style={{ display: "flex", textAlign: "center" }}>
        {daysInWeek.map((day) => (
          <div className="daysInWeek" key={day}>
            {day}
          </div>
        ))}
      </div>
      {/* Days elements */}
      {days_in_Month(month - 1, year).map((day) =>
        day > 0 ? (
          dayValid(day) ? (
            <button
              className={checkDayClass(year, month, day)}
              key={day}
              onClick={() => selectDate(day)}
            >
              {day}
            </button>
          ) : (
            <div
              className={checkDayClass(year, month, day) + " disable"}
              key={day}
            >
              {day}
            </div>
          )
        ) : (
          <div className="daysN" key={day}></div>
        )
      )}
    </div>
  );
};

export default DatePicker;
