import React, { useContext, useEffect, useState } from "react";
import "../../css/items.css";
import {
  add_item,
  delete_item,
  get_all_items,
  get_models,
  update_item,
} from "../../requests";
import { AppContext } from "../../App";
import Loading from "../functions/loading";
import alert_message from "../functions/alert";

const Items = () => {
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [pad, setPad] = useState(0);
  const [itemUpdating, setItemUpdating] = useState(0);
  const [newItem, setNewItem] = useState(false);
  const [models, setModels] = useState([]);

  let { alert, setAlert, logOut } = useContext(AppContext);

  const itemClassName = (itemStatus) => {
    switch (itemStatus) {
      case 0:
        return " inStock";

      case 1:
        return " renting";

      case 2:
        return " lost";

      default:
        return "";
    }
  };

  const checkActive = (itemStatus, type) => {
    if (itemStatus === 0 && type === "inStock") {
      return " active";
    }
    if (itemStatus === 1 && type === "renting") {
      return " active";
    }
    if (itemStatus === 2 && type === "lost") {
      return " active";
    }
    return "";
  };

  const deleteItem = async (item_id) => {
    setItemUpdating(item_id);
    const result = await delete_item(item_id);

    if (result === 406) {
      setAlert(20);
      setItemUpdating(0);
      return;
    }

    if (result) {
      setItems(await get_all_items());
      setItemUpdating(0);
      return;
    }
    setAlert(19);
    setItemUpdating(0);
    setItemUpdating(0);
  };

  const updateItemStatus = async (item_id, item_status, value) => {
    if (item_status === value) return;

    setItemUpdating(item_id);
    const result = await update_item(item_id, "status", value);

    if (result) {
      setItems(await get_all_items());
      setItemUpdating(0);
      return;
    }
    setAlert(19);
    setItemUpdating(0);
  };

  const addNewItem = async () => {
    setItemUpdating(-1);
    const itemName = document.getElementById("item_name").value;
    const itemSerialNumber =
      document.getElementById("item_serial_number").value;
    const itemDescription = document.getElementById("addItemDescription").value;
    let itemImage = document.getElementById("addItemInputImage");
    const itemModel = document.getElementById("modelSelect").value;

    if (itemName === "" || itemSerialNumber === "") {
      setItemUpdating(0);
      setAlert(22);
      return;
    }

    if (!itemModel || itemModel === "") {
      setItemUpdating(0);
      setAlert(24);
      return;
    }

    if (itemImage.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(itemImage.files[0]);

      const loadImage = () => {
        return new Promise((resolve) => {
          reader.onload = (event) => {
            const image = new Image();
            image.src = event.target.result;

            image.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = 200;
              canvas.height = 150;
              ctx.drawImage(image, 0, 0, 200, 150);
              const resizedBase64 = canvas
                .toDataURL("image/jpeg")
                .substring(23);
              itemImage = resizedBase64;
              resolve();
            };
          };
        });
      };
      await loadImage();
    } else {
      itemImage = "";
    }

    const result = await add_item(
      itemName,
      itemSerialNumber,
      itemDescription,
      itemModel,
      itemImage
    );

    if (result === 401) logOut();

    if (result) {
      const newItems = await get_all_items();
      if (newItems) {
        setItems(newItems);
        setNewItem(false);
      }
      setItemUpdating(0);
      return;
    }
    setItemUpdating(0);
    setAlert(23);
  };

  useEffect(() => {
    const get_items = async () => {
      setItemsLoading(true);
      const result = await get_all_items();
      const models = await get_models();
      if (models) setModels(models);
      setItemsLoading(false);
      if (result) {
        setItems(result);
        return;
      }
      setAlert(18);
    };

    get_items();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const l = (items.length + (newItem === true ? 1 : 0)) % 3;
    if (l === 0) {
      setPad(0);
      return;
    }
    setPad(3 - l);
  }, [items, newItem]);

  return (
    <>
      {itemsLoading === false ? (
        <>
          <div style={{ width: "100%", minHeight: "40px" }}>
            {alert !== 0 && alert_message(alert)}
          </div>
          <div className="itemsPage">
            <button className="addItemBtn" onClick={() => setNewItem(!newItem)}>
              +
            </button>
            {newItem && (
              <div className="itemAdd">
                <label htmlFor="item_name" className="addItemLabel">
                  物品名稱
                </label>
                <input
                  name="item_name"
                  id="item_name"
                  key="item_name"
                  type="text"
                  className="addItemInput"
                />
                <label htmlFor="item_serial_number" className="addItemLabel">
                  物品編號
                </label>
                <input
                  name="item_serial_number"
                  id="item_serial_number"
                  key="item_serial_number"
                  type="text"
                  className="addItemInput"
                />
                <label htmlFor="addItemDescription" className="addItemLabel">
                  物品描述
                </label>
                <input
                  type="text"
                  id="addItemDescription"
                  key="addItemDescription"
                  className="addItemInput"
                  name="addItemDescription"
                />
                <input
                  type="file"
                  id="addItemInputImage"
                  key="addItemInputImage"
                  accept="image/*"
                  className="addItemInputImage"
                />
                <select name="modelSelect" id="modelSelect">
                  <option value="">選擇型號</option>
                  {models.map((model) => (
                    <option key={model.model_id} value={model.model_id}>
                      {model.model_name}
                    </option>
                  ))}
                </select>
                <button
                  className="addItemSubmit"
                  onClick={addNewItem}
                  key="addItemSubmit"
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </button>
                {itemUpdating !== 0 && <div className="back"></div>}
                {itemUpdating === -1 && <Loading classes="itemLoading" />}
              </div>
            )}
            {items.map((item) => (
              <div className="item" key={item.item_id}>
                <div className={"itemName" + itemClassName(item.status)}>
                  {item.item_name}
                </div>
                <div className="itemSerialNumber">{item.serial_number}</div>
                {item.image !== "" ? (
                  <img
                    src={"data:image/jpeg;base64," + item.image}
                    alt="物品圖片"
                  />
                ) : (
                  <div className="itemNoPic">無圖片提供</div>
                )}
                <div>
                  {
                    models.find((model) => model.model_id === item.model_id)[
                      "model_name"
                    ]
                  }
                </div>
                <div className="itemDescription">{item.description}</div>
                <div className="function">
                  <i
                    className={
                      "fa fa-archive inStockBtn" +
                      checkActive(item.status, "inStock")
                    }
                    aria-hidden="true"
                    onClick={() =>
                      updateItemStatus(item.item_id, item.status, 0)
                    }
                  ></i>
                  <i
                    className={
                      "fa fa-user rentingBtn" +
                      checkActive(item.status, "renting")
                    }
                    aria-hidden="true"
                    onClick={() =>
                      updateItemStatus(item.item_id, item.status, 1)
                    }
                  ></i>
                  <i
                    className={
                      "fa fa-question-circle lostBtn" +
                      checkActive(item.status, "lost")
                    }
                    aria-hidden="true"
                    onClick={() =>
                      updateItemStatus(item.item_id, item.status, 2)
                    }
                  ></i>
                  <i
                    className="fa fa-trash deleteBtn"
                    aria-hidden="true"
                    onClick={() => deleteItem(item.item_id)}
                  ></i>
                </div>
                {itemUpdating !== 0 && <div className="back"></div>}
                {itemUpdating === item.item_id && (
                  <Loading classes="itemLoading" />
                )}
              </div>
            ))}
            {Array.from({ length: pad }).map((_, index) => (
              <div className="itemPad" key={`pad${index}`}></div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Items;
