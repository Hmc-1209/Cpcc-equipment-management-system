import React from "react";
import "../css/adminPage.css";

export default function AdminPage() {
  return (
    <>
      <div className="adminSelectSection">
        <button className="adminSelectButton lightgreen">器材清點</button>
        <button className="adminSelectButton lightpurple">
          審核器材借用請求
        </button>
        <button className="adminSelectButton lightyellow">
          新增器材借用請求
        </button>
        <button className="adminSelectButton lightred">關閉借用請求</button>
        <button className="adminSelectButton lightblue">器材分類</button>
        <button className="adminSelectButton lightorange">更新器材狀態</button>
        <button className="adminSelectButton lightgray">帳號設定</button>
      </div>
    </>
  );
}
