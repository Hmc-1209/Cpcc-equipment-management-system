import "./css/App.css";
import { validate } from "./requests";
import { useState, createContext, useEffect } from "react";

import RentalForm from "./components/rentalForm";
import AdminPage from "./components/adminPage";
import LogIn from "./components/authentication/logIn";
export const AppContext = createContext(null);

function App() {
  const [mode, setMode] = useState(0);
  const [alert, setAlert] = useState(0);

  // const selectHomeMode = () => setMode(0);
  const selectRentalFormMode = () => setMode(1);
  const selectAdminMode = async () => {
    if (await validate()) {
      setMode(2);
      return;
    }

    setMode(3);
  };

  const logOut = () => {
    window.localStorage.setItem("access_token", null);
    window.localStorage.setItem("isLogIn", false);
    setMode(0);
  };

  useEffect(() => {
    if (alert !== 0) {
      const timer = setTimeout(() => {
        setAlert(0);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  return (
    <AppContext.Provider value={{ alert, setAlert, setMode }}>
      <div className="App">
        <header className="App-header">集美器材管理系統</header>

        {/* Home select mode */}
        {(mode === 0 || mode === 3) && (
          <div className="homeSelectSection">
            <button
              className="homeSelectButton primaryColor"
              onClick={selectRentalFormMode}
            >
              租借表單
            </button>
            <button
              className="homeSelectButton primaryColor"
              onClick={selectAdminMode}
            >
              Admin
            </button>
          </div>
        )}

        {/* Rental form mode */}
        {mode === 1 && <RentalForm />}

        {/* Log in view */}
        {mode === 3 && <LogIn />}

        {/* Admin mode */}
        {mode === 2 && <AdminPage />}

        {/* LogOut */}
        {window.localStorage.getItem("isLogIn") === "true" && (
          <button onClick={logOut} className="signOutButton">
            <i class="fa fa-sign-out" />
          </button>
        )}

        {/* Return */}
        {mode !== 0 && mode !== 3 && (
          <button onClick={() => setMode(0)} className="returnButton">
            <i className="fa fa-home" />
          </button>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
