import { useBooks } from "../contexts/BooksProvider";
import "./Wishlist.scss";
import Search from "../icons/Search";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import WishlistItem from "../WishlistItem";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup";
import EmptyPage from "../EmptyPage";
import CloseIcon from "../icons/CloseIcon";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useBooks();

  const [wishlistFilteredData, setWishlistFilteredData] = useState(
    wishlist || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortByText, setSortByText] = useState("");

  useEffect(function () {
    document.title = "My Wishlist | BookFinder";
  }, []);

  useEffect(
    function () {
      let filteredResults = wishlist.filter(function (item) {
        return (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.authors.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      switch (sortBy) {
        case "priceAsc":
          filteredResults = filteredResults
            .slice()
            .sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
          break;
        case "priceDesc":
          filteredResults = filteredResults
            .slice()
            .sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
          break;

        case "titleAsc":
          filteredResults = filteredResults
            .slice()
            .sort((a, b) => (a.title || "").localeCompare(b.title || ""));
          break;

        case "titleDesc":
          filteredResults = filteredResults
            .slice()
            .sort((a, b) => (b.title || "").localeCompare(a.title || ""));
          break;

        case "ratingAsc":
          filteredResults = filteredResults
            .slice()
            .sort((a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0));
          break;
        case "ratingDesc":
          filteredResults = filteredResults
            .slice()
            .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
          break;
        default:
          setWishlistFilteredData(filteredResults);
      }

      setWishlistFilteredData(filteredResults);
    },
    [searchQuery, wishlist, sortBy]
  );

  const handleSelect = (eventKey) => {
    setSortByText(eventKey);
  };

  if (wishlist.length === 0) {
    return (
      <EmptyPage title="Your Wishlist is empty">
        <p className="font-18">
          Start exploring new titles and add them to your wishlist to save them
          for later
        </p>
      </EmptyPage>
    );
  }

  return (
    <main className="wishlist-page">
      <DeleteConfirmationPopup removeBook={removeFromWishlist} />

      <div className="container">
        <div className="d-flex gx-2 gx-sm-4 row align-items-start mb-4">
          <div className="col-sm-auto">
            <h1 className="h3 mb-0">My Wishlist</h1>
          </div>
          {wishlist.length > 0 && (
            <>
              <div className="ms-auto col-sm-auto pt-3 pt-sm-0">
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle
                    id="filter-dropdown"
                    className="btn btn-bordered"
                  >
                    {sortByText ? sortByText : " Sort by"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item
                      eventKey="Price (Low → High)"
                      onClick={() => {
                        setSortBy("priceAsc");
                      }}
                    >
                      Price (Low → High)
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Price (High → Low)"
                      onClick={() => {
                        setSortBy("priceDesc");
                      }}
                    >
                      Price (High → Low)
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Title (Low → High)"
                      onClick={() => {
                        setSortBy("titleAsc");
                      }}
                    >
                      Title (A → Z)
                    </Dropdown.Item>

                    <Dropdown.Item
                      eventKey="Title (High → Low)"
                      onClick={() => {
                        setSortBy("titleDesc");
                      }}
                    >
                      Title (Z → A)
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Rating (Low → High)"
                      onClick={() => {
                        setSortBy("ratingAsc");
                      }}
                    >
                      Rating (Low → High)
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Rating (High → Low)"
                      onClick={() => {
                        setSortBy("ratingDesc");
                      }}
                    >
                      Rating (High → Low)
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="col-md-auto pt-3 pt-md-0">
                <div className="search-wishlist-wrapper">
                  <input
                    className="search-wishlist"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search title of author..."
                  />
                  {searchQuery.length ? (
                    <button
                      className="btn btn-icon cancel-search-btn"
                      onClick={() => setSearchQuery("")}
                    >
                      <CloseIcon />
                    </button>
                  ) : (
                    <Search />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {wishlist.length > 0 &&
        wishlistFilteredData.length === 0 &&
        searchQuery.length > 0 ? (
          <h5>
            No results found for "{searchQuery}" — try clearing your search
          </h5>
        ) : (
          <div class="table-responsive">
            <table class="table wishlist-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cover</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  {/* <th scope="col">Genre</th> */}
                  <th scope="col">Avg Rating</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date Added</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {wishlistFilteredData.map(function (item, index) {
                  return <WishlistItem item={item} index={index} />;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
