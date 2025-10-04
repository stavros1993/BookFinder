import { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useBooks } from "../contexts/BooksProvider";
import BookSearchResultItem from "../BookSearchResultItem";
import Spinner from "../ui/Spinner";
import Search from "../icons/Search";
import "./Modals.scss";

function SearchPopup() {
  const { setShowSearchModal, showSearchModal } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const inputEl = useRef(null);
  const BASE_URL = "https://www.googleapis.com/books/v1/volumes?";

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400); // wait 400ms after the last keystroke

    return () => clearTimeout(handler); // cleanup if user types again
  }, [searchQuery]);

  // Fetch results when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.length <= 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function fetchResults() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}q=${debouncedQuery}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data.items || []);
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();

    return () => controller.abort(); // cancel previous request
  }, [debouncedQuery]);

  const handleClose = () => {
    setSearchQuery("");
    setResults([]);
    setShowSearchModal(false);
  };

  useEffect(() => {
    if (showSearchModal && inputEl.current) inputEl.current.focus();
  }, [showSearchModal]);

  return (
    <Modal
      className="search-popup"
      size="lg"
      show={showSearchModal}
      onHide={handleClose}
    >
      <Modal.Header>
        <div className="search-input-wrapper">
          <input
            ref={inputEl}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            placeholder="Search books or authors"
          />
          <button className="close-btn" onClick={handleClose}>
            ESC
          </button>
          <Search />
        </div>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Spinner />
        ) : (
          results.map((item) => (
            <BookSearchResultItem
              setSearchQuery={setSearchQuery}
              item={item}
              setShowSearchModal={setShowSearchModal}
            />
          ))
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SearchPopup;
