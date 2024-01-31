import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/Home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import { Route, Routes } from "react-router-dom";
import ForecastPage from "./components/pages/ForecastPage/ForecastPage";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index path="/weather-react-app/" element={<Home />} />
        <Route
          path="/weather-react-app/forecast-weather/:dt"
          element={<ForecastPage />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
