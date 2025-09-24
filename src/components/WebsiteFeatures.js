import "./WebsiteFeatures.scss";
import Search from "./icons/Search";
import Bookmark from "./icons/Bookmark";
import Star from "./icons/Star";
import Challenge from "./icons/Challenge";
import WebsiteFeatureItem from "./WebsiteFeatureItem";

function WebsiteFeatures() {
  return (
    <section className="website-features">
      <div className="container-sm">
        <div className="row gx-3">
          <WebsiteFeatureItem title="Find" Icon={Search}>
            Search for new books and find titles that match your
            interests and preferences.
          </WebsiteFeatureItem>
          <WebsiteFeatureItem title="Track" Icon={Bookmark}>
            Save the books you want to list in your wishlist to easily keep
            track.
          </WebsiteFeatureItem>
          <WebsiteFeatureItem title="Rate" Icon={Star}>
            Rate the books you have read to keep a personal record of your
            favorite books.
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
