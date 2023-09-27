import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { days_in_Month } from "../functions/date";
import { ReviewRentalFormContext } from "../admin/reviewRentalForm";
import "../../css/DatePicker.css";

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ReturnDatePicker = () => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  let { setEditingItem, setRentalFormReturnDate } = useContext(
    ReviewRentalFormContext
  );

  useEffect(() => {
    const date = new Date();

    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setDay(date.getDate());
    // eslint-disable-next-line
  }, []);

  const checkDayClass = (syear, smonth, sday) => {
    // Check if the day is selected

    return syear === year && smonth === month && sday === day
      ? "days daysSelected"
      : "days";
  };

  const closeDatePicker = () => {
    // Close the date picker without selecting new date

    setEditingItem(false);
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

    const specDate = new Date(year, month - 1, day);
    const today = new Date();
    specDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (specDate - today < 0) return false;

    return true;
  };

  return (
    <div className="datePickerSection">
      <div className="datePickerBack" onClick={() => closeDatePicker()}></div>
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
                onClick={() =>
                  setRentalFormReturnDate(
                    year +
                      "-" +
                      String(month).padStart(2, "0") +
                      "-" +
                      String(day).padStart(2, "0")
                  )
                }
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

export default ReturnDatePicker;
