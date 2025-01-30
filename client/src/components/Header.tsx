import { Link, useMatch } from "react-router-dom";
import controller from "../assets/images/controller.svg";
import "../styles/Header.css";

export default function () {
  return (
    <div className="header-container">
      <div className="logo-header">
        <img src={controller} alt="Controller" className="logo-icon" />
        <h1>JESTONE</h1>
      </div>
      <div className="swipe-view">
        {!useMatch("/admin") ? (
          <Link to={"/admin"}>
            <p className="view-text">Vue admin</p>
          </Link>
        ) : (
          <Link to={"/home"}>
            <p className="view-text">Vue utilisateur</p>
          </Link>
        )}
      </div>
    </div>
  );
}
