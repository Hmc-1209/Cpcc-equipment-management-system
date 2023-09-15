import React from "react";
import "../css/adminPage.css";

export default function AdminPage() {
  return (
    <>
      <div className="adminSelectSection">
        <button className="adminSelectButton primaryColor">器材清點</button>
        <button className="adminSelectButton primaryColor">
          審核器材借用請求
        </button>
        <button className="adminSelectButton primaryColor">
          新增器材借用請求
        </button>
        <button className="adminSelectButton primaryColor">關閉借用請求</button>
        <button className="adminSelectButton primaryColor">器材分類</button>
        <button className="adminSelectButton primaryColor">更新器材狀態</button>
        <button className="adminSelectButton primaryColor">帳號設定</button>
      </div>
    </>
  );
}
