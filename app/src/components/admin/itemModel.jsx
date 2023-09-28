import React, { useContext, useEffect, useState } from "react";
import {
  adjust_model,
  get_item_classes,
  get_models,
  add_model,
} from "../../requests";
import { AppContext } from "../../App";

import Loading from "../functions/loading";
import alert_message from "../functions/alert";

import "../../css/itemModel.css";

const ItemModels = () => {
  const [models, setModels] = useState([]);
  const [itemClasses, setItemClasses] = useState([]);
  const [updating, setUpdating] = useState(false);

  let { alert, setAlert, loading, setLoading, logOut } = useContext(AppContext);

  const set_datas = async () => {
    const fetch_models = await get_models();
    const fetch_itemClasses = await get_item_classes();

    if (!fetch_models || !fetch_itemClasses) {
      setAlert(30);
      setLoading(false);
      return;
    }
    setModels(fetch_models);
    setItemClasses(fetch_itemClasses);
    setLoading(false);
    return;
  };

  const changeModel = async () => {
    setUpdating(1);
    const selectedModel = document.getElementById("itemModel").value;
    const newModelItemClass = document.getElementById("newItemClass").value;
    const newModelName = document.getElementById("modelRename").value;

    if (selectedModel === "") {
      setAlert(31);
      setUpdating(false);
      return;
    }

    const model_id = models.find(
      (model) => model.model_name === selectedModel
    ).model_id;
    const body = {};

    if (newModelItemClass === "" && newModelName === "") {
      setAlert(32);
      setUpdating(false);
      return;
    }

    if (newModelItemClass !== "")
      body["class_id"] = itemClasses.find(
        (itemClass) => itemClass.class_name === newModelItemClass
      ).class_id;
    if (newModelName !== "") body["model_name"] = newModelName;

    const result = await adjust_model(model_id, body);

    if (result === 404) logOut();

    if (!result) {
      setAlert(33);
      setUpdating(false);
      return;
    } else {
      const new_models = await get_models();
      if (new_models) setModels(new_models);
      setAlert(34);
      setUpdating(false);
      return;
    }
  };

  const addModel = async () => {
    setUpdating(2);
    const model_name = document.getElementById("newModel").value;
    let class_id = document.getElementById("itemModelClass").value;

    if (model_name === "" || class_id === "") {
      setUpdating(false);
      setAlert(40);
      return;
    }
    class_id = itemClasses.find(
      (itemClass) => itemClass.class_name === class_id
    ).class_id;

    const result = await add_model(model_name, class_id);

    if (result === 401) logOut();

    if (!result) {
      setAlert(41);
      setUpdating(false);
      return;
    }

    const new_models = await get_models();
    if (new_models) setModels(new_models);

    setAlert(42);
    setUpdating(false);
    return;
  };

  useEffect(() => {
    setLoading(true);
    set_datas();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="itemModelsPage">
            <div className="itemModelsPageTitle">型號新增：</div>
            <div className="itemModelsAddForm">
              <div className="itemModelAdd">
                <div className="itemModelAddName">
                  <div htmlFor="newModel" className="label">
                    型號名稱：
                  </div>
                  <input type="text" id="newModel" className="input" />
                </div>
                <div className="itemModelAddClass">
                  <div htmlFor="itemModelClass" className="label">
                    型號所屬類別：
                  </div>
                  <select id="itemModelClass" className="select">
                    <option value="" className="newModelSelectClass">
                      請選擇所屬類別
                    </option>
                    {itemClasses.map(
                      (itemClass) =>
                        itemClass.model_id !== 1 && (
                          <option key={itemClass.class_id}>
                            {itemClass.class_name}
                          </option>
                        )
                    )}
                  </select>
                </div>
              </div>
              <button className="modelSet" onClick={addModel}>
                新增
              </button>
              {updating && (
                <div className="back">{updating === 2 && <Loading />}</div>
              )}
            </div>
            <div className="itemModelsPageTitle">型號調整：</div>
            <div action="" className="itemModelAdjustForm">
              <div className="itemModelSettings">
                {/* Select model */}
                <div className="select_itemModel">
                  <div className="label">選擇物品型號：</div>
                  <select id="itemModel" className="select">
                    <option value="">請選擇物品型號</option>
                    {models.map(
                      (model) =>
                        model.model_id !== 1 && (
                          <option key={model.model_id}>
                            {model.model_name}
                          </option>
                        )
                    )}
                  </select>
                </div>
                {/* Change item class for model */}
                <div className="itemModel_belongs_itemClass_select">
                  <div className="label">更新類別：</div>
                  <select id="newItemClass" className="select">
                    <option value="">不更改請留空</option>
                    {itemClasses.map((itemClass) => (
                      <option key={itemClass.class_id}>
                        {itemClass.class_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Change model name */}
                <div className="modelRename">
                  <div htmlFor="modelRename" className="label">
                    更新型號名稱：
                  </div>
                  <input
                    type="text"
                    name="modelRename"
                    id="modelRename"
                    placeholder="不更改請留空"
                    className="input"
                  />
                </div>
              </div>
              {/* Submit */}
              <button className="modelSet" onClick={changeModel}>
                更新
              </button>
              {updating && (
                <div className="back">{updating === 1 && <Loading />}</div>
              )}
            </div>
          </div>

          {alert !== 0 && alert_message(alert)}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ItemModels;
