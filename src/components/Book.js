import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "./contexts/BooksProvider";
import Spinner from "./ui/Spinner";
import StarRating from "./starRating";
import Star from "./icons/Star";
import "./Book.scss";
import AddToLibraryPopup from "./AddToLibraryPopup";
import Checkmark from "./icons/Checkmark";

function Book() {
  const BASE_URL = "https://www.googleapis.com/books/v1/volumes/";
  const { id } = useParams();

  const {
    addToWishlist,
    removeFromWishlist,
    wishlist,
    library,
    readingStatusLabels,
  } = useBooks();

  const [isLoading, setIsLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState(null);
  const [showAddToLibraryModal, setShowAddToLibraryModal] = useState(false);

  const hasBeenAddedToWishlist = wishlist.some(
    (cur) => cur.id === bookDetails?.id
  );
  /* */
  const hasBeenAddedToLibrary = library.some(function (item) {
    return item.id === bookDetails?.id;
  });

  let existingLibraryItem;

  if (hasBeenAddedToLibrary) {
    existingLibraryItem = library.find(function (item) {
      return item.id === bookDetails.id;
    });
  }

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}${id}`);
        const data = await res.json();
        setBookDetails(data);
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [id]);

  useEffect(
    function () {
      if (!bookDetails) return;
      document.title = `${
        bookDetails?.volumeInfo?.title
          ? bookDetails.volumeInfo.title
          : "Book Details"
      } | BookFinder`;

      return function () {
        document.title = "BookFinder";
      };
    },
    [bookDetails]
  );

  return (
    <section className="book-details">
      <AddToLibraryPopup
        bookDetails={bookDetails}
        show={showAddToLibraryModal}
        setShow={setShowAddToLibraryModal}
        hasBeenAddedToLibrary={hasBeenAddedToLibrary}
        existingLibraryItem={existingLibraryItem}
      />

      <div className="container-sm">
        {isLoading && <Spinner />}
        {bookDetails?.error && <h5>No such book</h5>}

        {bookDetails?.volumeInfo && (
          <div className="row">
            <div className="col-sm-auto pb-3 pb-lg-0">
              <div className="d-flex h-100 h-md-auto align-items-center align-items-md-start">
                <img
                  alt={bookDetails.title}
                  className="rounded main-image d-block"
                  src={
                    bookDetails.volumeInfo?.imageLinks?.thumbnail
                      ? bookDetails.volumeInfo?.imageLinks?.thumbnail
                      : "/images/placeholder-image.png"
                  }
                />
                <div className="ps-3 d-sm-none">
                  <h1 className="h4 mb-2 lh-1">
                    {bookDetails.volumeInfo.title}
                  </h1>
                  {bookDetails.volumeInfo.authors && (
                    <h6>
                      By&nbsp;{bookDetails.volumeInfo.authors?.join(", ")}
                    </h6>
                  )}
                  {/* {bookDetails?.volumeInfo?.subtitle && (
                    <span className="d-block pb-2">
                      {bookDetails?.volumeInfo?.subtitle}
                    </span>
                  )} */}
                </div>
              </div>
            </div>
            <div className="col lh-1">
              <div className="flex-column d-flex align-items-start h-100">
                <div className="d-none d-sm-block">
                  <h1 className="h4 mb-2 lh-1">
                    {bookDetails.volumeInfo.title}
                  </h1>
                  {bookDetails.volumeInfo.authors && (
                    <h6>
                      By&nbsp;{bookDetails.volumeInfo.authors?.join(", ")}
                    </h6>
                  )}
                  {/* {bookDetails?.volumeInfo?.subtitle && (
                    <span className="d-block pb-2">
                      {bookDetails?.volumeInfo?.subtitle}
                    </span>
                  )} */}
                </div>
                <div className="book-bottom-details pb-2">
                  {bookDetails.volumeInfo.publishedDate && (
                    <span className="d-inline-block">
                      {bookDetails.volumeInfo.publishedDate?.match(/^\d{4}/)[0]}
                    </span>
                  )}

                  {bookDetails.volumeInfo.pageCount > 0 && (
                    <span className="d-inline-block">
                      &nbsp;•&nbsp;
                      {bookDetails.volumeInfo.pageCount} pages
                    </span>
                  )}

                  {bookDetails.volumeInfo.averageRating && (
                    <span className="d-block pt-2">
                      <Star color="#fbbf24" stroke="#fbbf24" size="20px" />
                      &nbsp;
                      {bookDetails.volumeInfo.averageRating}&nbsp;(
                      {bookDetails.volumeInfo.ratingsCount} Rating
                      {bookDetails.volumeInfo.ratingsCount > 1 && "s"})
                    </span>
                  )}
                </div>

                {/* {bookDetails.volumeInfo.previewLink && (
                  <a
                    href={bookDetails.volumeInfo.previewLink}
                    target="_blank"
                    className="btn btn-link"
                  >
                    Preview Book →
                  </a>
                )} */}

                <div className="mt-auto star-rating-wrapper pb-3">
                  <div className="d-flex align-items-center">
                    <span className="d-block pe-2">Rate this book</span>
                    <StarRating size={25} bookDetails={bookDetails} />
                  </div>
                </div>

                <div className="d-md-flex align-items-center buttons-row">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={bookDetails.volumeInfo.canonicalVolumeLink}
                    className="btn btn-buy mb-3 mb-md-0"
                  >
                    Buy on Google Play
                  </a>
                  {hasBeenAddedToWishlist ? (
                    <button
                      className="btn btn-default  mb-3 mb-md-0"
                      onClick={() => removeFromWishlist(bookDetails.id)}
                    >
                      Remove from Wishlist
                    </button>
                  ) : (
                    <button
                      className=" btn btn-default  mb-3 mb-md-0"
                      onClick={() => {
                        addToWishlist(bookDetails);
                      }}
                    >
                      Add to Wishlist
                    </button>
                  )}
                  <button
                    className="btn btn-default"
                    onClick={() => setShowAddToLibraryModal(true)}
                  >
                    {existingLibraryItem?.status ? (
                      <span className="d-flex align-items-center justify-content-center">
                        <span className="me-1">
                          <Checkmark />
                        </span>
                        {readingStatusLabels[existingLibraryItem.status]}
                      </span>
                    ) : (
                      "Add To Library"
                    )}
                  </button>

                  {/* <Dropdown>
                    <Dropdown.Toggle
                      className="btn btn-default me-0"
                      id="dropdown-basic"
                    >
                      Add To Library
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        onClick={() => addToLibrary(bookDetails, "read")}
                      >
                        Read
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          addToLibrary(bookDetails, "currentlyReading")
                        }
                        href="#/action-2"
                      >
                        Currently Reading
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
              </div>
            </div>

            <div className="col-12 genre-list">
              {bookDetails?.volumeInfo?.categories?.map((category, index) => (
                <span key={index}>{category}</span>
              ))}
            </div>

            <div className="col-12 book-description">
              <p
                dangerouslySetInnerHTML={{
                  __html: bookDetails.volumeInfo.description,
                }}
              ></p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Book;
