/* eslint-disable react/prop-types */
import Nav from "../../organisms/Nav/Nav";
import Hero from "../../organisms/Hero/Hero";

export default function Header({
  getDateFromSeconds,
  convertKelvinToCelsius,
  getTimeFromSeconds,
}) {
  return (
    <>
      <Nav title={"Weather App"} subTitle={"Discover weater in your country"} />
      <Hero
        getDateFromSeconds={getDateFromSeconds}
        convertKelvinToCelsius={convertKelvinToCelsius}
        getTimeFromSeconds={getTimeFromSeconds}
      />
    </>
  );
}
