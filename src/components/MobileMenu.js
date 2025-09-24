import { NavLink } from "react-router-dom";
import { useBooks } from "./contexts/BooksProvider";
import Home from "./icons/Home";
import Search from "./icons/Search";
import Library from "./icons/Library";
import Star from "./icons/Star";
import "./MobileMenu.scss";

function MobileMenu() {
  const { setShowSearchModal } = useBooks();
  return (
    <div className="mobile-menu">
      <div className="d-flex align-items-center justify-content-between links-wrapper">
        <NavLink to="">
          <Home />
          <span className="d-block pt-2">Home</span>
        </NavLink>
        <button onClick={() => setShowSearchModal(true)}>
          <Search />
          <span className="d-block pt-2">Search</span>
        </button>
        <NavLink to="/wishlist">
          <Library />
          <span className="d-block pt-2">Wishlist</span>
        </NavLink>
        <NavLink to="/ratings">
          <Star />
          <span className="d-block pt-2">Ratings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default MobileMenu;
