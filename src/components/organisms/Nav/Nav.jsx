/* eslint-disable react/prop-types */
import SearchNav from "../../molecules/SearchNav/SearchNav";

export default function Nav({ title, subTitle }) {
  return (
    <div className="w-100 d-flex align-items-center flex-column justify-content-center">
      <h1 className="text-light mb-3">{title}</h1>
      <h6 className="text-light mb-3 fw-light">{subTitle}</h6>
      <SearchNav />
    </div>
  );
}
