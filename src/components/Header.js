import { useEffect } from "react";
import { useLocalStorageState } from "./useLocalStorageState";
import Logo from "./Logo";
import SearchPopup from "./SearchPopup";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import "./Header.scss";

function Header() {
  const [darkMode, setDarkMode] = useLocalStorageState(true, "theme");

  useEffect(
    function () {
      if (darkMode) {
        document.body.classList.remove("light-mode");
      } else {
        document.body.classList.add("light-mode");
      }
    },
    [darkMode]
  );

  return (
    <header className="header">
      <div className="container">
        <div className="row gx-2 gx-lg-0  d-flex align-items-center">
          <Logo />
          <SearchBar />
          <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
          <SearchPopup />
        </div>
      </div>
      <MobileMenu />
    </header>
  );
}

export default Header;
