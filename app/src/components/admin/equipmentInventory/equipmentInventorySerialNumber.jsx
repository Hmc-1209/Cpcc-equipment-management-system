import React, { useState, useContext, useEffect } from "react";
import "../../../css/equipmentInventory/equipmentInventorySerialNumber.css";
import { AppContext } from "../../../App";
import { get_items_in_model, validate } from "../../../requests";
import Loading from "../../functions/loading";

const EquipmentInventorySerialNumber = () => {
  const [items, setItems] = useState([]);

  let {
    loading,
    setLoading,
    eISNData,
    eISNLayerData,
    setEIRFData,
    setFocusItemRF,
    setMode,
    logOut,
  } = useContext(AppContext);

  const itemStatusClassName = (status) => {
    switch (status) {
      case 0:
        return "";

      case 1:
        return " green";

      case 2:
        return " red";

      default:
        return "";
    }
  };

  useEffect(() => {
    setLoading(true);
    const valid = async () => {
      const result = await validate();
      if (!result) logOut();
    };

    valid();

    const getDatas = async () => {
      try {
        const result = await get_items_in_model(eISNData);
        if (result) {
          setItems(result);
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

  return (
    <>
      {!loading ? (
        <>
          <div className="equipmentInventoryItemsPage">
            <div className="itemModelName">
              型號 :{" "}
              {eISNLayerData.find((d) => d.model_id === eISNData).model_name}
            </div>
            <div className="itemSection">
              {items.map((item) => (
                <div
                  className="item_SerialNumber"
                  onClick={() => {
                    setEIRFData(item.item_id);
                    setFocusItemRF(item.serial_number);
                    setMode(13);
                  }}
                >
                  <div
                    className={"item_Name" + itemStatusClassName(item.status)}
                  >
                    {item.serial_number}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EquipmentInventorySerialNumber;
