import "../../css/alert.css";

const alert_message = (alert) => {
  switch (alert) {
    case 1:
      return <div className="alertMessageShort red">租借者資訊不完全</div>;

    case 2:
      return <div className="alertMessageShort red">租借項目未選擇</div>;

    default:
      return <div></div>;
  }
};
export default alert_message;
