/* eslint-disable react/prop-types */
import { WiSunrise, WiSunset, WiHumidity } from "react-icons/wi";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { MdLineWeight } from "react-icons/md";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { getWeatherImage } from "../../../utils/functions";
import styles from "./Hero.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { key } from "../../../env";
import {
  fetchForecast,
  fetchLocation,
  setQuery,
} from "../../../actions/actions";

export default function Hero({
  getDateFromSeconds,
  convertKelvinToCelsius,
  getTimeFromSeconds,
}) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [latLong, setLatLong] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [cityName, setCityName] = useState("");
  const locationData = useSelector((state) => state.dataReducer.locationData);

  // geolocalization - get city name from lat/long <3 funziona <3
  useEffect(() => {
    if (locationData.name) return;
    if (!locationData.name && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatLong({ lat: latitude, long: longitude });
          // console.log(latLong, "latlong obj");
          // console.log(position.coords, "position.coords");
          try {
            const response = await axios.get(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${key}`
            );
            console.log(response.data[0], "responde geo new");
            if (response.data.length > 0) {
              const city = response.data[0].name;
              setCityName(city);
              dispatch(setQuery(city));
              dispatch(fetchLocation(city));
              dispatch(fetchForecast(city));
            }
          } catch (error) {
            console.error("Error getting city name:", error);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [dispatch, locationData.name]);

  return (
    <div
      id={styles.inYourCountry}
      className="my-5 d-flex flex-column align-items-center justify-content-center"
    >
      {/* <div className="test">
        <p>City: {cityName}</p>
        <p>lat: {latLong.lat}</p>
        <p>long: {latLong.long}</p>
      </div> */}

      <h3 className="text-white display-1 text-center">
        {(locationData?.dt && getDateFromSeconds(locationData?.dt)) ||
          "00/00/00"}
      </h3>
      <div className="d-flex flex-wrap justify-content-center my-5">
        <div className="d-none d-md-block my-4">
          <img
            src={
              locationData?.weather &&
              getWeatherImage(
                locationData?.weather[0].description,
                locationData?.dt
              ).iconCard
            }
            alt={locationData?.weather && locationData?.weather[0].description}
          />
        </div>
        <div className="text-center mx-5 ">
          <h3 className="text-white ">
            {locationData?.name || "Location"} <FaLocationDot />
          </h3>
          <h4 className="display-4 text-white">
            {convertKelvinToCelsius(locationData?.main?.temp) || 0}°C
          </h4>
          <p className="fs-4 text-white m-0">
            {(locationData?.weather &&
              locationData?.weather[0] &&
              locationData?.weather[0].description) ||
              "Description"}
          </p>
          <p className="text-white mb-sm-5 mb-lg-0">
            min/max:
            {locationData?.main?.temp_min
              ? convertKelvinToCelsius(locationData?.main?.temp_min)
              : 0}
            /
            {locationData?.main?.temp_max
              ? convertKelvinToCelsius(locationData?.main?.temp_max)
              : 0}
            °C
          </p>
        </div>
        <div className="my-4">
          <img
            src={
              locationData?.weather &&
              getWeatherImage(
                locationData?.weather[0].description,
                locationData?.dt
              ).iconCard
            }
            alt={locationData?.weather && locationData?.weather[0].description}
          />
        </div>
      </div>
      <div
        className="d-flex flex-wrap g-3 m-4 align-items-center justify-content-center text-white"
        id={styles.infoWeather}
      >
        <p>
          <WiSunrise size={"25px"} /> Sunrise:{" "}
          {locationData?.sys
            ? getTimeFromSeconds(locationData?.sys.sunrise)
            : "00:00"}
        </p>
        <p>
          <WiSunset size={"25px"} /> Sunset:{" "}
          {(locationData?.sys &&
            getTimeFromSeconds(locationData?.sys?.sunset)) ||
            "00:00"}
        </p>
        <p>
          <LiaTemperatureLowSolid size={"25px"} /> Feels like:{" "}
          {(locationData?.main &&
            convertKelvinToCelsius(locationData?.main?.feels_like)) ||
            0}
        </p>
        <p>
          <MdLineWeight size={"25px"} /> Pressure:{" "}
          {locationData?.main?.pressure || 0}
        </p>
        <p>
          <WiHumidity size={"30px"} /> Humidity:{" "}
          {locationData?.main?.humidity || 0}%
        </p>
        <p>
          <TiWeatherWindyCloudy size={"25px"} /> Wind: speed{" "}
          {locationData?.wind?.speed || 0} / deg: {locationData?.wind?.deg || 0}
        </p>
      </div>
    </div>
  );
}
