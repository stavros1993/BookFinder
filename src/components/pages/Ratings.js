import { useEffect, useState } from "react";
import { useLocalStorageState } from "../useLocalStorageState";
import { useBooks } from "../contexts/BooksProvider";
import RatingListItem from "../RatingListItem";
import RatingGridItem from "../RatingGridItem";
import RatingsStats from "../RatingsStats";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup";
import EmptyPage from "../EmptyPage";
import ListView from "../icons/ListView";
import GridView from "../icons/GridView";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function Ratings() {
  const { ratedBooks } = useBooks();
  const [view, setView] =  useLocalStorageState("grid", "view-type");

  useEffect(function () {
    document.title = "My Ratings | BookFinder";
  }, []);

  const { removeFromRatedBooks } = useBooks();

  if (ratedBooks.length === 0) {
    return (
      <EmptyPage title="No Ratings Yet">
        <p className="font-18">
          You haven’t rated any books yet. Start rating to see your list appear
          here
        </p>
      </EmptyPage>
    );
  }

  return (
    <main className="ratings-page">
      <DeleteConfirmationPopup removeBook={removeFromRatedBooks} />
      <div className="container-md">
        <div class="row align-items-top align-items-center mb-4">
          <div class="col-auto">
            <h1 class="h3 mb-0">My Ratings</h1>
          </div>
          <div class="col text-end d-none d-sm-block">
            <ToggleButtonGroup type="radio" name="options" value={view}>
              <ToggleButton value={"grid"} onClick={() => setView("grid")}>
                <GridView />
              </ToggleButton>
              <ToggleButton value={"list"} onClick={() => setView("list")}>
                <ListView />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <>
          <RatingsStats ratedBooks={ratedBooks} />
          <div className="ratings-row row">
            {ratedBooks.map(function (book) {
              return (
                <>
                  {view === "grid" ? (
                    <RatingGridItem item={book} />
                  ) : (
                    <RatingListItem item={book} />
                  )}
                </>
              );
            })}
          </div>
        </>
      </div>
    </main>
  );
}

export default Ratings;
