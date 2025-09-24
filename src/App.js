import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BooksProvider } from "./components/contexts/BooksProvider";
import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import Book from "./components/Book";
import Wishlist from "./components/pages/Wishlist";
import Ratings from "./components/pages/Ratings";
import PageNotFound from "./components/PageNotFound";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";


function App() {


  return (
    <div>
      <BrowserRouter>
        <BooksProvider>
          <Header
          />
          <Routes>
            <Route
              path="/"
              element={
                <Homepage />
              }
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="book/:id" element={<Book />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BooksProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
