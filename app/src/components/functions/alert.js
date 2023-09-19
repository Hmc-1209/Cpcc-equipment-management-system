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

    default:
      return <div></div>;
  }
};
export default alert_message;
