import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Loading from "../functions/loading";
import {
  get_item_classes,
  get_items_in_stock,
  get_models,
  validate,
} from "../../requests";

import alert_message from "../functions/alert";

import "../../css/equipmentCheck.css";

const EquipmentCheck = () => {
  const [items, setItems] = useState([]);
  const [models, setModels] = useState([]);
  const [itemClasses, setItemClasses] = useState([]);
  const [visible, setVisible] = useState([]);
  const [all_check, set_all_check] = useState(false);
  let checkedItem = [];

  let {
    loading,
    setLoading,
    alert,
    setAlert,
    logOut,
    setMode,
    setItemTMP,
    setCheckItem,
  } = useContext(AppContext);

  const checkingItem = (item_id) => {
    if (checkedItem.find((item) => item === item_id)) {
      checkedItem = checkedItem.filter((item) => item !== item_id);
    } else {
      checkedItem = [...checkedItem, item_id];
    }
  };

  const confirm = async () => {
    const need_manually_adjust_items = items
      .filter((item) => {
        return !checkedItem.includes(item.item_id);
      })
      .map((item) => item.item_id);
    if (need_manually_adjust_items.length !== 0) {
      setItemTMP(need_manually_adjust_items);
      setCheckItem(true);
      setMode(21);
      return;
    }
    set_all_check(true);
  };

  useEffect(() => {
    setLoading(true);
    const get_datas = async () => {
      if (!(await validate())) {
        logOut();
      }

      let fetch_items = await get_items_in_stock();
      const fetch_models = await get_models();
      const fetch_item_classes = await get_item_classes();

      if (!fetch_items || !fetch_models || !fetch_item_classes) {
        setAlert(35);
        setLoading(false);
        return;
      }

      setItems(fetch_items);
      setModels(fetch_models);
      setItemClasses(fetch_item_classes);
      const visible = [];
      fetch_item_classes.map((itemClass) =>
        visible.push({ class_id: itemClass.class_id, value: 1 })
      );
      setVisible(visible);
      setLoading(false);
    };

    get_datas();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {alert !== 0 && alert_message(alert)}
          {!all_check ? (
            <div className="equipmentCheckPage">
              {itemClasses.map((itemClass) => (
                <div key={"class_id_" + itemClass.class_id}>
                  <div className="classSection">· {itemClass.class_name}</div>
                  {visible.find((obj) => obj.class_id === itemClass.class_id)
                    .value === 1 &&
                    models
                      .filter((model) => model.class_id === itemClass.class_id)
                      .map((model) => (
                        <div key={"model_id_" + model.model_id}>
                          <div className="modelSection">{model.model_name}</div>
                          {items
                            .filter(
                              (item) => item.model_name === model.model_name
                            )
                            .map((item) => (
                              <div
                                className="itemNameAndSerialNumber"
                                key={"item_id_" + item.item_id}
                              >
                                <input
                                  type="checkbox"
                                  className="item_check"
                                  onChange={() => checkingItem(item.item_id)}
                                />
                                <div className="item_name">
                                  {item.item_name}
                                </div>{" "}
                                <div className="pad">:</div>
                                {"  "}
                                <div className="item_serialnumber">
                                  {item.serial_number}
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                </div>
              ))}
              <button className="check_button" onClick={confirm}>
                確認
              </button>
            </div>
          ) : (
            <div className="all_check">物品清點完成！</div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EquipmentCheck;
