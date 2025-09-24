import { useBooks } from "../contexts/BooksProvider";

function OpenSearchModalButton() {
  const { setShowSearchModal } = useBooks();

  return (
    <button
      class="btn btn-buy btn-large"
      onClick={() => setShowSearchModal(true)}
    >
      Find Books
    </button>
  );
}

export default OpenSearchModalButton;
