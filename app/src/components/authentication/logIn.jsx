import React, { useContext } from "react";
import "../../css/logIn.css";
import { AppContext } from "../../App";
import alert_message from "../functions/alert";
import get_access_token from "../../requests";

const LogIn = () => {
  // LogIn component will be rendered when clicking Admin section on home page

  let { setMode, alert, setAlert } = useContext(AppContext);

  const loggingIn = async () => {
    // Log In and set the localStorage datas

    setAlert(6);
    const admin = document.getElementById("admin").value;
    const password = document.getElementById("password").value;
    if (admin === "" || password === "") {
      setAlert(4);
      return;
    }
    const result = await get_access_token(admin, password);
    if (!result) {
      setAlert(5);
      return;
    }
    if (result.access_token) {
      window.localStorage.setItem("access_token", result.access_token);
      window.localStorage.setItem("isLogIn", true);
      setMode(2);
      return;
    }
    window.localStorage.setItem("access_token", null);
    window.localStorage.setItem("isLogIn", false);
  };

  return (
    <div className="LogInPage">
      <form className="LogInView">
        <div className="LogInFormTitle">LogIn</div>

        {/* Admin user account */}
        <label htmlFor="admin" className="LogInFormLabel">
          Admin
        </label>
        <input type="text" className="LogInFormInput" id="admin" name="admin" />

        {/* Admin user password */}
        <label htmlFor="password" className="LogInFormLabel">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="LogInFormInput"
        />

        {/* Submit button */}
        <button className="LogInFormButton" onClick={loggingIn} type="button">
          Submit
        </button>

        {/* Alert message */}
        {alert !== 0 && alert_message(alert)}
      </form>

      <div className="LogInViewBack" onClick={() => setMode(0)}></div>
    </div>
  );
};

export default LogIn;
