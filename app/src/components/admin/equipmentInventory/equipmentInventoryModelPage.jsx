import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { validate, get_item_class_models } from "../../../requests";
import "../../../css/equipmentInventory/equipmentInventoryModelPage.css";
import Loading from "../../functions/loading";

const EquipmentInventoryModel = () => {
  const [models, setModels] = useState([]);

  let {
    loading,
    setLoading,
    eIMData,
    setEISNData,
    eIMLayerData,
    setEISNLayerData,
    setMode,
    logOut,
  } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    const valid = async () => {
      const result = await validate();
      if (!result) logOut();
    };

    valid();

    const getDatas = async () => {
      try {
        const result = await get_item_class_models(eIMData);
        if (result) {
          setModels(result);
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
          <div className="equipmentInventoryModelPage">
            <div className="itemClassName">
              物品種類 :{" "}
              {eIMLayerData.find((d) => d.class_id === eIMData).class_name}
            </div>
            <div className="itemModelSection">
              {models.map((model) => (
                <div
                  className="itemModel"
                  onClick={() => {
                    setEISNData(model.model_id);
                    setEISNLayerData(models);
                    setMode(12);
                  }}
                >
                  <div className="modelName">{model.model_name}</div>
                  <div className="modelAvailable">
                    可用數量：{model.available}
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

export default EquipmentInventoryModel;
