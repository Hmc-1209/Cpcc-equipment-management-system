import { useState, createContext, useEffect } from "react";
import { validate } from "./requests";

import RentalForm from "./components/rentalForm";
import AdminPage from "./components/adminPage";
import LogIn from "./components/authentication/logIn";
import AdminSettings from "./components/admin/adminSettings";
import ItemClassPage from "./components/admin/itemClass";
import Items from "./components/admin/items";
import ItemModels from "./components/admin/itemModel";
import EquipmentInventory from "./components/admin/equipmentInventory/equipmentInventory";
import EquipmentInventoryModel from "./components/admin/equipmentInventory/equipmentInventoryModelPage";
import EquipmentInventorySerialNumber from "./components/admin/equipmentInventory/equipmentInventorySerialNumber";
import EquipmentInventoryRentalForm from "./components/admin/equipmentInventory/equipmentInventoryRentalForm";
import EquipmentCheck from "./components/admin/equipmentCheck";
import ReviewRentalForm from "./components/admin/reviewRentalForm";

import "./css/App.css";

export const AppContext = createContext(null);

function App() {
  const [mode, setMode] = useState(0);
  const [alert, setAlert] = useState(0);
  const [loading, setLoading] = useState(false);
  const [logOutBtn, setLogOutBtn] = useState(
    window.localStorage.getItem("isLogIn") === "true" ? true : false
  );
  const [eIMData, setEIMData] = useState(null);
  const [eIMLayerData, setEIMLayerData] = useState(null);
  const [eISNData, setEISNData] = useState(null);
  const [eISNLayerData, setEISNLayerData] = useState(null);
  const [eIRFData, setEIRFData] = useState(null);
  const [focusItemRF, setFocusItemRF] = useState(null);
  const [adminRent, setAdminRent] = useState(false);
  const [checkItem, setCheckItem] = useState(false);
  const [itemTMP, setItemTMP] = useState([]);

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
    setLogOutBtn(false);
    setMode(0);
  };

  const back = () => {
    switch (mode) {
      case 1:
        setMode(0);
        return;

      case 2:
        setMode(0);
        return;

      case 3:
        setMode(0);
        return;

      case 10:
        setMode(2);
        return;

      case 11:
        setMode(10);
        return;

      case 12:
        setMode(11);
        return;

      case 13:
        setMode(12);
        return;

      case 20:
        setMode(2);
        return;

      case 21:
        setCheckItem(false);
        setMode(2);
        return;

      case 30:
        setAdminRent(false);
        setMode(2);
        return;

      case 40:
        setMode(2);
        return;

      case 50:
        setMode(2);
        return;

      case 60:
        setMode(2);
        return;

      case 61:
        setMode(60);
        return;

      case 70:
        setMode(2);
        return;

      default:
        setMode(0);
        return;
    }
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
    <AppContext.Provider
      value={{
        alert,
        setAlert,
        setMode,
        logOut,
        loading,
        setLoading,
        setLogOutBtn,
        eIMData,
        setEIMData,
        eIMLayerData,
        setEIMLayerData,
        eISNData,
        setEISNData,
        eISNLayerData,
        setEISNLayerData,
        eIRFData,
        setEIRFData,
        focusItemRF,
        setFocusItemRF,
        adminRent,
        setAdminRent,
        checkItem,
        setCheckItem,
        itemTMP,
        setItemTMP,
      }}
    >
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

        {/* Admin mode */}
        {mode === 2 && <AdminPage />}

        {/* Log in view */}
        {mode === 3 && <LogIn />}

        {/* Equipment inventory */}
        {mode === 10 && <EquipmentInventory />}
        {mode === 11 && <EquipmentInventoryModel />}
        {mode === 12 && <EquipmentInventorySerialNumber />}
        {mode === 13 && <EquipmentInventoryRentalForm />}

        {/* Items check */}
        {mode === 20 && <EquipmentCheck />}
        {mode === 21 && <Items />}

        {/* Admin rental form */}
        {mode === 30 && <RentalForm />}

        {/* Review rental forms */}
        {mode === 40 && <ReviewRentalForm />}

        {/* Item class settings */}
        {mode === 50 && <ItemClassPage />}

        {/* Item settings */}
        {mode === 60 && <Items />}
        {mode === 61 && <ItemModels />}

        {/* Admin settings */}
        {mode === 70 && <AdminSettings />}

        {/* LogOut */}
        {logOutBtn && (
          <button onClick={logOut} className="signOutButton">
            <i className="fa fa-sign-out" />
          </button>
        )}

        {/* Return */}
        {mode !== 0 && mode !== 3 && (
          <button onClick={back} className="returnButton">
            <i className="fa fa-arrow-left" />
          </button>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
