import bgRainyDay from "../assets/imgs/rainy-day.jpg";
import bgRainyNight from "../assets/imgs/rainy-night.jpg";
import bgClearNight from "../assets/imgs/clear-night.jpg";
import bgClearDay from "../assets/imgs/clear-day.jpg";
import bgCloudyDay from "../assets/imgs/cloudy-day.jpg";
import bgCloudyNight from "../assets/imgs/cloudy-night.jpg";
import bgSnow from "../assets/imgs/bg-snow.jpg";
import snow from "../assets/imgs/snow.png";
import dayCloud from "../assets/imgs/very-cloudy.png";
import nightMoonCloud from "../assets/imgs/nightCloud.png";
import rainy from "../assets/imgs/very-rainy.png";
import sun from "../assets/imgs/sun.png";
import moon from "../assets/imgs/moon.png";

// percorso dell'immagine in base alla descrizione del meteo
export function getWeatherImage(description, totalSeconds) {
  const lowercasedDescription = description.toLowerCase().trim();
  const hours = getHoursFromSeconds(totalSeconds);
  const referenceHour = 16;
  if (hours <= referenceHour) {
    if (lowercasedDescription.includes("rain")) {
      return {
        bgHome: bgRainyDay,
        iconCard: rainy,
      };
    } else if (
      lowercasedDescription.includes("cloud") ||
      lowercasedDescription.includes("broken")
    ) {
      return {
        bgHome: bgCloudyDay,
        iconCard: dayCloud,
      };
    } else if (
      lowercasedDescription.includes("clear") ||
      lowercasedDescription.includes("sun")
    ) {
      return {
        bgHome: bgClearDay,
        iconCard: sun,
      };
    } else if (lowercasedDescription.includes("snow")) {
      return {
        bgHome: bgSnow,
        iconCard: snow,
      };
    } else {
      return {
        bgHome: bgClearDay,
        iconCard: sun,
      };
    }
  } else if (hours > referenceHour) {
    if (lowercasedDescription.includes("rain")) {
      return {
        bgHome: bgRainyNight,
        iconCard: rainy,
      };
    } else if (lowercasedDescription.includes("cloud")) {
      return {
        bgHome: bgCloudyNight,
        iconCard: nightMoonCloud,
      };
    } else if (lowercasedDescription.includes("snow")) {
      return {
        bgHome: bgSnow,
        iconCard: snow,
      };
    } else if (lowercasedDescription.includes("clear")) {
      return {
        bgHome: bgClearNight,
        iconCard: moon,
      };
    } else {
      return {
        bgHome: bgClearNight,
        iconCard: moon,
      };
    }
  }
}
//
function getHoursFromSeconds(totalSeconds) {
  const milliseconds = totalSeconds * 1000;
  const date = new Date(milliseconds);
  const hours = date.getHours();
  return hours;
}
