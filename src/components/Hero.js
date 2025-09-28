import OpenSearchModalButton from "./ui/OpenSearchModalButton";
import "./Hero.scss";

function Hero() {

  return (
    <section className="hero">
      <div className="container">
        <div className="row gx-5 align-items-center">
          <div className="col-md-6 hero-img-wrapper pb-5 pb-md-0">
            <img className="w-100" alt="Hero" src="images/hero.png" />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h1>Book smart with BookFinder</h1>
            <p className="font-18">
              Discover and collect books with ease — add titles to your
              Wishlist, purchase them directly from the external store, rate
              the ones you’ve read or add them to your library.
            </p>
            <OpenSearchModalButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
