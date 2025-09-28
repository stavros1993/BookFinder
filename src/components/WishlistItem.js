import { Link } from "react-router-dom";
import DeleteButton from "./ui/DeleteButton";
import Star from "./icons/Star";
import { useBooks } from "./contexts/BooksProvider";
import "./WishlistItem.scss";

function WishlistItem({ item, index }) {
  const { prepareDelete } = useBooks();
  return (
    <div className="wishlist-item boxed-content">
      <div className="row gx-3 gx-sm-4">
        <div className="col col-number">
          <div className="h-100 d-flex align-items-end justify-content-center">
            {index + 1}
          </div>
        </div>

        <div className="col col-img">
          <Link to={`/book/${item.id}`}>
            <img
              src={item.image ? item.image : "/images/placeholder-image.png"}
              alt={item.title}
              className="rounded w-100"
            />
          </Link>
        </div>
        <div className="col">
          <div className="d-flex flex-column h-100">
            <Link
              className="btn btn-link text-start h4 mb-2 mb-sm-1"
              to={`/book/${item.id}`}
            >
              {item.title}
            </Link>
            <h6 className="mb-3">{item.authors}</h6>
            <div className="row middle-row align-items-center py-1">
              <div className="col">
                <div className="row font-small gx-3 gx-sm-4 ls-1">
                  <div className="d-none d-md-block col-md-6">REVIEWS:</div>
                  <div className="col-auto col-md-6">
                    {typeof item.rating !== "undefined" && item.rating!=null  ? (
                      <>
                        <span className="me-1">{item.rating}</span>
                        <Star color="#fbbf24" stroke="#fbbf24" size="15px" />
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="col-6 d-none d-md-block">
                    PUBLICATION DATE:
                  </div>
                  <div className="col-auto col-md-6">
                    {item.publishedDate && item.publishedDate}
                  </div>
                </div>
              </div>

              <div className="col col-price text-start text-sm-end pt-3 pt-sm-0">
                {item.price ? (
                  <a
                    href={item.storeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-buy full-width-mobile"
                  >
                    €{item.price}&nbsp;Buy
                  </a>
                ) : (
                  "Not available"
                )}
              </div>
            </div>
            <div className="row bottom-row mt-auto font-small pt-3 pt-sm-2">
              <div className="col d-none d-md-block">
                <div className="genre-list pt-0 ">
                  {item?.genres?.slice(0, 1).map((category, index) => (
                    <span className="mb-0" key={index}>
                      {category.substring(0)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ms-sm-auto col-auto align-self-end">
                <div className="d-flex align-items-center">
                  <span>
                    Added on{" "}
                    {new Date(item.dateAdded).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    className="btn btn-link font-small ms-1"
                    onClick={() => prepareDelete(item.id, item.title)}
                  >
                    (remove)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
