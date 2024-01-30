/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import styles from "./SearchNav.module.scss";
import {
  setQuery,
  fetchLocation,
  fetchForecast,
} from "../../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function SearchNav() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.dataReducer.query);
  const locationData = useSelector((state) => state.dataReducer.locationData);

  // //search
  const handleSearch = async (e) => {
    // sanificazione input
    const inputValue = e.target.value.trim(); // rimuovo spazi bianchi
    const sanitizedInput = inputValue.replace(/[^a-zA-Z0-9\s]/g); //regex: solo caratteri alfanumerici e spazi
    sanitizedInput === "undefined" || query === "undefined"
      ? dispatch(setQuery(""))
      : dispatch(setQuery(sanitizedInput));
    if (
      sanitizedInput !== "undefined" &&
      query !== "undefined" &&
      e.key === "Enter"
    ) {
      try {
        dispatch(fetchLocation(sanitizedInput));
        dispatch(fetchForecast(sanitizedInput));
      } catch (error) {
        console.error("Errore nell'handleSearch in SearchNAv:", error.message);
      }
    }
  };

  function cleanInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(setQuery(""));
    }
  }
  //

  return (
    <div
      className={`rounded-pill pb-1 position-relative`}
      id={styles.searchNav}
    >
      <input
        className="search rounded-pill w-100"
        type="text"
        value={query}
        onChange={handleSearch}
        onKeyDown={handleSearch}
        onKeyUp={cleanInput}
        placeholder={locationData?.name || "Search and press enter"}
        maxLength={20} //prevengo la possibilità di poter inserire testi che non sono nomi di città
      />
      <FaSearch
        color="black"
        size="18px"
        className="position-absolute"
        style={{ top: "5px", right: "5px" }}
      />
    </div>
  );
}
