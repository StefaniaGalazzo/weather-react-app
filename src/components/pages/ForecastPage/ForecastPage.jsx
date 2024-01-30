import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bgClearDay from "../../../assets/imgs/clear-day.jpg";
import { useParams } from "react-router-dom";
import {
  fetchForecast,
  convertTemperature,
  getDate,
} from "../../../actions/actions";
import { Container } from "react-bootstrap";
import { getWeatherImage } from "../../../utils/functions";
import styles from "./ForecastPage.module.scss";

const ForecastPage = () => {
  const [background, setBackground] = useState(`url(${bgClearDay})`);

  const { dt } = useParams();
  const dispatch = useDispatch();
  // recupero dati
  const query = useSelector((state) => state.dataReducer.query);
  const forecastData = useSelector((state) => state.dataReducer.forecastData);
  const locationData = useSelector((state) => state.dataReducer.locationData);
  const selectedDay = forecastData.find((day) => day.dt === parseInt(dt, 10));

  const convertedTemperature = useSelector(
    (state) => state.formattersReducer.convertedTemperature
  );
  const dateFromSeconds = useSelector(
    (state) => state.formattersReducer.dateFromSeconds
  );

  useEffect(() => {
    if (dt && query) {
      dispatch(fetchForecast(query));
    }
  }, [dt, query]);

  useEffect(() => {
    if (selectedDay) {
      dispatch(convertTemperature(selectedDay.main.temp));
      dispatch(getDate(selectedDay.dt));
      // console.log(dateFromSeconds, "dateFromSeconds");
    }
  }, [selectedDay]);
  useEffect(() => {
    if (
      selectedDay &&
      forecastData.length > 0 &&
      locationData.name &&
      locationData.weather
    ) {
      const newBackground = getWeatherImage(
        selectedDay?.weather[0].description,
        selectedDay.dt
      ).bgHome;
      setBackground(`url(${newBackground})`);
    }
  }, [selectedDay, forecastData, locationData]);
  return (
    <div style={{ backgroundImage: background }} id={styles.bgPersonal}>
      {selectedDay ? (
        <Container
          fluid
          id={styles.forecastPage}
          className="text-white position-relative"
          style={{ zIndex: "1" }}
        >
          <h2>Weather for {dateFromSeconds}</h2>
          <div>
            <p>Temperature: {convertedTemperature}°C</p>
            <p>Weather: {selectedDay.weather[0].description}</p>
            <p>
              Wind: {selectedDay.wind.speed}kh/h / {selectedDay.wind.deg} deg
            </p>
          </div>
        </Container>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default ForecastPage;
