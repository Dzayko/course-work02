import "./Report.scss";
import ClipIcon from "../../components/icons/Report/ClipIcon";
import BackArrowIcon from "../../components/icons/Report/BackArrowIcon";
import CircleCounter from "../../components/Report/CircleCounter";
import ReportItem from "../../components/Report/ReportItem";
import cleanIcon from "../../assets/common/cleanIcon.svg";
import maliciousIcon from "../../assets/common/maliciousIcon.svg";
import suspiciousIcon from "../../assets/common/suspiciousIcon.svg";
import unratedIcon from "../../assets/common/unratedIcon.svg";
import Preloader from "../../components/Preloader/Preloader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveReport } from "../../store/urlScanSlice";

function Report() {
  const navigateTo = useNavigate();

  const report = useSelector((state) => state.urlReportStore.urlReport);
  const url = useSelector((state) => state.urlReportStore.url);

  const icons = {
    harmless: cleanIcon,
    undetected: unratedIcon,
    malicious: maliciousIcon,
    suspicious: suspiciousIcon,
  };

  let maliciousCount = 0;
  report.map((rep) => {
    if (rep.category === "malicious") {
      maliciousCount++;
    }
  });

  const dispatch = useDispatch();
  const saveUrlReport = (response) => {
    dispatch(
      saveReport({
        report: response,
      })
    );
  };

  const [fetchStatus, setFetchStatus] = useState(false);

  const reScan = () => {
    setFetchStatus(true);
    document.body.style.overflow = "hidden";

    let apiKey =
      "88168c1a6938c16490ea733d5fd729eb236bde0f893342021e9c285035fb8c48";

    axios
      .post(
        "https://www.virustotal.com/api/v3/urls",
        { url: url },
        {
          headers: {
            accept: "application/json",
            "x-apikey": apiKey,
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((postResponse) => {
        const urlHash = postResponse.data.data.id.split("-")[1];
        axios
          .get(`https://www.virustotal.com/api/v3/urls/${urlHash}`, {
            headers: {
              accept: "application/json",
              "x-apikey": apiKey,
            },
          })
          .then((response) => {
            saveUrlReport(
              Object.values(
                response.data.data.attributes.last_analysis_results
              ).sort((a, b) => {
                if (a.category == "malicious") {
                  return -1;
                } else if (
                  a.category == "suspicious" &&
                  b.category != "malicious"
                ) {
                  return -1;
                } else if (
                  a.category == "harmless" &&
                  b.category == "undetected"
                ) {
                  return -1;
                }
              })
            );
            document.body.style.overflow = "";
            setFetchStatus(false);
          })
          .catch((error) => {
            document.body.style.overflow = "";
            setFetchStatus(false);
            console.error(error);
            alert(`Error ${error.response.status}! Try later!`);
          });
      })
      .catch((postError) => {
        document.body.style.overflow = "";
        setFetchStatus(false);
        console.error(postError);
        alert(`Error ${postError.response.status}! Try later!`);
      });
  };

  return (
    <main className="report">
      {fetchStatus && <Preloader />}
      <ClipIcon
        className="report__clip-icon"
        onClick={() => {
          reScan();
        }}
      />
      <BackArrowIcon
        className="report_back-arrow-icon"
        onClick={() => {
          navigateTo("/");
        }}
      />
      <h1 className="report__title">Report for:</h1>
      <p className="report__report-object" title={url}>
        {url.length > 40 ? url.slice(0, 40) + "..." : url}
      </p>
      <CircleCounter
        maliciousCount={maliciousCount}
        totalCount={report.length}
      />
      <div className="report__items-container">
        {report.map((rep) => (
          <ReportItem
            key={rep.engine_name}
            vendor={rep.engine_name}
            result={rep.result}
            category={rep.category}
            icon={icons[rep.category]}
          />
        ))}
      </div>
    </main>
  );
}

export default Report;
