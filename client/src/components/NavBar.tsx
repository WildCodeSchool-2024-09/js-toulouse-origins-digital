import addIcon from "../assets/images/add.png";
import bookmarkIcon from "../assets/images/bookmark.png";
import homeIcon from "../assets/images/home-2.png";
import searchIcon from "../assets/images/search.png";
import imgProfile from "../assets/images/user-solid.svg";
import { useNav } from "../contexts/NavProvider";
import "../styles/NavBar.css";
import UserLogin from "./UserLogin";

export default function NavBar() {
  const { isOpenLogin, setIsOpenLogin } = useNav();

  return (
    <>
      {isOpenLogin ? <UserLogin /> : null}
      <div className="nav-bar-container">
        <nav className="nav-bar">
          <img src={homeIcon} alt="Home" className="nav-icon" />
          <img src={bookmarkIcon} alt="Bookmark" className="nav-icon" />
          <img src={addIcon} alt="Add" className="nav-icon" />
          <img src={searchIcon} alt="Search" className="nav-icon" />
          <img
            onClick={() => setIsOpenLogin(true)}
            onKeyDown={() => setIsOpenLogin(true)}
            src={imgProfile}
            alt="Profile"
            className="nav-icon-profile-style"
          />
        </nav>
      </div>
    </>
  );
}
