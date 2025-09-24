import { Link } from "react-router-dom";
import BestSellerBooks from "./BestSellerBooks";
import OpenSearchModalButton from "./ui/OpenSearchModalButton";

function PageNotFound() {
  return (
    <main className="page-not-found py-5">
      <div className="container-sm text-center">
        <div>
          <h1 className="h2">404: Page Not Found</h1>
          <p>
            Oops! It looks like you've wandered off the map. The page you're
            looking for can't be found.
          </p>
          <p>
            Whether the link is broken or you typed in the wrong address, you're
            not lost for good. Let's get you back on track.
          </p>

          {/* <ul>
            <li>Go back to the homepage</li>
            <li>Search for a new book using the search bar above.</li>
            <li>Check out some of our most popular books below.</li> .
          </ul> */}
          {/* <BlueButton /> */}

          <Link to="/" className="btn btn-bordered btn-large me-3">
            Homepage
          </Link>
          <OpenSearchModalButton />
        </div>
      </div>
      <BestSellerBooks />
    </main>
  );
}

export default PageNotFound;
