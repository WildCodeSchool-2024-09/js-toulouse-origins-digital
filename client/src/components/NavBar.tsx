import addIcon from "../assets/images/add.png";
import bookmarkIcon from "../assets/images/bookmark.png";
import homeIcon from "../assets/images/home-2.png";
import searchIcon from "../assets/images/search.png";
import imgProfile from "../assets/images/user-solid.svg";
import { useNav } from "../contexts/NavProvider";
import "../styles/NavBar.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import UserLogin from "./UserLogin";
import UserModal from "./UserModal";

type User = {
  id: number;
  avatar_url: string;
};

type Auth = {
  user: User;
  token: string;
};

export default function NavBar() {
  const { isOpenLogin, setIsOpenLogin } = useNav();
  const { auth } = useOutletContext() as { auth: Auth | null };
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  let userId = auth?.user.id;

  if (!userId) {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      userId = user.id;
    }
  }

  const navbarClass = !auth ? "reduced-navbar-size" : "nav-bar";

  const getIconClass = (path: string) => {
    if (path === "/home") {
      return `nav-icon ${currentPath === "/home" ? "active" : ""}`;
    }
    return `nav-icon ${currentPath === path ? "active" : ""}`;
  };

  const getProfileClass = () => {
    return `nav-icon-profile-style ${currentPath === "/profile" ? "active" : ""}`;
  };

  return (
    <>
      {isOpenLogin ? (
        !auth ? (
          <UserLogin />
        ) : (
          <UserModal
            isOpenLogin={isOpenLogin}
            setIsOpenLogin={setIsOpenLogin}
          />
        )
      ) : null}
      <div className="nav-bar-container">
        <nav className={navbarClass}>
          <Link to="/home">
            <img src={homeIcon} alt="Home" className={getIconClass("/home")} />
          </Link>
          <Link to="/search">
            <img
              src={searchIcon}
              alt="Search"
              className={getIconClass("/search")}
            />
          </Link>
          {auth && (
            <>
              <Link to="/favorite">
                <img
                  src={bookmarkIcon}
                  alt="Bookmark"
                  className={getIconClass("/favorite")}
                />
              </Link>
              <Link to="/playlists">
                <img
                  src={addIcon}
                  alt="Add"
                  className={getIconClass("/playlists")}
                />
              </Link>
            </>
          )}
          <img
            onClick={() => setIsOpenLogin((prev) => !prev)}
            onKeyDown={() => setIsOpenLogin((prev) => !prev)}
            src={!auth ? imgProfile : auth?.user.avatar_url}
            alt="Profile"
            className={getProfileClass()}
          />
        </nav>
      </div>
    </>
  );
}
