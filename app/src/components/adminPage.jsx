import React, { useContext } from "react";
import { AppContext } from "../App";

import "../css/adminPage.css";

export default function AdminPage() {
  let { setMode, setAdminRent } = useContext(AppContext);

  return (
    <>
      <div className="adminSelectSection">
        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(10)}
        >
          器材清點
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(20)}
        >
          器材盤點
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => {
            setAdminRent(true);
            setMode(30);
          }}
        >
          新增借用請求
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(40)}
        >
          審核借用請求
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(50)}
        >
          器材種類
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(60)}
        >
          器材調整
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(70)}
        >
          帳號設定
        </button>
      </div>
    </>
  );
}
