import React, { useState, useEffect, createContext, useContext } from "react";
import "../css/rentalForm.css";
import DatePicker from "./common/DatePicker";
import { AppContext } from "../App";
import alert_message from "./functions/alert";

export const rentalFormContext = createContext(null);
const date = new Date();

const rentalItemsData = [
  { value: "相機1", label: "相機1", disabled: false },
  { value: "相機2", label: "相機2", disabled: true },
  { value: "腳架1", label: "腳架1", disabled: false },
];

export default function RentalForm() {
  let { alert, setAlert } = useContext(AppContext);

  const [rentalItems, setRentalItems] = useState([]);
  const [lendDate, setLendDate] = useState([
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ]);
  const [dueDate, setDueDate] = useState([
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedRentalItem, setSelectedRentalItem] = useState("");

  const setLendDateSelecting = () => setEditingItem(1);
  const setDueDateSelecting = () => setEditingItem(2);

  const submitForm = () => {
    const body = {
      renter_name: document.getElementById("fname").value,
      renter_student_id: document.getElementById("fstudent_id").value,
      rental_item: document.getElementById("formRenterItemSelect").value,
      rental_lend_date: document.getElementById("rentalLendDate").innerText,
      rental_due_date: document.getElementById("rentalDueDate").innerText,
      rental_description: document.getElementById("fdescription").value,
    };
    if (body.renter_name === "" || body.renter_student_id === "") {
      setAlert(1);
    } else if (body.rental_item === "") {
      setAlert(2);
    }
    console.log(body);
  };

  useEffect(() => {
    setTimeout(() => {
      setRentalItems(rentalItemsData);
    }, 500);

    // eslint-disable-next-line
  }, []);

  return (
    <rentalFormContext.Provider
      value={{
        dueDate,
        setDueDate,
        lendDate,
        setLendDate,
        editingItem,
        setEditingItem,
      }}
    >
      <form className="rentalForm">
        <p className="rentalFormTitle">租借表單申請</p>
        {/* Renter name */}
        <div className="formSection30">
          <label htmlFor="fname" className="formLabel">
            租借者姓名
          </label>
          <input type="text" id="fname" className="formRenterInput" />
        </div>
        {/* Renter student id */}
        <div className="formSection30">
          <label htmlFor="fstudent_id" className="formLabel">
            租借者學號
          </label>
          <input type="text" id="fstudent_id" className="formRenterInput" />
        </div>
        {/* Select rental item */}
        <div className="formSection30">
          <label htmlFor="fselectRentalItem" className="formLabel">
            選擇租借項目
          </label>
          <select
            value={selectedRentalItem}
            onChange={(e) => setSelectedRentalItem(e.target.value)}
            className="formRenterItemSelect"
            id="formRenterItemSelect"
          >
            <option value="" disabled>
              選擇以下之一
            </option>
            {rentalItems.map((item) => (
              <option
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="formSection30"></div>
        {/* Lend date */}
        <div className="formSection30">
          <label htmlFor="fselectRentalItem" className="formLabel">
            租借日期
          </label>
          <div
            className="formItemDate"
            onClick={setLendDateSelecting}
            id="rentalLendDate"
          >
            {lendDate[0] +
              "-" +
              String(lendDate[1]).padStart(2, "0") +
              "-" +
              String(lendDate[2]).padStart(2, "0")}
          </div>
        </div>
        {editingItem === 1 && <DatePicker />}
        {/* Due date */}
        <div className="formSection30">
          <label htmlFor="fselectRentalItem" className="formLabel">
            預計歸還日期
          </label>
          <div
            className="formItemDate"
            onClick={setDueDateSelecting}
            id="rentalDueDate"
          >
            {dueDate[0] +
              "-" +
              String(dueDate[1]).padStart(2, "0") +
              "-" +
              String(dueDate[2]).padStart(2, "0")}
          </div>
        </div>
        {editingItem === 2 && <DatePicker />}
        {/* Rental description */}
        <div className="formSection40">
          <label htmlFor="fselectRentalItem" className="formLabel">
            租借事由
          </label>
          <input
            type="text"
            id="fdescription"
            className="formRentalDescription"
          />
        </div>
        {alert !== 0 && (
          <div className="formSection30">{alert_message(alert)}</div>
        )}
        {/* Submit */}
        <div className="formSection100">
          <button className="submitButton" type="button" onClick={submitForm}>
            送出表單
          </button>
        </div>
      </form>
    </rentalFormContext.Provider>
  );
}
