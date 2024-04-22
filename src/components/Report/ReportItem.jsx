import "./ReportItem.scss";
import clsx from "clsx";

function ReportItem({ vendor, result, icon, category }) {
  return (
    <div className="item">
      <span className="item__vendor">{vendor}</span>
      <div className="item__status-container">
        <img className="item__status-icon" src={icon} alt={`Result icon`} />
        <span className={clsx(category, "item__status-info")}>{result}</span>
      </div>
    </div>
  );
}

export default ReportItem;
