// reducers.js
const initialState = {
  locationData: {
    dt: 1705687200,
  },
  forecastData: {},
  query: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCATION_DATA":
      return {
        ...state,
        locationData: action.payload,
      };

    case "SET_FORECAST_DATA":
      return {
        ...state,
        forecastData: action.payload,
      };

    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer;
