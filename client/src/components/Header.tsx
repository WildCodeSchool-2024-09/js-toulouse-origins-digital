import controller from "../assets/images/controller.svg";
import "../styles/Header.css";
import SearchBar from "./SearchBar";

export default function () {
  return (
    <div>
      <div className="logo-header">
        <img src={controller} alt="Controller" className="logo-icon" />
        <h1> JESTONE</h1>
      </div>
      <SearchBar />
    </div>
  );
}
