import { useBooks } from "../contexts/BooksProvider";
import Modal from "react-bootstrap/Modal";
import Checkmark from "../icons/Checkmark";
import "./Modals.scss";

function AddToLibraryPopup({
  show,
  setShow,
  bookDetails,
  hasBeenAddedToLibrary,
  existingLibraryItem = null,
}) {
  const handleClose = () => {
    setShow(false);
  };

  const {
    addToLibrary,
    removeFromLibrary,
  } = useBooks();

  return (
    <Modal
      className="add-to-library-popup"
      onHide={handleClose}
      size="md"
      show={show}
      centered
    >
      <Modal.Header
        className="text-center d-flex align-items-center mb-0"
        closeButton
      >
        <Modal.Title className="mb-0">Choose a shelf for this book</Modal.Title>
      </Modal.Header>

      <Modal.Body closeButton className="p-4">
        <div className="buttons-row">
          <button
            className={`btn btn-default btn-rounded w-100 mb-3 ${
              existingLibraryItem?.status === "currentlyReading" && "active"
            }`}
            onClick={() => {
              handleClose();
              addToLibrary(
                bookDetails,
                "currentlyReading",
                hasBeenAddedToLibrary,
                existingLibraryItem
              );
            }}
          >
            {existingLibraryItem?.status === "currentlyReading" && (
              <span className="me-1">
                <Checkmark />
              </span>
            )}
            Currently Reading
          </button>
          <button
            className={`btn btn-default btn-rounded w-100 mb-3 ${
              existingLibraryItem?.status === "read" && "active"
            }`}
            onClick={() => {
              handleClose();
              addToLibrary(
                bookDetails,
                "read",
                hasBeenAddedToLibrary,
                existingLibraryItem
              );
            }}
          >
            {existingLibraryItem?.status === "read" && (
              <span className="me-1">
                <Checkmark />
              </span>
            )}
            Read
          </button>

          {hasBeenAddedToLibrary && (
            <button
              className="btn btn-link w-100"
              onClick={() => {
                handleClose();
                removeFromLibrary(bookDetails.id);
              }}
            >
              Delete From Library
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddToLibraryPopup;
