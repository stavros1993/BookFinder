import { Link } from "react-router-dom";
import DeleteButton from "./ui/DeleteButton";
import Star from "./icons/Star";
import { useBooks } from "./contexts/BooksProvider";

function WishlistItem({ item, index }) {
  const { prepareDelete } = useBooks();
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Link to={`/book/${item.id}`}>
          <img
            width="60"
            src={item.image ? item.image : "/images/placeholder-image.png"}
            alt={item.title}
            className="rounded"
          />
        </Link>
      </td>
      <td className="mw-200">
        <Link className="btn btn-link text-start" to={`/book/${item.id}`}>
          {item.title}
        </Link>
      </td>
      <td className="mw-200">{item.authors}</td>
      {/* <td>{item.genres.length>100 ?item.genres.substring(0,100)+"..." :item.genres}</td> */}
      <td>
        <span className="d-flex align-items-center">
          <span className="d-inline-block pe-1">
            {typeof item.rating === "undefined"
              ? item.rating
              : Number(item.rating)}
          </span>
          {item.rating ? (
            <Star color="#fbbf24" stroke="#fbbf24" size="15px" />
          ) : (
            "N/A"
          )}
        </span>
      </td>
      <td className="text-nowrap">
        {item.price ? (
          <a
            href={item.storeLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-link"
          >
            {item.price}€
          </a>
        ) : (
          "Not available"
        )}
      </td>
      <td className="text-nowrap">{item.dateAdded}</td>

      <td className="text-end pe-0">
        <DeleteButton onClick={() => prepareDelete(item.id, item.title)} />
      </td>
    </tr>
  );
}

export default WishlistItem;
