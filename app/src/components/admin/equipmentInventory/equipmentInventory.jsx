import React, { useState, useContext, useEffect } from "react";
import { get_item_classes, validate } from "../../../requests";
import Loading from "../../functions/loading";
import { AppContext } from "../../../App";
import alert_message from "../../functions/alert";
import "../../../css/equipmentInventory/equipmentInventory.css";

const EquipmentInventory = () => {
  let {
    logOut,
    loading,
    setLoading,
    alert,
    setAlert,
    setEIMData,
    setMode,
    setEIMLayerData,
  } = useContext(AppContext);

  const [itemClasses, setItemClasses] = useState([]);

  useEffect(() => {
    setLoading(true);
    const valid = async () => {
      const result = await validate();
      if (!result) logOut();
    };

    valid();

    const getItemClasses = async () => {
      try {
        const data = await get_item_classes();
        if (!data) {
          setAlert(30);
          return;
        }
        if (Array.isArray(data)) setItemClasses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getItemClasses();

    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!loading ? (
        <div>
          {alert !== 0 && alert_message(alert)}
          <div className="equipmentInventoryPage">
            {Array.isArray(itemClasses) &&
              itemClasses.map((itemClass) => (
                <div
                  className="itemClass"
                  onClick={() => {
                    setEIMData(itemClass.class_id);
                    setEIMLayerData(itemClasses);
                    setMode(11);
                  }}
                >
                  {itemClass.class_name}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EquipmentInventory;
