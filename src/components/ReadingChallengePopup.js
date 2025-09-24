import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ReadingChallengePopup({
  show,
  setShow,
  challengeBooks,
  setChallengeBooks,
  booksRead,
  setBooksRead,
}) {
  // local temp states for the form inputs
  const [tempBooksRead, setTempBooksRead] = useState(booksRead || 0);
  const [tempChallengeBooks, setTempChallengeBooks] = useState(
    challengeBooks || 0
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (tempChallengeBooks > 0) {
      setBooksRead(tempBooksRead);
      setChallengeBooks(tempChallengeBooks);
      setShow(false);
    }
  }

  return (
    <Modal
      className="modal-dialog-centered"
      onHide={() => setShow(false)}
      size="md"
      show={show}
      centered
    >
      <Modal.Body>
        <form className="w-100" onSubmit={handleSubmit}>
          <h4 className="text-center mb-4">Set a goal</h4>

          <label className="mb-2">
            How many books have you read so far this year?
          </label>
          <input
            type="number"
            className="d-block w-100 mb-3"
            value={tempBooksRead}
            onChange={(e) => setTempBooksRead(Number(e.target.value))}
          />

          <label className="mb-2">
            How many books would you like to read this year?
          </label>
          <input
            type="number"
            className="d-block w-100 mb-3"
            value={tempChallengeBooks}
            onChange={(e) => setTempChallengeBooks(Number(e.target.value))}
          />

          <div className="row gx-3">
            <div className="col-6">
              <button type="submit" className="btn btn-default w-100">
                Set challenge
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-bordered w-100"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ReadingChallengePopup;
