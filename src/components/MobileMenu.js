import { NavLink } from "react-router-dom";
import { useBooks } from "./contexts/BooksProvider";
import Home from "./icons/Home";
import Search from "./icons/Search";
import Bookmark from "./icons/Bookmark";
import Star from "./icons/Star";
import Book from "./icons/Book";
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
          <Bookmark />
          <span className="d-block pt-2">Wishlist</span>
        </NavLink>
        <NavLink to="/library">
          <Book />
          <span className="d-block pt-2">Library</span>
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
