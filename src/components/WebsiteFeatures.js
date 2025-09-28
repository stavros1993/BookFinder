import WebsiteFeatureItem from "./WebsiteFeatureItem";
import Search from "./icons/Search";
import Bookmark from "./icons/Bookmark";
import Star from "./icons/Star";
import Challenge from "./icons/Challenge";
import Book from "./icons/Book";

function WebsiteFeatures() {
  return (
    <section className="website-features">
      <div className="container-md">
        <div className="row justify-content-center gx-3">
          <WebsiteFeatureItem title="Find" Icon={Search}>
            Search for new books and find titles that match your interests and
            preferences.
          </WebsiteFeatureItem>
          <WebsiteFeatureItem title="Track" Icon={Bookmark}>
            Keep track of the books you want by saving them to your wishlist
          </WebsiteFeatureItem>
          <WebsiteFeatureItem title="Rate" Icon={Star}>
            Rate the books you have read to keep a personal record of your
            favorite books.
          </WebsiteFeatureItem>
          <WebsiteFeatureItem title="Library" Icon={Book}>
            Add books to your library to keep track of your collection and your
            reading progress.
          </WebsiteFeatureItem>
          <WebsiteFeatureItem title="Challenge" Icon={Challenge}>
            Set the book challenge by choosing how many books you want to finish
            this year.
          </WebsiteFeatureItem>
        </div>
      </div>
    </section>
  );
}

export default WebsiteFeatures;
