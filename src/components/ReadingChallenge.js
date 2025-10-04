import { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReadingChallengePopup from "./modals/ReadingChallengePopup";
import { useLocalStorageState } from "./useLocalStorageState";
import "./ReadingChallenge.scss";

function ReadingChallenge() {
  const [booksRead, setBooksRead] = useLocalStorageState(
    null,
    "challengeBooksRead"
  );
  const [challengeBooks, setChallengeBooks] = useLocalStorageState(
    null,
    "challengeBooksGoal"
  );

  const [show, setShow] = useState(false);

  const challengePercentage =
    booksRead / challengeBooks >= 1
      ? "100"
      : ((booksRead / challengeBooks) * 100).toFixed(1);

  function handleReset() {
    setBooksRead(null);
    setChallengeBooks(null);
  }

  return (
    <section className="reading-challenge">
      <ReadingChallengePopup
        show={show}
        setShow={setShow}
        challengeBooks={challengeBooks}
        setChallengeBooks={setChallengeBooks}
        booksRead={booksRead}
        setBooksRead={setBooksRead}
      />
      <div className="container-sm">
        <div className="boxed-content">
          <h2 className="text-center text-sm-start">
            {new Date().getFullYear()} Reading Challenge
          </h2>
          <div className="row">
            <div className="col-sm-auto pb-4 pb-sm-0">
              <span className="book-challenge-thumbnail d-block text-center">
                <h5 className="book-challenge-year mb-2">
                  {new Date().getFullYear()}
                </h5>
                <img
                  alt="Book Challenge"
                  className="book-icon"
                  src="images/book-with-bookmark.png"
                />
              </span>
            </div>

            <div className="col-sm">
              <div className="d-flex flex-column h-100 text-center text-sm-start">
                <h5 className="mb-2">Your Reading Goal</h5>
                {challengeBooks ? (
                  <>
                    <p className="mb-2">
                      {booksRead >= challengeBooks
                        ? `Congratulations! You have completed the challenge!`
                        : `${booksRead} out of ${challengeBooks} books read`}
                    </p>
                    <div className="mt-auto pt-2 pt-sm-0 d-sm-flex align-items-center">
                      <button
                        className="btn btn-default mt-auto mb-3 mb-sm-0 d-inline-block w-fit-content full-width-mobile"
                        onClick={() => setShow(true)}
                      >
                        Edit Your Goal
                      </button>

                      <button
                        className="ms-sm-3 btn btn-bordered mt-auto d-inline-block w-fit-content full-width-mobile"
                        onClick={handleReset}
                      >
                        Remove Your Goal
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      Set a personal challenge to complete this year - choose a
                      goal that inspires you!
                    </p>
                    <button
                      className="btn btn-default mt-auto d-inline-block w-fit-content full-width-mobile"
                      onClick={() => setShow(true)}
                    >
                      Set challenge
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 ">
            {challengeBooks && (
              <div className="row align-items-center ">
                <div className="col">
                  <div className="progress-bar-wrapper">
                    <ProgressBar
                      className=""
                      now={(booksRead / challengeBooks) * 100}
                    />
                  </div>
                </div>

                <div className="col-auto">{challengePercentage}%</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReadingChallenge;
