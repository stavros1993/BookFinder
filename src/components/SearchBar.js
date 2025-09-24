import { useBooks } from "./contexts/BooksProvider";
import Search from "./icons/Search";

function SearchBar() {
  const { setShowSearchModal } = useBooks();
  return (
    <div className="ms-auto col-auto offset-2">
      <button className="search-btn" onClick={() => setShowSearchModal(true)}>
        <Search />
        <span>Search...</span>
      </button>
    </div>
  );
}

export default SearchBar;
