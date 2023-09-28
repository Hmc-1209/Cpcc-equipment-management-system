import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { rentalFormContext } from "../rentalForm";
import { days_in_Month } from "../functions/date";
import { AppContext } from "../../App";

import "../../css/DatePicker.css";

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePicker = () => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  let {
    dueDate,
    setDueDate,
    lendDate,
    setLendDate,
    payDate,
    setPayDate,
    editingItem,
    setEditingItem,
  } = useContext(rentalFormContext);
  let { setAlert, adminRent } = useContext(AppContext);

  useEffect(() => {
    const dateType =
      editingItem === 1 ? lendDate : editingItem === 2 ? dueDate : payDate;

    setYear(dateType[0]);
    setMonth(dateType[1]);
    // eslint-disable-next-line
  }, []);

  const checkDayClass = (year, month, day) => {
    // Check if the day is selected

    const dateType =
      editingItem === 1 ? lendDate : editingItem === 2 ? dueDate : payDate;

    return year === dateType[0] && month === dateType[1] && day === dateType[2]
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
    // Check every dayt elements for selectable or not

    const nowLendDate = new Date(
      lendDate[0] +
        "-" +
        String(lendDate[1]).padStart(2, "0") +
        "-" +
        String(lendDate[2]).padStart(2, "0")
    );

    const specDate = new Date(year, month - 1, day);
    const today = new Date();
    specDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (today > specDate) return false;

    if (!adminRent && editingItem === 2) {
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
    if (editingItem === 3) {
      const nowDueDate = new Date(
        dueDate[0] +
          "-" +
          String(dueDate[1]).padStart(2, "0") +
          "-" +
          String(dueDate[2]).padStart(2, "0")
      );
      const nowPayDate = new Date(
        year +
          "-" +
          String(month).padStart(2, "0") +
          "-" +
          String(day).padStart(2, "0")
      );
      const time = Math.ceil(
        (nowDueDate.getTime() - nowLendDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const time_before_return = Math.ceil(
        (nowDueDate.getTime() - nowPayDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const time_before_start = Math.ceil(
        (nowPayDate.getTime() - nowLendDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (
        (!adminRent && (time < 0 || time > 9)) ||
        time_before_return < 0 ||
        time_before_start < 0
      ) {
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

  const day_conflict = (dateType_1, dateType_2) => {
    // Check if day is conflict, like pay date eariler then start date, return true

    dateType_1 = new Date(
      dateType_1[0] + "-" + dateType_1[1] + "-" + dateType_1[2]
    );
    dateType_2 = new Date(
      dateType_2[0] + "-" + dateType_2[1] + "-" + dateType_2[2]
    );
    if (dateType_1 - dateType_2 > 0) return true;
    return false;
  };

  const selectDate = (day) => {
    // Set due date

    if (editingItem === 1) {
      if (day_conflict([year, month, day], payDate)) {
        setPayDate([year, month, day]);
        setAlert(3);
      }
      setLendDate([year, month, day]);
      setDueDate(lend_due_day_gap(day));
    } else if (editingItem === 2) {
      if (day_conflict(payDate, [year, month, day])) {
        setPayDate([year, month, day]);
        setAlert(3);
      }
      setDueDate([year, month, day]);
    } else {
      setPayDate([year, month, day]);
    }
    closeDatePicker();
  };

  return (
    <div className="datePickerSection">
      <div className="datePickerBack" onClick={() => setEditingItem(0)}></div>
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
    </div>
  );
};

export default DatePicker;
