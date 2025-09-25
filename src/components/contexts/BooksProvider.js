import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../useLocalStorageState";

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [wishlist, setWishlist] = useLocalStorageState([], "my_wishlist");
  const [ratedBooks, setRatedBooks] = useLocalStorageState([], "ratedBooks");
  const [bookToDelete, setBookToDelete] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function addToWishlist(book) {
    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "",
      genres: book.volumeInfo.categories ? book.volumeInfo.categories : "",
      image: book.volumeInfo.imageLinks.thumbnail,
      year: book.volumeInfo.publishedDate?.match(/^\d{4}/)[0],
      rating: book.volumeInfo.averageRating,
      ratingCount: book.volumeInfo.ratingsCount
        ? book.volumeInfo.ratingsCount
        : "",
      pages: book.volumeInfo.pageCount,
      dateAdded: new Date().toLocaleDateString("en-GB"),
      price:
        book.saleInfo.listPrice?.amount != null
          ? book.saleInfo.listPrice.amount
          : null,
      storeLink: book.volumeInfo.canonicalVolumeLink,
      publishedDate: new Date(book.volumeInfo.publishedDate).toLocaleDateString(
        "en-US",
        {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }
      ),
    };

    const storedWishlist =
      JSON.parse(localStorage.getItem("my_wishlist")) || [];
    const updatedWishlist = [...storedWishlist, newBook];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  function removeFromWishlist(id) {
    if (wishlist && Array.isArray(wishlist)) {
      setWishlist((prev) => prev.filter((prev) => id !== prev.id));
    }
  }

  function checkHasBeenAddedToWishlist(id) {
    if (!Array.isArray(wishlist)) return;
    return wishlist.map((cur) => cur.id).includes(id);
  }

  function addToRatedBooks(book, rating) {
    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "",
      image: book.volumeInfo?.imageLinks?.thumbnail,
      userRating: Number(rating) || "not set",
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const storedRatedBooks =
      JSON.parse(localStorage.getItem("ratedBooks")) || [];
    const updatedRatedBooks = [...storedRatedBooks, newBook];

    setRatedBooks(updatedRatedBooks);
    localStorage.setItem("ratedBooks", JSON.stringify(updatedRatedBooks));
  }

  function editRatedBook(id, rating) {
    setRatedBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, userRating: Number(rating) || null } : book
      )
    );
  }

  function removeFromRatedBooks(id) {
    if (ratedBooks && Array.isArray(ratedBooks)) {
      setRatedBooks((prev) => prev.filter((prev) => id !== prev.id));
    }
  }

  function getRatedBook(id) {
    return ratedBooks.find((item) => item.id === id);
  }

  function prepareDelete(id, title) {
    setBookToDelete({
      id: id,
      title: title,
    });
    setShowDeleteModal(true);
  }

  return (
    <BooksContext.Provider
      value={{
        showSearchModal,
        setShowSearchModal,
        wishlist,
        setWishlist,
        ratedBooks,
        setRatedBooks,
        addToWishlist,
        removeFromWishlist,
        addToRatedBooks,
        editRatedBook,
        removeFromRatedBooks,
        getRatedBook,
        checkHasBeenAddedToWishlist,
        bookToDelete,
        setBookToDelete,
        showDeleteModal,
        setShowDeleteModal,
        prepareDelete,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BooksContext);

  if (context === undefined)
    throw new Error("BooksContext was used outside the BooksProvider");
  return context;
}

export { BooksProvider, useBooks };
