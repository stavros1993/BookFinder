import { useEffect } from "react";
import Hero from "../Hero";
import BestSellerBooks from "../BestSellerBooks";
import ReadingChallenge from "../ReadingChallenge";
import WebsiteFeatures from "../WebsiteFeatures";

function Homepage() {
  useEffect(function () {
    document.title = "Home | BookFinder";
  }, []);
  return (
    <main>
      <Hero />
      <WebsiteFeatures />
      <ReadingChallenge />
      <BestSellerBooks />
    </main>
  );
}

export default Homepage;
