/* eslint-disable react/prop-types */
import { Container } from "react-bootstrap";
import styles from "./Forecast.module.scss";
import { Link } from "react-router-dom";
import { getWeatherImage } from "../../../utils/functions";
import { useSelector } from "react-redux";

export default function Forecast({
  getDateFromSeconds,
  convertKelvinToCelsius,
  title,
  fallback,
}) {
  const forecastData = useSelector((state) => state.dataReducer.forecastData);
  return (
    <Container fluid className="pe-0">
      <h3 className="text-white ps-md-5 ms-md-5"> {title}</h3>
      <hr />
      <div id={styles.scrollY}>
        <div className={`ps-md-5 ${styles.weatherDaysWrapper}`}>
          {forecastData && forecastData.length > 0 ? (
            forecastData?.map((day) => {
              const formattedDate = getDateFromSeconds(day.dt);
              const toCelsius = convertKelvinToCelsius(day.main.temp);
              return (
                <Link
                  key={day.dt}
                  to={`/weather-react-app/forecast-weather/${day.dt}`}
                  className={`${styles.cardWeaterDay}`}
                >
                  <h6 className="text-white text-center">
                    {formattedDate.toString()}
                  </h6>
                  <img
                    id="cardImage"
                    src={
                      day?.weather &&
                      getWeatherImage(day?.weather[0].description, day.dt)
                        .iconCard
                    }
                    alt="weather-mood"
                    width={"80px"}
                  />
                  <p className="text-white text-center">{toCelsius}°C</p>
                </Link>
              );
            })
          ) : (
            <div
              className={`m-auto ${styles.cardWeaterDay}`}
              style={{ maxWidth: "1000px", width: "90vw" }}
            >
              <h6 className="text-white display-4 text-center">{fallback}</h6>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
