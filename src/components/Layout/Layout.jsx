import "./Layout.scss";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="container">
      <Outlet />

      <footer className="footer">
        <p className="footer__text">
          This application uses the VirusTotal API. Read more{" "}
          <a
            target="_blank"
            href="https://docs.virustotal.com/reference/overview"
          >
            here
          </a>
        </p>
        <p className="footer__year-text">@ 2024 URL scanner</p>
      </footer>
    </div>
  );
}

export default Layout;
