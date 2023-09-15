import "../../css/alert.css";

const alert_message = (alert) => {
  switch (alert) {
    case 1:
      return (
        <div className="alertMessageShort red absolute left">
          租借者資訊不完全
        </div>
      );

    case 2:
      return (
        <div className="alertMessageShort red absolute left">
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

    default:
      return <div></div>;
  }
};
export default alert_message;
