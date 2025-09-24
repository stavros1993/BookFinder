import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "./BestSellerBooks.scss";
import { useState, useEffect } from "react";
import Spinner from "./ui/Spinner";
import Nav from "react-bootstrap/Nav";

const NYT_API_KEY = "7QWNAdE2xwF0SCWJqeoDmEfCRHM6ONQq";
function BestSellerBooks() {
  const [isLoadingBestSellerBooks, setIsLoadingBestSellerBooks] =
    useState(false);
  const [bestSellerBooks, setBestSellerBooks] = useState([]);
  const [errorBestSellerBooks, setErrorBestSellerBooks] = useState("");
  const [filterQuery, setFilterQuery] = useState("current"); //Default value is current week

  useEffect(
    function () {
      async function fetchBestSellerBooks() {
        try {
          setIsLoadingBestSellerBooks(true);
          const res = await fetch(
            `https://api.nytimes.com/svc/books/v3/lists/${filterQuery}/hardcover-fiction.json?api-key=${NYT_API_KEY}`
          );

          const data = await res.json();
          if (data) {
            setBestSellerBooks(data.results.books);
            setIsLoadingBestSellerBooks(false);
          }
        } catch (e) {
          setErrorBestSellerBooks("Error loading top seller books");
          console.log(e);
        } finally {
        }
      }

      fetchBestSellerBooks();
    },
    [filterQuery]
  );

  function handleBookFilter(filterBy) {
    const today = new Date();
    const year = String(today.getFullYear());

    if (filterBy === "current") {
      setFilterQuery("current");
    } else if (filterBy === "monthly") {
      let month = String(today.getMonth() + 1);
      month = month < 10 ? 0 + month : month;
      setFilterQuery(`${year}-${month}-01`);
    } else if (filterBy === "yearly") {
      setFilterQuery(`${year}-01-01`);
    }
  }

  return (
    <section className="top-books-section">
      <div className="container-sm">
        <div className="d-sm-flex align-items-center justify-content-between mb-3">
          <h3 className="mb-0">Trending on Hardcover</h3>

          <div className="pt-4 pt-sm-0">
            <Nav variant="underline" defaultActiveKey="link-1">
              <Nav.Item>
                <Nav.Link
                  eventKey="link-1"
                  onClick={() => handleBookFilter("current")}
                >
                  Last Week
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-2"
                  onClick={() => handleBookFilter("monthly")}
                >
                  Last Month
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  onClick={() => handleBookFilter("yearly")}
                >
                  Last Year
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>

        <p className="font-18 mb-4">
          Here are some of the most-read books, according to the New York Times
        </p>

        <div className="top-books-swiper-wrapper">
          {isLoadingBestSellerBooks && errorBestSellerBooks && (
            <p>Error loading books...</p>
          )}

          {isLoadingBestSellerBooks && !errorBestSellerBooks && <Spinner />}

          {!isLoadingBestSellerBooks && !errorBestSellerBooks && (
            <Swiper
              className="top-books-swiper"
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={2.5}
              navigation
              breakpoints={{

                576: {
                  slidesPerView:4,
                },
                768: {
                  slidesPerView:5,
                },

                992: {
                  slidesPerView: 7,
                },
              }}
            >
              {bestSellerBooks.map(function (item) {
                return (
                  <SwiperSlide>
                    <div className="img-wrapper">
                      <img
                        title={item.title}
                        alt={item.title}
                        className="top-book-img"
                        src={item.book_image}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}

export default BestSellerBooks;
