import { Link } from "react-router-dom";
import "./BookSearchResultItem.scss";
import { useBooks } from "./contexts/BooksProvider";
import Star from "./icons/Star";

function BookSearchResultItem({ item, setShowSearchModal, setSearchQuery }) {
  const { addToWishlist, removeFromWishlist, checkHasBeenAddedToWishlist } =
    useBooks();

  const hasBeenAddedToWishlist = checkHasBeenAddedToWishlist(item.id);

  return (
    <div className="book-item">
      <div className="row">
        <div className="col col-img">
          <Link
            to={`/book/${item.id}`}
            onClick={() => {
              setShowSearchModal(false);
              setSearchQuery("");
            }}
          >
            <img
              alt="Book Thumbnail"
              rel="noreferrer"
              className="rounded img-fluid d-block"
              src={
                item.volumeInfo?.imageLinks?.thumbnail
                  ? item.volumeInfo.imageLinks.thumbnail
                  : "/images/placeholder-image.png"
              }
            />
          </Link>
        </div>
        <div className="col col-lg-6">
          <div className="flex-column d-flex h-100">
            <Link
              className="btn btn-link book-title"
              to={`/book/${item.id}`}
              onClick={() => {
                setShowSearchModal(false);
                setSearchQuery("");
              }}
            >
              {item.volumeInfo.title}
            </Link>

            {item.volumeInfo.authors && (
              <h6>By&nbsp;{item.volumeInfo.authors?.join(", ")}</h6>
            )}

            <div className="mt-auto d-sm-flex align-items-center bottom-info">
              {item.volumeInfo.publishedDate && (
                <span>{item.volumeInfo.publishedDate?.match(/^\d{4}/)[0]}</span>
              )}

              {item.volumeInfo.averageRating && (
                <span>
                  {item.volumeInfo.averageRating}&nbsp;
                  <Star color="#fbbf24" stroke="#fbbf24" size="20px" />
                  &nbsp;(
                  {item.volumeInfo.ratingsCount} Rating
                  {item.volumeInfo.ratingsCount > 1 && "s"})
                </span>
              )}

              {item.volumeInfo?.pageCount > 0 && (
                <span>{item.volumeInfo.pageCount} pages</span>
              )}
            </div>
          </div>
        </div>
        <div className="ms-auto col-lg-4 pt-3 pt-lg-0 text-end align-self-end">
          <div className="d-block gx-2 d-sm-flex d-lg-block align-items-center buttons-wrapper">
            <a
              rel="noreferrer"
              target="_blank"
              href={item.volumeInfo.canonicalVolumeLink}
              className="d-block btn btn-buy mb-3 mb-sm-0 mb-lg-3"
            >
              Buy on Google Play
            </a>

            {hasBeenAddedToWishlist ? (
              <button
                className="d-block btn btn-default"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove from Wishlist
              </button>
            ) : (
              <button
                className="d-block btn btn-default"
                onClick={() => {
                  addToWishlist(item);
                }}
              >
                Add to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSearchResultItem;
