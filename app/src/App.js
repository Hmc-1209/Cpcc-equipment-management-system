import "./css/App.css";
import { useState, createContext, useEffect } from "react";

import RentalForm from "./components/rentalForm";
import AdminPage from "./components/adminPage";
export const AppContext = createContext(null);

function App() {
  const [mode, setMode] = useState(0);
  const [alert, setAlert] = useState(0);

  // const selectHomeMode = () => setMode(0);
  const selectRentalFormMode = () => setMode(1);
  const selectAdminMode = () => setMode(2);

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
    <AppContext.Provider value={{ alert, setAlert }}>
      <div className="App">
        <header className="App-header">集美器材管理系統</header>

        {/* Home select mode */}
        {mode === 0 && (
          <div className="homeSelectSection">
            <button
              className="homeSelectButton lightblue"
              onClick={selectRentalFormMode}
            >
              租借表單
            </button>
            <button
              className="homeSelectButton lightyellow"
              onClick={selectAdminMode}
            >
              Admin
            </button>
          </div>
        )}

        {/* Rental form mode */}
        {mode === 1 && <RentalForm />}

        {/* Admin mode */}
        {mode === 2 && <AdminPage />}

        {/* Return */}
        {mode !== 0 && (
          <button onClick={() => setMode(0)} className="returnButton">
            <i className="fa fa-home" />
          </button>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
