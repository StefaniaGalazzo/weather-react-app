import bgClearDay from "../../../assets/imgs/clear-day.jpg";
import styles from "./Home.module.scss";
import { getWeatherImage } from "../../../utils/functions";
import { useEffect, useState } from "react";
import LineChart from "../../molecules/LineChart/LineChart";
import Header from "../../ui/Header/Header";
import Forecast from "../../organisms/Forecast/Forecast";
import { useSelector } from "react-redux";
import Orbit from "../../organisms/Orbit/Orbit";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  const locationData = useSelector((state) => state.dataReducer.locationData);
  const forecastData = useSelector((state) => state.dataReducer.forecastData);
  console.log(locationData);
  //dynamic background homepage
  const [background, setBackground] = useState(`url(${bgClearDay})`);
  useEffect(() => {
    if (forecastData.length > 0 && locationData.name && locationData.weather) {
      const newBackground = getWeatherImage(
        locationData?.weather[0].description,
        locationData.dt
      ).bgHome;
      setBackground(`url(${newBackground})`);
    }
  }, [forecastData, locationData]);

  return (
    <div id={styles.wrapperOverlay}>
      {/* <div className={styles.overlay}></div> */}
      <div
        id={styles.containerHome}
        className={`pt-5 `}
        style={{ backgroundImage: background }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Header
            getDateFromSeconds={getDateFromSeconds}
            convertKelvinToCelsius={convertKelvinToCelsius}
            getTimeFromSeconds={getTimeFromSeconds}
          />
          <Forecast
            title={"Forecast"}
            fallback={"Search a location and discover the weather!"}
            getDateFromSeconds={getDateFromSeconds}
            convertKelvinToCelsius={convertKelvinToCelsius}
          />
          <Container fluid>
            <h3 className="text-center text-white display-4 m-0">
              {locationData &&
                locationData.dt &&
                getDateFromSeconds(locationData.dt).slice(-5)}
            </h3>
            <Row className="align-items-center g-5 justify-content-center px-md-5">
              <Col sm={12} md={8} lg={6}>
                <LineChart
                  forecastData={forecastData}
                  convertKelvinToCelsius={convertKelvinToCelsius}
                  getDateFromSeconds={getDateFromSeconds}
                />
              </Col>
              <Col sm={12} lg={6} className="m-0 p-0 p-md-3">
                <Orbit />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );

  //
  //funzioni per formattare date e gradi
  function getDateFromSeconds(totalSeconds) {
    const milliseconds = totalSeconds * 1000;
    const date = new Date(milliseconds);

    const dayOfWeek = date.getDay();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    //per il nome del giorno
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dayOfWeek];

    //  MM/DD/YYYY - Day HH:MM
    const formattedDate = `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year} / ${dayName} / ${hours}:${minutes}`;

    return formattedDate;
  }
  function convertKelvinToCelsius(kelvin) {
    // Kelvin to Celsius: K - 273.15
    const celsius = kelvin - 273.15;
    return Math.ceil(celsius);
  }
  function getTimeFromSeconds(totalSeconds) {
    const milliseconds = totalSeconds * 1000;
    const date = new Date(milliseconds);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }
  //
}
