import "./EmptyPage.scss";
import OpenSearchModalButton from "./ui/OpenSearchModalButton";

function EmptyPage({ title, children }) {
  return (
    <main className="empty-page">
      <div className="container-sm">
        <div className="content">
          <img
            alt="Book Thumbnail"
            rel="noreferrer"
            className="book-img"
            src="/images/book-with-bookmark.png"
          />
          <h1 className="h2">{title}</h1>
          {children}
          <OpenSearchModalButton />
        </div>
      </div>
    </main>
  );
}

export default EmptyPage;
