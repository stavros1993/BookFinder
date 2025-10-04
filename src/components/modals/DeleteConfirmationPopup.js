import { useRef } from "react";
import { useBooks } from "../contexts/BooksProvider";
import Modal from "react-bootstrap/Modal";

function DeleteConfirmationPopup({ removeBook }) {
  const { bookToDelete, showDeleteModal, setShowDeleteModal } = useBooks();

  function handleDelete() {
    removeBook(bookToDelete.id);
    setShowDeleteModal(false);
  }

  function handleClose() {
    setShowDeleteModal(false);
  }

  const btnDeleteEl = useRef(null);

  return (
    <Modal
      className="confirmation-popup"
      onHide={handleClose}
      size="sm"
      show={showDeleteModal}
      onEntered={() => btnDeleteEl.current?.focus()}
      centered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        <Modal.Body>
          <p className="mb-4">
            Are you sure you want to delete "{bookToDelete?.title}" from the
            list?
          </p>
          <div className="row gx-2">
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-danger w-100"
                ref={btnDeleteEl}
                onClick={() => handleDelete(bookToDelete?.id)}
              >
                Delete
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-default w-100"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
}

export default DeleteConfirmationPopup;
