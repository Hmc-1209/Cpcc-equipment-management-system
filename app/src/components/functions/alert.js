import "../../css/alert.css";

const alert_message = (alert) => {
  switch (alert) {
    case 1:
      return (
        <div className="alertMessageShort red absolute left top">
          租借者資訊不完全
        </div>
      );

    case 2:
      return (
        <div className="alertMessageShort red absolute left top">
          租借項目未選擇
        </div>
      );

    case 3:
      return (
        <div className="alertMessageShort orange absolute left">
          租金支付日期已被重新設定
        </div>
      );

    case 4:
      return (
        <div className="alertMessageShort red medium absolute bottom">
          帳號密碼不可為空
        </div>
      );

    case 5:
      return (
        <div className="alertMessageShort red medium absolute bottom">
          管理者帳號或密碼錯誤
        </div>
      );

    case 6:
      return (
        <div className="alertMessageShort orange medium absolute bottom">
          登入中...
        </div>
      );

    case 7:
      return (
        <div className="alertMessageShort red medium bottom no-space">
          新名稱不可為空值
        </div>
      );

    case 8:
      return (
        <div className="alertMessageShort green medium bottom no-space">
          管理者名稱更新成功
        </div>
      );

    case 9:
      return (
        <div className="alertMessageShort red medium bottom no-space">
          管理者名稱更新失敗
        </div>
      );

    case 10:
      return (
        <div className="alertMessageShort red medium bottom no-space">
          密碼不可為空
        </div>
      );

    case 11:
      return (
        <div className="alertMessageShort red medium bottom no-space">
          請輸入相同的密碼
        </div>
      );

    case 12:
      return (
        <div className="alertMessageShort green medium bottom no-space">
          管理者密碼更新完成
        </div>
      );

    case 13:
      return (
        <div className="alertMessageShort red medium bottom no-space">
          管理者密碼更新失敗
        </div>
      );

    case 14:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          更新失敗
        </div>
      );

    case 15:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          刪除失敗
        </div>
      );

    case 16:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          物品種類名稱重複！
        </div>
      );

    case 17:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          新增失敗
        </div>
      );

    case 18:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          無法獲得器材資訊
        </div>
      );

    case 19:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          更新失敗
        </div>
      );

    case 20:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          無法刪除已出現在租借表單中之器材
        </div>
      );

    case 21:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          刪除器材失敗
        </div>
      );

    case 22:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          名稱或編號不可為空
        </div>
      );

    case 23:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          新增器材失敗
        </div>
      );

    case 24:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          請選擇物品型號
        </div>
      );

    case 25:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          更新失敗
        </div>
      );

    case 26:
      return (
        <div className="alertMessageShort red absolute left top">
          電話格式不符
        </div>
      );

    case 27:
      return (
        <div className="alertMessageShort green absolute left top">
          表單已送出
        </div>
      );

    case 28:
      return (
        <div className="alertMessageShort red absolute left top">
          表單送出失敗
        </div>
      );

    case 29:
      return (
        <div className="alertMessageShort red absolute left top">
          學號格式錯誤
        </div>
      );

    case 30:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          獲取資料失敗
        </div>
      );

    case 31:
      return (
        <div className="alertMessageShort red large center medium no-space">
          請選擇型號
        </div>
      );

    case 32:
      return (
        <div className="alertMessageShort red large center medium no-space">
          請更新其中一項內容
        </div>
      );

    case 33:
      return (
        <div className="alertMessageShort red large center medium no-space">
          更新失敗
        </div>
      );

    case 34:
      return (
        <div className="alertMessageShort green large center medium no-space">
          更新完成
        </div>
      );

    case 35:
      return (
        <div className="alertMessageShort red large center medium no-space">
          獲取資料失敗
        </div>
      );

    case 36:
      return (
        <div className="alertMessageShort red large center medium no-space">
          獲取資料失敗
        </div>
      );

    case 37:
      return (
        <div className="alertMessageShort red large center medium no-space">
          更新失敗
        </div>
      );

    case 38:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          未指定歸還日期！
        </div>
      );

    case 39:
      return (
        <div className="alertMessageShort red x-large center medium no-space">
          刪除失敗
        </div>
      );
    default:
      return <div></div>;
  }
};
export default alert_message;
