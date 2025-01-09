import addIcon from "../assets/images/add.png";
import bookmarkIcon from "../assets/images/bookmark.png";
import homeIcon from "../assets/images/home-2.png";
import searchIcon from "../assets/images/search.png";
import imgProfile from "../assets/images/user-solid.svg";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="nav-bar-container">
        <nav className="nav-bar">
          <Link to="/home">
            <img src={homeIcon} alt="Home" className="nav-icon" />
          </Link>
          <img src={bookmarkIcon} alt="Bookmark" className="nav-icon" />
          <img src={addIcon} alt="Add" className="nav-icon" />
          <img src={searchIcon} alt="Search" className="nav-icon" />
          <img
            src={imgProfile}
            alt="Profile"
            className="nav-icon-profile-style"
          />
        </nav>
      </div>
    </>
  );
}
