import React, { useContext, useState, useEffect } from "react";
import { validate, get_rental_forms_by_serial_number } from "../../../requests";
import { AppContext } from "../../../App";

import Loading from "../../functions/loading";

import "../../../css/equipmentInventory/equipmentInventoryRentalForm.css";

const EquipmentInventoryRentalForm = () => {
  const [rentalForms, setRentalForms] = useState([]);

  let { loading, setLoading, focusItemRF, eIRFData, logOut } =
    useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    const valid = async () => {
      const result = await validate();
      if (!result) logOut();
    };

    valid();

    const getDatas = async () => {
      try {
        const result = await get_rental_forms_by_serial_number(eIRFData);
        if (result) {
          setRentalForms(result);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDatas();

    //eslint-disable-next-line
  }, []);
  console.log(rentalForms);
  return (
    <>
      {!loading ? (
        <>
          <div className="equipmentInventoryRentalFormsPage">
            <div className="item_Serial_Number">物品 : {focusItemRF}</div>
            {rentalForms.map((rentalForm) => (
              <div className="rental_form">
                <div className="rental_st_name">
                  租借者姓名：<p>{rentalForm.student_name}</p>
                </div>
                <div className="rental_st_id">
                  租借者學號：<p>{rentalForm.student_id}</p>
                </div>
                <div className="rental_st_phone">
                  電話：<p>{rentalForm.phone_number}</p>
                </div>
                <div className="rental_lend_date">
                  租借日期：<p>{rentalForm.lend_date}</p>
                </div>
                <div className="rental_pay_date">
                  繳費日期：<p>{rentalForm.pay_date} </p>
                </div>
                <div className="rental_due_date">
                  到期日期：<p>{rentalForm.due_date}</p>
                </div>
                <div className="rental_note">
                  租借事由：<p>{rentalForm.note}</p>
                </div>
                <div className="rental_contact_info">
                  聯絡方式：<p>{rentalForm.contact_info}</p>
                </div>
                <div className="rental_rent">
                  租金：<p>{rentalForm.rent}</p>
                </div>
                <div className="rental_return_date">
                  歸還日期：<p>{rentalForm.return_date}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EquipmentInventoryRentalForm;
