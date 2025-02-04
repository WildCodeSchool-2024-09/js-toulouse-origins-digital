import addIcon from "../assets/images/add.png";
import bookmarkIcon from "../assets/images/bookmark.png";
import homeIcon from "../assets/images/home-2.png";
import searchIcon from "../assets/images/search.png";
import imgProfile from "../assets/images/user-solid.svg";
import { useNav } from "../contexts/NavProvider";
import "../styles/NavBar.css";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useSpreadProfileImage } from "../contexts/ProfileImageProvider";
import UserLogin from "./UserLogin";
import UserLogout from "./UserModal";

type User = {
  id: number;
};

type Auth = {
  user: User;
  token: string;
};

export default function NavBar() {
  const { isOpenLogin, setIsOpenLogin } = useNav();
  const { auth } = useOutletContext() as { auth: Auth | null };
  const { spreadProfileImage } = useSpreadProfileImage();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (auth) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);

  const navbarClass = !isLoggedIn ? "reduced-navbar-size" : "nav-bar";

  return (
    <>
      {isOpenLogin ? !isLoggedIn ? <UserLogin /> : <UserLogout /> : null}
      <div className="nav-bar-container">
        <nav className={navbarClass}>
          <Link to="/home">
            <img src={homeIcon} alt="Home" className="nav-icon" />
          </Link>
          <Link to="/search">
            <img src={searchIcon} alt="Search" className="nav-icon" />
          </Link>
          {isLoggedIn && (
            <>
              <img src={bookmarkIcon} alt="Bookmark" className="nav-icon" />
              <a href="/playlists">
                <img src={addIcon} alt="Add" className="nav-icon" />
              </a>
            </>
          )}
          <img
            onClick={() => setIsOpenLogin(true)}
            onKeyDown={() => setIsOpenLogin(true)}
            src={spreadProfileImage || imgProfile}
            alt="Profile"
            className="nav-icon nav-icon-profile-style"
          />
        </nav>
      </div>
    </>
  );
}
