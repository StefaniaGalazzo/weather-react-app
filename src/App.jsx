import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/Home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import { Route, Routes } from "react-router-dom";
import ForecastPage from "./components/pages/ForecastPage/ForecastPage";
// import ErrorPage from "./components/pages/404/404";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="/weather-react-app/" element={<Home />} />
        <Route
          path="/weather-react-app/forecast-weather/:dt"
          element={<ForecastPage />}
        />
        {/* <Route path="/404" element={<ErrorPage />} /> */}
      </Routes>
    </Provider>
  );
}

export default App;
