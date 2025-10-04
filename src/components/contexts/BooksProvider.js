import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../useLocalStorageState";

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [wishlist, setWishlist] = useLocalStorageState([], "my_wishlist");
  const [ratedBooks, setRatedBooks] = useLocalStorageState([], "ratedBooks");
  const [library, setLibrary] = useLocalStorageState([], "library");
  const [bookToDelete, setBookToDelete] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function createBook(book) {
    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "",
      image: book.volumeInfo.imageLinks.thumbnail,
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    return newBook;
  }

  function addToLibrary(
    book,
    status,
    hasBeenAddedToLibrary = null,
    existingLibraryItem = null
  ) {

    if (hasBeenAddedToLibrary === true) {
      if (status !== existingLibraryItem.status) {
        setLibrary(
          library.map(function (item) {
            if (item.id === book.id) {
              return { ...item, status: status, currentPage: status==="currentlyReading" ? 0 : status==="read" ? book.pages : '' };
            } else {
              return item;
            }
          })
        );
      } else {
        return;
      }
    } else {
      const newBook = {
        ...createBook(book),
        pages: book.volumeInfo.pageCount ?? null,
        currentPage: status === "read" ? book.volumeInfo.pageCount : 0,
        userRating: null,
        status: status,
      };

      const storedLibrary = JSON.parse(localStorage.getItem("library")) || [];
      const updatedLibrary = [...storedLibrary, newBook];
      setLibrary(updatedLibrary);
      localStorage.setItem("library", JSON.stringify(updatedLibrary));

      if (wishlist.some((cur) => cur.id === book.id)) {
        removeFromWishlist(book.id);
      }
    }
  }

  const readingStatusLabels = {
    read: "Read",
    currentlyReading: "Currently Reading",
  };

  function addToWishlist(book) {
    const newBook = {
      ...createBook(book),
      genres: book.volumeInfo.categories ?? null,
      rating: book.volumeInfo.averageRating ?? null,
      ratingCount: book.volumeInfo.ratingsCount ?? null,
      page: book.volumeInfo.pageCount ?? null,
      price:  book.saleInfo.retailPrice?.amount ?? book.saleInfo.listPrice?.amount ?? null,
      storeLink: book.volumeInfo.canonicalVolumeLink ?? null,
      publishedDate: new Date(book.volumeInfo.publishedDate).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
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

  function addToRatedBooks(book, rating) {
    const newBook = {
      ...createBook(book),
      userRating: Number(rating),
    };

    const storedRatedBooks =
      JSON.parse(localStorage.getItem("ratedBooks")) || [];
    const updatedRatedBooks = [...storedRatedBooks, newBook];

    setRatedBooks(updatedRatedBooks);
    localStorage.setItem("ratedBooks", JSON.stringify(updatedRatedBooks));
  }

  function removeFromWishlist(id) {
    if (wishlist && Array.isArray(wishlist)) {
      setWishlist((prev) => prev.filter((prev) => id !== prev.id));
    }
  }

  function removeFromLibrary(id) {
    if (library && Array.isArray(library)) {
      setLibrary((prev) => prev.filter((prev) => id !== prev.id));
    }
  }

  function checkHasBeenAddedToLibrary(id) {
    if (!Array.isArray(library)) {
      return;
    }
    return library.map((cur) => cur.id).includes(id);
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
        library,
        setLibrary,
        addToWishlist,
        removeFromWishlist,
        addToRatedBooks,
        editRatedBook,
        removeFromRatedBooks,
        getRatedBook,
        bookToDelete,
        setBookToDelete,
        showDeleteModal,
        setShowDeleteModal,
        prepareDelete,
        addToLibrary,
        removeFromLibrary,
        checkHasBeenAddedToLibrary,
        readingStatusLabels,
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
