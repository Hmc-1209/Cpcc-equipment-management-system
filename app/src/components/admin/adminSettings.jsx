import React, { useContext } from "react";
import "../../css/adminSettings.css";

import { AppContext } from "../../App";
import alert_message from "../functions/alert";
import { update_admin } from "../../requests";

const AdminSettings = () => {
  let { alert, setAlert, logOut } = useContext(AppContext);

  const changeName = async () => {
    // Change admin name

    const new_name = document.getElementById("newName").value;
    if (new_name === "") {
      setAlert(7);
      return;
    }

    const result = await update_admin("name", new_name);
    if (result === 401) logOut();
    if (result) {
      setAlert(8);
      return;
    }
    setAlert(9);
  };

  const changePassword = async () => {
    // Change admin password

    const old_password = document.getElementById("oldPassword").value;
    const new_password = document.getElementById("newPassword").value;
    const new_password_confirm =
      document.getElementById("newPasswordConfirm").value;

    if (
      old_password === "" ||
      new_password === "" ||
      new_password_confirm === ""
    ) {
      setAlert(10);
      return;
    }

    if (new_password !== new_password_confirm) {
      setAlert(11);
      return;
    }

    const result = await update_admin("password", new_password);
    if (result === 401) logOut();
    if (result) {
      setAlert(12);
      return;
    }
    setAlert(13);
  };

  return (
    <div className="adminSettingsPage">
      <div className="userPasswordSection">管理者名稱變更</div>
      <div className="inputSection">
        <label htmlFor="newName">輸入新名稱：</label>
        <input type="text" name="newName" id="newName" />
      </div>

      <button className="submit" onClick={changeName}>
        確認
      </button>

      <div className="alertSection">
        {alert !== 0 && alert >= 7 && alert <= 9 && alert_message(alert)}
      </div>

      <div className="userPasswordSection">管理者密碼變更</div>

      <div className="passwordSection">
        <label htmlFor="oldPassword">輸入目前密碼：</label>
        <input type="password" name="oldPassword" id="oldPassword" />
      </div>

      <div className="passwordSection">
        <label htmlFor="oldPassword">輸入新密碼：</label>
        <input type="password" name="oldPassword" id="newPassword" />
      </div>

      <div className="passwordSection">
        <label htmlFor="oldPassword">確認新密碼：</label>
        <input type="password" name="oldPassword" id="newPasswordConfirm" />
      </div>

      <button className="submit" onClick={changePassword}>
        提交
      </button>

      <div className="alertSection">
        {alert !== 0 && alert >= 10 && alert <= 13 && alert_message(alert)}
      </div>
    </div>
  );
};

export default AdminSettings;
