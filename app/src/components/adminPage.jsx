import React, { useContext } from "react";
import "../css/adminPage.css";
import { AppContext } from "../App";

export default function AdminPage() {
  let { setMode } = useContext(AppContext);

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
          審核器材借用請求
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(30)}
        >
          新增器材借用請求
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(40)}
        >
          關閉借用請求
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(50)}
        >
          器材分類
        </button>

        <button
          className="adminSelectButton primaryColor"
          onClick={() => setMode(60)}
        >
          更新器材狀態
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
