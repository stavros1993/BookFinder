import { useEffect } from "react";
import { useBooks } from "../contexts/BooksProvider";
import RatingItem from "../RatingItem";
import RatingsStats from "../RatingsStats";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup";
import EmptyPage from "../EmptyPage";

function Ratings() {
  const { ratedBooks } = useBooks();

  useEffect(function () {
    document.title = "My Ratings | BookFinder";
  }, []);

  const { removeFromRatedBooks } = useBooks();

  if (ratedBooks.length === 0) {
    return (
      <EmptyPage title="No Ratings Yet">
        <p className="font-18">
          You haven't rated any books yet. Rate a book to see your ratings
          appear here.
        </p>
      </EmptyPage>
    );
  }

  return (
    <main className="ratings-page">
      <DeleteConfirmationPopup removeBook={removeFromRatedBooks} />
      <div className="container-md">
        <div class="row align-items-center align-items-center mb-4">
          <div class="col-auto">
            <h1 class="h3 mb-0">My Ratings</h1>
          </div>
        </div>
        <>
          <RatingsStats ratedBooks={ratedBooks} />
          <div className="ratings-row row">
            {ratedBooks.map(function (book) {
              return (
                <div className="col-sm-6 col-lg-4 pb-4">
                  <RatingItem item={book} />
                </div>
              );
            })}
          </div>
        </>
      </div>
    </main>
  );
}

export default Ratings;
