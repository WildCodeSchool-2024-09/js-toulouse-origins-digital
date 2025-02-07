import addIcon from "../assets/images/add.png";
import bookmarkIcon from "../assets/images/bookmark.png";
import homeIcon from "../assets/images/home-2.png";
import searchIcon from "../assets/images/search.png";
import imgProfile from "../assets/images/user-solid.svg";
import { useNav } from "../contexts/NavProvider";
import "../styles/NavBar.css";
import { Link, useOutletContext } from "react-router-dom";
import UserLogin from "./UserLogin";
import UserLogout from "./UserModal";

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

  let userId = auth?.user.id;

  if (!userId) {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      userId = user.id;
    }
  }

  const navbarClass = !auth ? "reduced-navbar-size" : "nav-bar";

  return (
    <>
      {isOpenLogin ? !auth ? <UserLogin /> : <UserLogout /> : null}
      <div className="nav-bar-container">
        <nav className={navbarClass}>
          <Link to="/home">
            <img src={homeIcon} alt="Home" className="nav-icon" />
          </Link>
          <Link to="/search">
            <img src={searchIcon} alt="Search" className="nav-icon" />
          </Link>
          {auth && (
            <>
              <Link to="/favorite">
                <img src={bookmarkIcon} alt="Bookmark" className="nav-icon" />
              </Link>
              <Link to="/playlists">
                <img src={addIcon} alt="Add" className="nav-icon" />
              </Link>
            </>
          )}
          <img
            onClick={() => setIsOpenLogin(true)}
            onKeyDown={() => setIsOpenLogin(true)}
            src={!auth ? imgProfile : auth?.user.avatar_url}
            alt="Profile"
            className="nav-icon nav-icon-profile-style"
          />
        </nav>
      </div>
    </>
  );
}
