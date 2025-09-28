import { NavLink } from "react-router-dom";
import ThemeToggle from "./icons/ThemeToggle";

function Navigation({ setDarkMode, darkMode }) {
  return (
    <div className="col-auto">
      <nav className="ms-lg-3 d-flex align-items-center">
        <div className="d-none d-md-block">
          <NavLink className="btn btn-default me-3" to="/wishlist">
            Wishlist
          </NavLink>
          <NavLink className="btn btn-default me-3" to="/ratings">
            Ratings
          </NavLink>
          <NavLink className="btn btn-default me-3" to="/library">
            Library
          </NavLink>
        </div>
        <button
          className={`${
            !darkMode ? "btn-theme-toggle-light" : ""
          } btn btn-theme-toggle`}
          onClick={() => setDarkMode((prev) => !prev)}
        >
          <ThemeToggle />
        </button>
      </nav>
    </div>
  );
}

export default Navigation;
