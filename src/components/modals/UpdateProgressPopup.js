import { useState, useEffect } from "react";
import { useBooks } from "../contexts/BooksProvider";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Modals.scss";

function UpdateProgressPopup({
  showUpdateProgressPopup,
  setShowUpdateProgressPopup,
  libraryIdToUpdate,
}) {
  const { library, setLibrary } = useBooks();

  const currentBook = library.find((item) => item.id === libraryIdToUpdate);

  const [currentPageInput, setCurrentPageInput] = useState(
    Number(currentBook?.currentPage)
  );

  useEffect(() => {
    if (currentBook?.currentPage !== undefined) {
      setCurrentPageInput(Number(currentBook.currentPage));
    }
  }, [currentBook]);

  const handleClose = () => {
    setShowUpdateProgressPopup(false);
  };

  function updateProgress() {
    if (currentPageInput < 0 || currentPageInput > currentBook.pages) {
      return;
    } else {
      if (currentPageInput === currentBook.pages) {
        completeBook();
      } else {
        setLibrary(function (prevLibrary) {
          return prevLibrary.map(function (item) {
            if (item.id === currentBook.id) {
              return { ...item, currentPage: currentPageInput };
            } else {
              return item;
            }
          });
        });
        setShowUpdateProgressPopup(false);
      }
    }
  }

  function completeBook() {
    setLibrary(function (prevLibrary) {
      return prevLibrary.map(function (item) {
        if (item.id === currentBook.id) {
          return { ...item, currentPage: currentBook.pages, status: "read" };
        } else {
          return item;
        }
      });
    });
    setShowUpdateProgressPopup(false);
  }

  return (
    <Modal
      className="update-progress-popup"
      onHide={handleClose}
      size="md"
      show={showUpdateProgressPopup}
      centered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Modal.Body>
          <div className="d-sm-flex align-items-center pb-4">
            <span>Currently on page</span>
            <input
              type="number"
              value={currentPageInput}
              onChange={(e) => setCurrentPageInput(Number(e.target.value))}
              className="mx-2"
            />
            <span>of</span>
            <input
              disabled
              type="number"
              value={Number(currentBook?.pages)}
              className="mx-2"
            />

            <button
              type="button"
              className="text-left d-block d-sm-inline-block btn btn-link mx-sm-auto mt-2 mt-sm-0"
              onClick={completeBook}
            >
              I'm finished!
            </button>
          </div>

          <ProgressBar
            className="mb-1 bg-dark-grey-2"
            now={Math.floor(
              ((currentBook?.currentPage || 0) / currentBook?.pages) * 100
            )}
          />
          <span className="d-inline-block me-2">
            {Math.floor(
              ((currentBook?.currentPage || 0) / currentBook?.pages) * 100
            ) + "% Read"}
          </span>
          <div className="d-flex gx-3 row align-items-center flex-wrap pt-4">
            <div className="col-6">
              <button className="btn btn-buy w-100" onClick={updateProgress}>
                Update Progress
              </button>
            </div>

            <div className="col-6">
              <button className="btn btn-bordered w-100" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
}

export default UpdateProgressPopup;
