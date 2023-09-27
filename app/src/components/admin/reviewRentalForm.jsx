import React, { useContext, useEffect, useState, createContext } from "react";
import { AppContext } from "../../App";
import {
  under_review_rental_forms,
  renting_rental_forms,
  update_rental_form_status,
  delete_rental_form,
  get_all_items,
} from "../../requests";
import Loading from "../functions/loading";
import "../../css/reviewRentalForms.css";
import "../../css/equipmentInventory/equipmentInventoryRentalForm.css";
import alert_message from "../functions/alert";
import ReturnDatePicker from "../common/ReturnDatePicker";
export const ReviewRentalFormContext = createContext();

const ReviewRentalForm = () => {
  const [underReviewRentalForms, setUnderReviewRentalForms] = useState([]);
  const [rentingRentalForms, setRentingRentalForms] = useState([]);
  const [reviewMode, setReviewMode] = useState(1);
  const [updateRentalForm, setUpdateRentalForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [items, setItems] = useState([]);

  let { loading, setLoading, alert, setAlert, logOut } = useContext(AppContext);

  const setReturnDateSelecting = (rental_id) => setEditingItem(rental_id);

  const updateRentalFormStatus = async (rental_id, status) => {
    setUpdateRentalForm(rental_id);

    let result = null;
    let return_date = "";

    if (status === 2) {
      return_date = document.getElementById(
        "return_date" + rental_id
      ).innerText;
    }

    if (status === 2 && (!return_date || return_date === "點擊來設定")) {
      setAlert(38);
      setUpdateRentalForm(false);
      return;
    }

    if (status === 1)
      result = await update_rental_form_status(rental_id, status);
    else
      result = await update_rental_form_status(rental_id, status, return_date);

    if (result === 401) logOut();

    if (!result) {
      setAlert(37);
    } else {
      if (status === 1) {
        const rental_form = underReviewRentalForms.find(
          (form) => form.rental_id === rental_id
        );
        setUnderReviewRentalForms(
          underReviewRentalForms.filter((form) => form.rental_id !== rental_id)
        );
        setRentingRentalForms([...rentingRentalForms, rental_form]);
      } else {
        setRentingRentalForms(
          rentingRentalForms.filter((form) => form.rental_id !== rental_id)
        );
      }
    }

    setUpdateRentalForm(false);
    return;
  };

  const deleteRentalForm = async (rental_id, type) => {
    setUpdateRentalForm(rental_id);
    const result = await delete_rental_form(rental_id);

    if (result === 401) logOut();

    if (!result) {
      setAlert(38);
    } else {
      if (type === 1) {
        setUnderReviewRentalForms(
          underReviewRentalForms.filter((form) => form.rental_id !== rental_id)
        );
      } else {
        setRentingRentalForms(
          rentingRentalForms.filter((form) => form.rental_id !== rental_id)
        );
      }
    }

    setUpdateRentalForm(false);
    return;
  };

  const setRentalFormReturnDate = (date) => {
    const updatedForms = rentingRentalForms.map((form) => {
      if (form.rental_id === editingItem) {
        return {
          ...form,
          return_date: date,
        };
      } else {
        return form;
      }
    });

    setRentingRentalForms(updatedForms);
    setEditingItem(false);
  };

  useEffect(() => {
    setLoading(true);

    const fetch_datas = async () => {
      const fetch_under_review_rental_forms = await under_review_rental_forms();
      const fetch_renting_forms = await renting_rental_forms();
      const fetch_items = await get_all_items();

      if (
        !fetch_under_review_rental_forms ||
        !fetch_renting_forms ||
        !fetch_items
      ) {
        setAlert(36);
        setLoading(false);
        return;
      }
      setUnderReviewRentalForms(fetch_under_review_rental_forms);
      setRentingRentalForms(fetch_renting_forms);
      setItems(fetch_items);
      setLoading(false);
    };

    fetch_datas();
    //eslint-disable-next-line
  }, []);

  return (
    <ReviewRentalFormContext.Provider
      value={{ editingItem, setEditingItem, setRentalFormReturnDate }}
    >
      {loading === false ? (
        <>
          <div className="reviewRentalFormsPage">
            {/* Reviewing mode select buttons */}
            <button
              className={
                "reviewModeBtn" + (reviewMode === 1 ? " selectedMode" : "")
              }
              onClick={() => {
                reviewMode !== 1 && setReviewMode(1);
              }}
            >
              待審核
            </button>
            <button
              className={
                "reviewModeBtn" + (reviewMode === 2 ? " selectedMode" : "")
              }
              onClick={() => {
                reviewMode !== 2 && setReviewMode(2);
              }}
            >
              租借中
            </button>
            {reviewMode === 1 ? (
              <>
                {underReviewRentalForms.map((form) => (
                  <div className="form" key={form.rental_id}>
                    <div className="rental_st_name">
                      租借者姓名：<p>{form.student_name}</p>
                    </div>
                    <div className="rental_st_id">
                      租借者學號：<p>{form.student_id}</p>
                    </div>
                    <div className="rental_st_phone">
                      電話：<p>{form.phone_number}</p>
                    </div>
                    <div className="rental_lend_date">
                      租借日期：<p>{form.lend_date}</p>
                    </div>
                    <div className="rental_pay_date">
                      繳費日期：<p>{form.pay_date} </p>
                    </div>
                    <div className="rental_due_date">
                      到期日期：<p>{form.due_date}</p>
                    </div>
                    <div className="rental_note">
                      租借事由：<p>{form.note}</p>
                    </div>
                    <div className="rental_contact_info">
                      聯絡方式：<p>{form.contact_info}</p>
                    </div>
                    <div className="rental_rent">
                      租金：<p>{form.rent}</p>
                    </div>
                    <div className="rental_item">
                      租借物品：
                      <p>
                        {
                          items.find(
                            (item) => item.item_name === form.item_name
                          ).item_name
                        }
                      </p>
                    </div>

                    {/* Setting rental form status buttons */}
                    <div className="functionBtns">
                      <div
                        className="approveBtn"
                        onClick={() =>
                          updateRentalFormStatus(form.rental_id, 1)
                        }
                      >
                        開始租借
                      </div>
                      <div
                        className="deleteFormBtn"
                        onClick={() => deleteRentalForm(form.rental_id, 1)}
                      >
                        刪除請求
                      </div>
                    </div>
                    {updateRentalForm && (
                      <div className="back">
                        {updateRentalForm === form.rental_id && <Loading />}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>
                {rentingRentalForms.map((form) => (
                  <div className="form" key={form.rental_id}>
                    <div className="rental_st_name">
                      租借者姓名：<p>{form.student_name}</p>
                    </div>
                    <div className="rental_st_id">
                      租借者學號：<p>{form.student_id}</p>
                    </div>
                    <div className="rental_st_phone">
                      電話：<p>{form.phone_number}</p>
                    </div>
                    <div className="rental_lend_date">
                      租借日期：<p>{form.lend_date}</p>
                    </div>
                    <div className="rental_pay_date">
                      繳費日期：<p>{form.pay_date} </p>
                    </div>
                    <div className="rental_due_date">
                      到期日期：<p>{form.due_date}</p>
                    </div>
                    <div className="rental_note">
                      租借事由：<p>{form.note}</p>
                    </div>
                    <div className="rental_contact_info">
                      聯絡方式：<p>{form.contact_info}</p>
                    </div>
                    <div className="rental_rent">
                      租金：<p>{form.rent}</p>
                    </div>
                    <div className="rental_item">
                      租借物品：
                      <p>
                        {
                          items.find(
                            (item) => item.item_name === form.item_name
                          ).item_name
                        }
                      </p>
                    </div>
                    <div className="rental_return_date">
                      歸還日期：
                      <p
                        onClick={() => setReturnDateSelecting(form.rental_id)}
                        id={"return_date" + form.rental_id}
                      >
                        {form.return_date === null
                          ? "點擊來設定"
                          : form.return_date}
                      </p>
                    </div>
                    {editingItem === form.rental_id && <ReturnDatePicker />}

                    {/* Setting rental form status buttons */}
                    <div className="functionBtns">
                      <div
                        className="approveBtn"
                        onClick={() =>
                          updateRentalFormStatus(form.rental_id, 2)
                        }
                      >
                        關閉表單
                      </div>
                      <div
                        className="deleteFormBtn"
                        onClick={() => deleteRentalForm(form.rental_id, 2)}
                      >
                        刪除表單
                      </div>
                    </div>
                    {updateRentalForm && (
                      <div className="back">
                        {updateRentalForm === form.rental_id && <Loading />}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="">{alert !== 0 && alert_message(alert)}</div>
        </>
      ) : (
        <Loading />
      )}
    </ReviewRentalFormContext.Provider>
  );
};

export default ReviewRentalForm;
