import CloseIcon from "./icons/CloseIcon";
import Search from "./icons/Search";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function LibraryNav({ searchQuery, setSearchQuery, view, setView }) {
  return (
    <nav className="d-sm-flex align-items-center">
      <ToggleButtonGroup
        type="radio"
        name="options"
        value={view}
        className="list-unstyled d-flex align-items-center mb-3 mb-sm-0"
      >
        <ToggleButton
          className="btn btn-nav btn-small justify-content-center justify-content-sm-start"
          value={"all"}
          onClick={() => {
            setView("all");
          }}
        >
          All
        </ToggleButton>
        <ToggleButton
          className="btn btn-nav btn-small justify-content-center justify-content-sm-start"
          value={"read"}
          onClick={() => {
            setView("read");
          }}
        >
          Read
        </ToggleButton>
        <ToggleButton
          className="btn btn-nav btn-small justify-content-center justify-content-sm-start"
          value={"currentlyReading"}
          onClick={() => {
            setView("currentlyReading");
          }}
        >
          Currently Reading
        </ToggleButton>
      </ToggleButtonGroup>
      <div className="ms-auto">
        <div className="search-wrapper w-100">
          <input
            className="input-search w-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title of author..."
          />
          {searchQuery.length ? (
            <button
              className="cancel-search-btn"
              onClick={() => setSearchQuery("")}
            >
              <CloseIcon />
            </button>
          ) : (
            <Search />
          )}
        </div>
      </div>
    </nav>
  );
}

export default LibraryNav;
