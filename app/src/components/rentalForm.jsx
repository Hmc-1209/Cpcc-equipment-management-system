import React, { useState, useEffect, createContext, useContext } from "react";
import "../css/rentalForm.css";
import DatePicker from "./common/DatePicker";
import { AppContext } from "../App";
import alert_message from "./functions/alert";
import { get_all_items, send_rental_form } from "../requests";
import Loading from "./functions/loading";

export const rentalFormContext = createContext(null);
const date = new Date();

export default function RentalForm() {
  let { alert, setAlert, logOut, adminRent, setAdminRent } =
    useContext(AppContext);

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
  const [payDate, setPayDate] = useState([
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedRentalItem, setSelectedRentalItem] = useState("");
  const [sendingRentalForm, setSendingRentalForm] = useState(false);
  const phone_format = /^09\d{8}$/;

  const setLendDateSelecting = () => setEditingItem(1);
  const setDueDateSelecting = () => setEditingItem(2);
  const setPayDateSelecting = () => setEditingItem(3);

  const get_data = async () => {
    let data = await get_all_items();
    if (data) {
      setRentalItems(data);
    }
    setSelectedRentalItem("");
  };

  const submitForm = async () => {
    setSendingRentalForm(true);
    const renter_name = document.getElementById("fname").value;
    const renter_student_id = document.getElementById("fstudent_id").value;
    const rental_item = document.getElementById("formRenterItemSelect").value;
    const rental_lend_date =
      document.getElementById("rentalLendDate").innerText;
    const rental_due_date = document.getElementById("rentalDueDate").innerText;
    const rental_pay_date = document.getElementById("rentalPayDate").innerText;
    const rental_description = document.getElementById("fdescription").value;
    const renter_phone_number = document.getElementById("fphone_number").value;
    const renter_contact_info = document.getElementById("fcontact_info").value;
    let rent = "";
    if (adminRent) rent = document.getElementById("frentalRent").value;

    if (renter_name === "" || renter_student_id === "") {
      setAlert(1);
      setSendingRentalForm(false);
      return;
    } else if (rental_item === "") {
      setAlert(2);
      setSendingRentalForm(false);
      return;
    } else if (!phone_format.test(renter_phone_number)) {
      setAlert(26);
      setSendingRentalForm(false);
      return;
    } else if (renter_student_id.length > 9) {
      setAlert(29);
      setSendingRentalForm(false);
      return;
    }

    const result = await send_rental_form(
      renter_name,
      renter_student_id,
      rental_lend_date,
      rental_due_date,
      renter_phone_number,
      renter_contact_info,
      rental_description,
      rental_pay_date,
      rent === "" ? 500 : parseInt(rent),
      rentalItems.find((item) => item.item_name === rental_item).item_id
    );

    if (result === 401) logOut();
    if (result) {
      setAlert(27);
      setSendingRentalForm(false);
      get_data();

      document.getElementById("formRenterItemSelect").value = "";
      return;
    }
    setAlert(28);
    setSendingRentalForm(false);
  };

  useEffect(() => {
    get_data();
    // eslint-disable-next-line
  }, []);

  return (
    <rentalFormContext.Provider
      value={{
        dueDate,
        setDueDate,
        lendDate,
        setLendDate,
        payDate,
        setPayDate,
        editingItem,
        setEditingItem,
        adminRent,
        setAdminRent,
      }}
    >
      <form className="rentalForm">
        <p className="rentalFormTitle">租借表單申請</p>
        {adminRent && (
          <p className="rentalFormTitleAdminVer" style={{ margin: 0 }}>
            (管理員版)
          </p>
        )}
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
                key={item.item_name}
                value={item.item_name}
                disabled={item.status === 0 ? false : true}
              >
                {item.item_name}
              </option>
            ))}
          </select>
        </div>
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
            歸還日期
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
        {/* Pay date */}
        <div className="formSection30">
          <label htmlFor="fselectRentalItem" className="formLabel">
            支付租金日期
          </label>
          <div
            className="formItemDate"
            onClick={setPayDateSelecting}
            id="rentalPayDate"
          >
            {payDate[0] +
              "-" +
              String(payDate[1]).padStart(2, "0") +
              "-" +
              String(payDate[2]).padStart(2, "0")}
          </div>
        </div>
        {editingItem === 3 && <DatePicker />}
        {/* Renter phone number */}
        <div className="formSection30">
          <label htmlFor="fphone_number" className="formLabel">
            租借者電話
          </label>
          <input type="text" id="fphone_number" className="formRenterInput" />
        </div>
        {/* Renter contact info */}
        <div className="formSection30">
          <label htmlFor="fcontact_info" className="formLabel">
            聯絡資訊
          </label>
          <input type="text" id="fcontact_info" className="formRenterInput" />
        </div>
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
        {/* Admin rent setting */}
        {adminRent && (
          <div className="formSection30">
            <label htmlFor="frentalRent" className="formLabel">
              租金調整
            </label>
            <input
              type="text"
              id="frentalRent"
              className="formRentalRent"
              placeholder="500"
            />
          </div>
        )}

        {alert !== 0 && alert_message(alert)}
        {/* Submit */}
        <div className="formSection100">
          <button className="submitButton" type="button" onClick={submitForm}>
            送出表單
          </button>
        </div>
        {sendingRentalForm && (
          <div className="back">
            <Loading />
          </div>
        )}
      </form>
    </rentalFormContext.Provider>
  );
}
