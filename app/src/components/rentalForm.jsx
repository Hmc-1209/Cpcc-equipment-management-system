import React, { useState, useEffect, createContext, useContext } from "react";
import { AppContext } from "../App";
import {
  get_all_items,
  get_item_classes,
  get_models,
  send_rental_form,
} from "../requests";

import Loading from "./functions/loading";
import alert_message from "./functions/alert";
import DatePicker from "./common/DatePicker";

import "../css/rentalForm.css";

export const rentalFormContext = createContext(null);

const date = new Date();

export default function RentalForm() {
  const [rentalItems, setRentalItems] = useState([]);
  const [wantedItemBelongsClasses, setWantedItemBelongsClasses] = useState([]);
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
  const [sendingRentalForm, setSendingRentalForm] = useState(false);
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState(false);
  const [rentalSelectedItems, setRentalSelectedItems] = useState([]);
  const [rentalItemModels, setRentalItemModels] = useState([]);
  const student_id_format = /^[a-zA-Z0-9]{9}$/;
  const phone_format = /^09\d{8}$/;

  let { alert, setAlert, logOut, adminRent, setAdminRent } =
    useContext(AppContext);

  const setLendDateSelecting = () => setEditingItem(1);
  const setDueDateSelecting = () => setEditingItem(2);
  const setPayDateSelecting = () => setEditingItem(3);

  const get_data = async () => {
    let data = await get_all_items();
    let classes = await get_item_classes();
    let models = await get_models();
    if (data && classes && models) {
      data.map(
        (item) =>
          (item.class_id = models.find(
            (model) => model.model_id === item.model_id
          ).class_id)
      );
      console.log(data);
      setRentalItems(data);
      setRentalItemModels(models);
    }
  };

  const submitForm = async () => {
    setSendingRentalForm(true);
    const renter_name = document.getElementById("fname").value;
    const renter_student_id = document.getElementById("fstudent_id").value;
    const rental_items = rentalSelectedItems.map(
      (itemName) =>
        rentalItems.find((item) => item.item_name === itemName).item_id
    );
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
    } else if (rental_items.lgneth === 0) {
      setAlert(2);
      setSendingRentalForm(false);
      return;
    } else if (!phone_format.test(renter_phone_number)) {
      setAlert(26);
      setSendingRentalForm(false);
      return;
    } else if (!student_id_format.test(renter_student_id)) {
      setAlert(29);
      setSendingRentalForm(false);
      return;
    }

    let result = null;

    for (let i = 0; i < rental_items.length; i++) {
      result = await send_rental_form(
        renter_name,
        renter_student_id,
        rental_lend_date,
        rental_due_date,
        renter_phone_number,
        renter_contact_info,
        rental_description,
        rental_pay_date,
        rent === "" ? (i === 0 ? 500 : 0) : parseInt(rent),
        rental_items[i]
      );
      if (result === 401) logOut();
    }

    if (result) {
      setAlert(27);
      setSendingRentalForm(false);
      get_data();
      return;
    }
    setAlert(28);
    setSendingRentalForm(false);
  };

  const addRentalSelectedItem = (item) => {
    const new_items = [...rentalSelectedItems, item];
    setRentalSelectedItems(new_items);

    const belongs_model = rentalItems.find(
      (spec_item) => spec_item.item_name === item
    ).model_id;

    const belongs_class = rentalItemModels.find(
      (model) => model.model_id === belongs_model
    ).class_id;
    !adminRent &&
      setWantedItemBelongsClasses([...wantedItemBelongsClasses, belongs_class]);
  };

  const deleteRentalSelectedItem = (item) => {
    const item_class_id = rentalItemModels.find(
      (model) =>
        model.model_id ===
        rentalItems.find((spec_item) => spec_item.item_name === item).model_id
    ).class_id;
    setWantedItemBelongsClasses(
      wantedItemBelongsClasses.filter(
        (itemClass) => itemClass !== item_class_id
      )
    );

    setRentalSelectedItems(
      rentalSelectedItems.filter((spec_item) => spec_item != item)
    );
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
      {/* Rental form section */}
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
        {/* Select rental item(s) */}
        <div className="formSection30">
          <label htmlFor="fselectRentalItem" className="formLabel">
            選擇租借項目
          </label>
          <select
            onChange={(e) => addRentalSelectedItem(e.target.value)}
            className="formRenterItemSelect"
            id="formRenterItemSelect"
          >
            <option value="" disabled selected>
              點擊以新增
            </option>
            {rentalItems.map((item) => (
              <option
                key={item.item_name}
                value={item.item_name}
                disabled={
                  item.status === 0 &&
                  !wantedItemBelongsClasses.includes(item.class_id)
                    ? false
                    : true
                }
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
        {/* Rental items */}
        <div className="rentalFormSelectedItems">
          欲租借項目：
          {rentalSelectedItems.map((item) => (
            <div key={item} className="wantedItem">
              {item}
              <button
                type="button"
                className="deleteWantedItem"
                onClick={() => deleteRentalSelectedItem(item)}
              >
                X
              </button>
            </div>
          ))}
        </div>

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

      {/* Rental available items section */}
      <div className="itemListSection">
        <i
          className={
            "fa fa-chevron-circle-down switchItemShow" + (show ? "" : " hide")
          }
          aria-hidden="true"
          onClick={() => setShow(show ? false : true)}
        ></i>
        <div style={{ width: "100%" }}>顯示可用物品</div>
        {show &&
          rentalItems.map(
            (item) =>
              item.status === 0 && (
                <div className="rentalItemSection">
                  <div className="rentalItemName">{item.item_name}</div>
                  <img
                    src={"data:image/jpeg;base64," + item.image}
                    alt="物品圖片"
                  />
                </div>
              )
          )}
      </div>

      {/* Cppc contact info section */}
      <i
        className="fa fa-info-circle cppcContactInfoBtn"
        aria-hidden="true"
        onClick={() => setContact(true)}
      ></i>
      {contact && (
        <div className="cppcContactInfo">
          <div className="cppcContactInfoSection">
            <p className="cppcName">12nd 集美好攝團</p>
            <div className="cppcInfo">
              <p>Instagram: ntut_photoclub</p>
              <p>社辦地點: 北科大 宏裕科技大樓B205</p>
            </div>
          </div>
          <div
            className="cppcContactInfoBack"
            onClick={() => setContact(false)}
          ></div>
        </div>
      )}
    </rentalFormContext.Provider>
  );
}
