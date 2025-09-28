import { useEffect, useState } from "react";
import { useBooks } from "../contexts/BooksProvider";
import EmptyPage from "../EmptyPage";
import LibraryNav from "../LibraryNav";
import LibraryItem from "../LibraryItem";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup";
import UpdateProgressPopup from "../UpdateProgressPopup";

function Library() {
  const { library, setLibrary, removeFromLibrary } =
    useBooks();
  const [libraryFilteredResults, setLibraryFilteredResults] = useState(library);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("all");
  const [showUpdateProgressPopup, setShowUpdateProgressPopup] = useState(false);
  const [libraryIdToUpdate, setLibraryIdToUpdate] = useState(null);

  useEffect(function () {
    document.title = "My Library | BookFinder";
  }, []);

  useEffect(
    function () {
      let filteredResults = library.filter(function (item) {
        return (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.authors.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      if (view === "read") {
        filteredResults = filteredResults.filter(
          (item) => item.status === "read"
        );
      } else if (view === "currentlyReading") {
        filteredResults = filteredResults.filter(
          (item) => item.status === "currentlyReading"
        );
      }

      setLibraryFilteredResults(filteredResults);
    },
    [searchQuery, library, view]
  );

  return (
    <section className="container-md">
      <DeleteConfirmationPopup removeBook={removeFromLibrary} />
      <UpdateProgressPopup
        showUpdateProgressPopup={showUpdateProgressPopup}
        setShowUpdateProgressPopup={setShowUpdateProgressPopup}
        libraryIdToUpdate={libraryIdToUpdate}
        setLibraryIdToUpdate={setLibraryIdToUpdate}
      />
      {library.length === 0 ? (
        <EmptyPage title="No Books Yet">
          <p className="font-18">
            You haven’t rated added any books to your library. Start adding
            books you have read or currently reading and they will appear here
          </p>
        </EmptyPage>
      ) : (
        <div class="mb-4">
          <h1 class="h3">My Library</h1>
          <LibraryNav
            view={view}
            setView={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <section className="">
            {libraryFilteredResults.length == 0 ? (
              <h5>No matching results</h5>
            ) : (
              <div className="row">
                {libraryFilteredResults.map(function (item) {
                  return (
                    <LibraryItem
                      libraryIdToUpdate={libraryIdToUpdate}
                      setLibraryIdToUpdate={setLibraryIdToUpdate}
                      setShowUpdateProgressPopup={setShowUpdateProgressPopup}
                      item={item}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </section>
  );
}

export default Library;
