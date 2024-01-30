import { key } from "../env";
// main actions
export const setUserLocation = (location) => ({
  type: "SET_USER_LOCATION",
  payload: location,
});

export const setCityName = (cityName) => ({
  type: "SET_CITY_NAME",
  payload: cityName,
});

// azioni per il data fetching
export const setLocationData = (data) => ({
  type: "SET_LOCATION_DATA",
  payload: data,
});

export const setForecastData = (data) => ({
  type: "SET_FORECAST_DATA",
  payload: data,
});

export const setQuery = (query) => ({
  type: "SET_QUERY",
  payload: query,
});
// end main actions

// creatori di azioni per main actions
// start azioni formattazione dati
export const convertTemperature = (kelvin) => ({
  type: "CONVERT_TEMPERATURE",
  payload: kelvin,
});
export const getDate = (totalSeconds) => ({
  type: "GET_DATE",
  payload: totalSeconds,
});

// funzioni fetch dati
export const fetchLocation = (query) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`
    );
    if (!response.ok) {
      throw new Error(`Errore ${response.status} nella richiesta`);
    }
    const result = await response.json();
    dispatch(setLocationData(result));
    // return { type: "SET_LOCATION_DATA", payload: result };
  } catch (error) {
    console.log(error.message);
    dispatch(setLocationData({ name: "Location not founded" }));
  }
};

export const fetchForecast = (query) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${key}`
    );
    if (!response.ok) {
      throw new Error(`Errore ${response.status} nella richiesta`);
    }
    const result = await response.json();
    dispatch(setForecastData(result.list));
    // return { type: "SET_FORECAST_DATA", payload: result.list };
  } catch (error) {
    console.log(error.message);
    dispatch(setForecastData({ name: "Location not founded" }));
    // return {
    //   type: "SET_FORECAST_DATA",
    //   payload: { name: "Location not founded" },
    // };
  }
};
