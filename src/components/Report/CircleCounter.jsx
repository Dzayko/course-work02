import "./CircleCounter.scss";
import clsx from "clsx";

function CircleCounter({ maliciousCount, totalCount }) {
  return (
    <>
      <div
        className={clsx("circle__container", {
          malicious: maliciousCount > 0,
          safe: maliciousCount == 0,
        })}
      >
        <p
          className={clsx("circle__counter", {
            malicious: maliciousCount > 0,
            safe: maliciousCount == 0,
          })}
        >
          <span>{maliciousCount}</span>
          <br />/ {totalCount}
        </p>
      </div>
      <p
        className={clsx("circle__explanation", {
          malicious: maliciousCount > 0,
          safe: maliciousCount == 0,
        })}
      >
        {maliciousCount > 0
          ? `${maliciousCount}/${totalCount} security vendors flagged this URL as
        malicious`
          : `No security vendors flagged this URL as malicious`}
      </p>
    </>
  );
}

export default CircleCounter;
