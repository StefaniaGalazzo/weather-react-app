/* eslint-disable no-case-declarations */
// formattersReducer.js
const initialState = {
  convertedTemperature: null,
  dateFromSeconds: null,
  hoursFromSeconds: null,
};

const formattersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONVERT_TEMPERATURE":
      const celsius = action.payload - 273.15;
      return {
        ...state,
        convertedTemperature: Math.ceil(celsius),
      };
    case "GET_DATE":
      const milliseconds = action.payload * 1000;
      const date = new Date(milliseconds);
      const dayOfWeek = date.getDay();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

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

      const formattedDate = `${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}/${year} / ${dayName} / ${hours}:${minutes}`;

      return {
        ...state,
        dateFromSeconds: formattedDate,
      };
    // case "GET_HOUR":
    //   const millisec = action.payload * 1000;
    //   const newDate = new Date(millisec);
    //   const hour = newDate.getHours();
    //   return {
    //     ...state,
    //     hoursFromSeconds: hour,
    //   };
    default:
      return state;
  }
};

export default formattersReducer;
