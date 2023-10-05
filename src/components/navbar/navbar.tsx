import "./navbar.scss";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import CartSideMenu from "../cartSideMenu/cartSideMenu";
import { useShoppingCart } from "../../context/shoppingCartContext";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useState } from "react";

import BlackIcon from "../../assets/logos/blackIcon.png";
import WhiteIcon from "../../assets/logos/whiteIcon.png";

const Navbar = () => {
  const navigate = useNavigate();

  const { getEntireCart } = useShoppingCart();
  const { width } = useWindowDimensions();

  const [smallNavOpen, setSmallNavOpen] = useState(false);

  const location = useLocation();

  return (
    <>
      <nav
        className="Navbar"
        style={{ color: location.pathname === "/" ? "white" : "black" }}
      >
        <div className="Navbar__Image">
          <img
            src={
              location.pathname === "/"
                ? "/icons/logoWhitePng.png"
                : "/icons/black.svg"
            }
            className="Navbar__Image__Big"
            alt="Stargaze Logo"
            onClick={() => navigate("/")}
            draggable={false}
          />

          <img
            className="Navbar__Image__Small"
            src={location.pathname === "/" ? WhiteIcon : BlackIcon}
            alt="Stargaze Logo"
            onClick={() => navigate("/")}
            draggable={false}
          />
        </div>

        <div className="Navbar__Links">
          <Link
            style={{ color: location.pathname === "/" ? "white" : "black" }}
            to={"/catalogue"}
          >
            CATALOGUE
          </Link>
          <Link
            style={{ color: location.pathname === "/" ? "white" : "black" }}
            to={"/collections"}
          >
            COLLECTIONS
          </Link>
          <Link
            style={{ color: location.pathname === "/" ? "white" : "black" }}
            to={"/archive"}
          >
            ARCHIVE
          </Link>
        </div>

        <div className="Navbar__Icons">
          <FontAwesomeIcon icon={faSearch} />
          <span
            className="Navbar__Icons__Cart"
            onClick={() => {
              const cart = document.getElementsByClassName("CartSide");

              if (width < 1300 && width > 850) {
                (cart[0]! as any).style.width = "40vw";
              } else if (width < 850) {
                (cart[0]! as any).style.width = "100vw";
              } else {
                (cart[0]! as any).style.width = "30vw";
              }
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <div>{getEntireCart().length}</div>
          </span>

          <div
            className="Navbar__Icons__Rectangles"
            onClick={() => {
              // @ts-ignore
              const rectOne: HTMLElement = document.getElementsByClassName(
                "Navbar__Icons__Rectangle__One"
              )[0];

              // @ts-ignore

              const rectTwo: HTMLElement = document.getElementsByClassName(
                "Navbar__Icons__Rectangle__Two"
              )[0];

              // @ts-ignore
              const nav: HTMLElement =
                document.getElementsByClassName("Navbar__Small")[0];

              if (smallNavOpen) {
                rectOne.style.transform = "rotate(0deg)";
                rectTwo.style.transform = "rotate(0deg)";

                rectOne.style.top = "0";
                rectTwo.style.bottom = "0";

                // If the location of the page is index, then we change the bars to be white.
                if (location.pathname === "/") {
                  rectOne.style.backgroundColor = "white";
                  rectTwo.style.backgroundColor = "white";
                } else {
                  rectOne.style.backgroundColor = "#151313";
                  rectTwo.style.backgroundColor = "#151313";
                }

                nav.style.width = "0vw";

                setSmallNavOpen(false);
              } else {
                rectOne.style.transform = "rotate(45deg)";
                rectTwo.style.transform = "rotate(-45deg)";

                rectOne.style.top = "0.42rem";
                rectTwo.style.bottom = "0.42rem";

                rectOne.style.backgroundColor = "white";
                rectTwo.style.backgroundColor = "white";

                nav.style.width = "100vw";

                setSmallNavOpen(true);
              }
            }}
          >
            <div className="Navbar__Icons__Rectangle__One"></div>
            <div className="Navbar__Icons__Rectangle__Two"></div>
          </div>
        </div>
      </nav>

      <div className="Navbar__Small">
        <Link to={"/catalogue"}>CATALOGUE</Link>
        <Link to={"/collections"}>COLLECTIONS</Link>
        <Link to={"/archive"}>ARCHIVE</Link>
      </div>

      <CartSideMenu />
    </>
  );
};

export default Navbar;
