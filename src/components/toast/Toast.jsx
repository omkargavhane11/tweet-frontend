import "./toast.css";

const Toast = ({ h, m }) => {
  return (
    <div className="toast">
      <div className="toast_heading">{h}</div>
      <div className="toast_message">{m}</div>
    </div>
  );
};

export default Toast;
