import { Link } from "react-router-dom";
import StarRating from "./starRating";
import { useBooks } from "./contexts/BooksProvider";
import DeleteButton from "./ui/DeleteButton";
import "./RatingItem.scss";

function RatingItem({ item }) {
  const { prepareDelete } = useBooks();

  return (
    <div className="boxed-content">
      <div className="row h-100 gx-3 gx-lg-4">
        <div className="col col-img">
          <Link className="book-link" to={`/book/${item.id}`}>
            <img
              alt={item.title}
              src={item.image ? item.image : "/images/placeholder-image.png"}
              className="book-img"
            />
          </Link>
        </div>
        <div className="col">
          <div className="d-flex flex-column h-100">
            <h6 className="mb-2">
              <Link className="btn btn-link" to={`/book/${item.id}`}>
                {item.title}
              </Link>
            </h6>
            <p>{item.authors}</p>

            <div className="mt-auto d-md-flex d-lg-block d-xl-flex align-items-center justify-content-between">
              <StarRating size={20} bookDetails={item} />
              <span className="date-added d-inline-block pt-2 pt-md-0 ps-0">
                {item.dateAdded}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DeleteButton onClick={() => prepareDelete(item.id, item.title)} />
    </div>
  );
}

export default RatingItem;
