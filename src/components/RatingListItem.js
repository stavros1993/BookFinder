import { Link } from "react-router-dom";
import StarRating from "./starRating";
import { useBooks } from "./contexts/BooksProvider";
import "./RatingItem.scss";

function RatingListItem({ item }) {
  const { prepareDelete } = useBooks();

  return (
    <div className="col-12 mb-4 rating-list-item">
      <div className="boxed-content">
        <div className="row h-100 gx-3 gx-md-4 align-items-center">
          <div className="col col-img">
            <Link className="book-link" to={`/book/${item.id}`}>
               <img
                alt={item.title}
                src={item.image ? item.image : "/images/placeholder-image.png"}
                className="book-img"
              />
            </Link>
          </div>
          <div className="col-4 text-start">
            <h6 className="mb-2">
              <Link className="btn btn-link text-start" to={`/book/${item.id}`}>
                {item.title}
              </Link>
            </h6>
            <p className="mb-2">{item.authors}</p>
            <span className="date-added d-block">Rated on:&nbsp;{item.dateAdded}</span>
          </div>
          <div className="col-auto">
            <StarRating size={20} bookDetails={item} />
          </div>
          <div className="col text-end">
            <button
              className="btn btn-danger"
              onClick={() => prepareDelete(item.id, item.title)}
            >
              Remove Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingListItem;
