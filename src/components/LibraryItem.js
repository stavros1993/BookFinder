import { Link } from "react-router-dom";
import DeleteButton from "./ui/DeleteButton";
import "./LibraryItem.scss";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useBooks } from "./contexts/BooksProvider";

function LibraryItem({
  item,
  setShowUpdateProgressPopup,
  setLibraryIdToUpdate,
  libraryIdToUpdate,
}) {
  const { prepareDelete, bookToDelete } = useBooks();

  return (
    <div className="col col-library-item pb-4">
      <div className="boxed-content h-100">
        <div className="d-flex flex-column h-100">
          <Link className="book-link mb-3 d-block" to={`/book/${item.id}`}>
            <img
              alt={item.title}
              src={item.image ? item.image : "/images/placeholder-image.png"}
              className="w-100 rounded shadowed book-thumbnail"
            />
          </Link>

          <div className="d-flex flex-column h-100 text-center">
            <Link
              className="d-block font-18 btn btn-link mb-2 "
              to={`/book/${item.id}`}
            >
              {item.title}
            </Link>

            <h6 className="">{item.authors}</h6>

            {item.status == "read" ? (
              <>
                <ProgressBar now={100} className="mt-auto " />
                <span className="d-block font-14">Completed</span>
              </>
            ) : (
              <>
                <ProgressBar
                  now={Math.floor(
                    ((item?.currentPage || 0) / item?.pages) * 100
                  )}
                />
                <div className="d-flex align-items-center justify-content-between font-14">
                  <span className="d-inline-block me-2">
                    {Math.floor(
                      ((item?.currentPage || 0) / item?.pages) * 100
                    ) + "% Read"}
                  </span>
                  <span className="d-inline-block">
                    <button
                      className="btn btn-link font-14"
                      onClick={() => {
                        setLibraryIdToUpdate(item.id);
                        setShowUpdateProgressPopup(true);
                      }}
                    >
                      Update Progress
                    </button>
                  </span>
                </div>
              </>
            )}
          </div>
          <DeleteButton onClick={() => prepareDelete(item.id, item.title)} />
        </div>
      </div>
    </div>
  );
}

export default LibraryItem;
