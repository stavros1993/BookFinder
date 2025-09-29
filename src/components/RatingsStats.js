function RatingsStats({ ratedBooks }) {
  const avgRating = (
    ratedBooks.reduce((acc, book) => acc + book.userRating, 0) /
    ratedBooks.length
  ).toFixed(1);

  const arrLength = ratedBooks.length;

  const topStarReviews = ratedBooks.filter(function (item) {
    return item.userRating === 5;
  }).length;

  function getCurMonthTotalRatings() {
    const curMonthRatings = ratedBooks.filter(function (item) {
      return new Date(item.dateAdded).getMonth() === new Date().getMonth();
    });
    return curMonthRatings.length;
  }

  return (
    <section className="container-md pt-0">
      <div className="boxed-content">
        <div className="row gx-2 gx-md-4">
          <div className="col-3 text-center">
            <span className="font-xlarge mb-3 text-light-blue fw-6">
              {avgRating}
            </span>
            <span className="d-block">Average Rating</span>
          </div>
          <div className="col-3 text-center">
            <span className="font-xlarge mb-3 text-light-blue fw-6">
              {arrLength}
            </span>
            <span className="d-block">Books Rated</span>
          </div>
          <div className="col-3 text-center">
            <span className="font-xlarge mb-3 text-light-blue fw-6">
              {topStarReviews}
            </span>
            <span className="d-block">5 Star Ratings</span>
          </div>
          <div className="col-3 text-center">
            <span className="font-xlarge mb-3 text-light-blue fw-6">
              {getCurMonthTotalRatings()}
            </span>
            <span className="d-block">This Month</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RatingsStats;
