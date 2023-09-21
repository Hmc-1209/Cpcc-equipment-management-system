import React, { useEffect, useContext, useState } from "react";
import "../../css/itemClass.css";
import "../../css/alert.css";

import {
  add_new_item_class,
  delete_item_class,
  get_item_classes,
  update_item_class,
  validate,
} from "../../requests";
import { AppContext } from "../../App";
import Loading from "../functions/loading";
import alert_message from "../functions/alert";

const ItemClassPage = () => {
  let { logOut, loading, setLoading, alert, setAlert } = useContext(AppContext);

  const [itemClasses, setItemClasses] = useState([]);
  const [editingItemClass, setEditingItemClass] = useState(0);
  const [itemClassLoading, setItemClassLoading] = useState(0);
  const [newItemClass, setNewItemClass] = useState(0);

  const editingReset = (class_id, value = null) => {
    if (!class_id) return;
    if (
      itemClasses.find((itemClass) => itemClass.class_id === class_id).name ===
      value
    ) {
      setEditingItemClass(0);
      return;
    }
    const update = async () => {
      setItemClassLoading(class_id);
      const result = await update_item_class(class_id, value);
      if (result === 401) logOut();
      if (result) {
        console.log("Success");
        setItemClasses(
          itemClasses.map((itemClass) => {
            if (itemClass.class_id === class_id)
              return { ...itemClass, name: value };
            return itemClass;
          })
        );
        setItemClassLoading(0);
        setEditingItemClass(0);
        return;
      } else {
        setAlert(14);
        setItemClassLoading(0);
        setEditingItemClass(0);
      }
    };
    update();
  };

  const delete_itemClass = (class_id) => {
    // Delete the item class

    setItemClassLoading(class_id);
    const delete_spec_item_class = async () => {
      const result = await delete_item_class(class_id);
      if (result === 401) logOut();
      if (result) {
        const new_itemClasses = itemClasses.filter(
          (itemClass) => itemClass.class_id !== class_id
        );
        setItemClasses(new_itemClasses);
        setItemClassLoading(0);
        return;
      }
      setAlert(15);
      setItemClassLoading(0);
    };
    delete_spec_item_class();
  };

  const add_item_class = (name) => {
    // Add specific item class if name is legal

    const add = async () => {
      if (itemClasses.find((itemClass) => itemClass.name === name)) {
        setAlert(16);
        setNewItemClass(0);
        return;
      }

      setItemClassLoading(-1);

      const result = await add_new_item_class(name);

      if (result === 401) logOut();
      if (result) {
        const getItemClasses = await get_item_classes();
        if (getItemClasses === 401) logOut();
        setItemClasses(getItemClasses);
        setNewItemClass(0);
        setItemClassLoading(0);
        return;
      }
      setAlert(17);
      setNewItemClass(0);
      setItemClassLoading(0);
    };

    add();
  };

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
      {loading ? (
        <Loading />
      ) : (
        <>
          <div style={{ width: "100%", minHeight: "40px" }}>
            {alert !== 0 && alert_message(alert)}
          </div>
          <div className="itemClassPage">
            <button className="addItemClass" onClick={() => setNewItemClass(1)}>
              + 增加器材種類
            </button>
            {/* New item class */}
            {newItemClass !== 0 && (
              <div className="itemClassSection greenBorder">
                <input
                  type="text"
                  className="itemClassNameInput"
                  defaultValue={""}
                  autoFocus={true}
                  id={"itemClass"}
                />
                {itemClassLoading === 0 && (
                  <>
                    <div className="itemClassMarkBtn"></div>
                    <i
                      className="fa fa-check itemClassMarkBtn"
                      onClick={() =>
                        add_item_class(
                          document.getElementById("itemClass").value
                        )
                      }
                    ></i>
                    <i
                      className="fa fa-times itemClassDelBtn"
                      onClick={() => {
                        setNewItemClass(0);
                      }}
                    ></i>
                  </>
                )}
                {itemClassLoading === -1 && (
                  <Loading classes="itemClassLoading" />
                )}
              </div>
            )}
            {Array.isArray(itemClasses) &&
              itemClasses.map((item) => (
                <div className="itemClassSection" key={item.name}>
                  {editingItemClass !== item.class_id ? (
                    <>
                      <div className="itemClassName">{item.name}</div>
                      <div className="itemClassMarkBtn"></div>
                      {itemClassLoading === 0 ? (
                        <>
                          <i
                            className="fa fa-pencil itemClassEditBtn"
                            onClick={() => {
                              setEditingItemClass(item.class_id);
                              setNewItemClass(0);
                            }}
                          ></i>
                          <i
                            className="fa fa-minus-square itemClassDelBtn"
                            onClick={() => delete_itemClass(item.class_id)}
                          ></i>
                        </>
                      ) : (
                        itemClassLoading === item.class_id && (
                          <Loading classes="itemClassLoading" />
                        )
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        className="itemClassNameInput"
                        defaultValue={item.name}
                        autoFocus={true}
                        id={"itemClass"}
                      ></input>
                      {itemClassLoading !== item.class_id ? (
                        <>
                          <i
                            className="fa fa-check itemClassMarkBtn"
                            onClick={(e) => {
                              e.stopPropagation();
                              editingReset(
                                item.class_id,
                                document.getElementById("itemClass").value
                              );
                            }}
                          ></i>
                          <i
                            className="fa fa-times itemClassDelBtn"
                            onClick={() => {
                              setEditingItemClass(0);
                            }}
                          ></i>
                          <i
                            className="fa fa-minus-square itemClassDelBtn"
                            onClick={() => delete_itemClass(item.class_id)}
                          ></i>
                        </>
                      ) : (
                        <Loading classes="itemClassLoading" />
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ItemClassPage;
