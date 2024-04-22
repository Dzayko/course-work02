import axios from "axios";
import "./Homepage.scss";
import PlanetIcon from "../../components/icons/Homepage/PlanetIcon";
import Input from "../../components/Homepage/Input";
import Button from "../../components/Homepage/Button";
import Preloader from "../../components/Preloader/Preloader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveReport, saveUrl } from "../../store/urlScanSlice";

function Homepage() {
  const [inputValue, setInputValue] = useState("");
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const navigateTo = useNavigate();

  const dispatch = useDispatch();
  const saveUrlReport = (response) => {
    dispatch(
      saveReport({
        report: response,
      })
    );
  };
  const saveCurrentUrl = () => {
    dispatch(
      saveUrl({
        url: inputValue.trim(),
      })
    );
  };

  const [fetchStatus, setFetchStatus] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setFetchStatus(true);
    document.body.style.overflow = "hidden";

    let apiKey =
      "88168c1a6938c16490ea733d5fd729eb236bde0f893342021e9c285035fb8c48";

    axios
      .post(
        "https://www.virustotal.com/api/v3/urls",
        { url: inputValue.trim() },
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
            saveCurrentUrl();
            setInputValue("");
            setFetchStatus(false);
            navigateTo("/report");
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
  }

  return (
    <main className="homepage">
      {fetchStatus && <Preloader />}
      <h1 className="homepage__title">URL scanner</h1>
      <p className="homepage__text">
        Enter the URL you want to check in the input field below. The system
        will find out the reputation of this URL among antivirus software
        providers, databases of malicious URLs and will provide you with check
        results.
      </p>
      <PlanetIcon />
      <form action="#" className="homepage__form" onSubmit={onSubmit}>
        <Input value={inputValue} onChange={handleInput} />
        <Button />
      </form>
    </main>
  );
}

export default Homepage;
