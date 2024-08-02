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
          <a
            className="Navbar__Links__Link"
            style={{ color: location.pathname === "/" ? "white" : "#151313" }}
            onClick={() => {
              if (location.pathname !== "/catalogue") {
                navigate("/catalogue");
              }
            }}
          >
            SHOP
          </a>
          <Link
            className="Navbar__Links__Link"
            style={{ color: location.pathname === "/" ? "white" : "#151313" }}
            to={"/collections"}
          >
            COLLECTIONS
          </Link>
          <Link
            className="Navbar__Links__Link"
            style={{ color: location.pathname === "/" ? "white" : "#151313" }}
            to={"/archive"}
          >
            ARCHIVE
          </Link>
        </div>

        <div className="Navbar__Icons">
          <FontAwesomeIcon
            icon={faSearch}
            onClick={() => navigate("/search")}
          />
          <span
            style={{
              display: location.pathname === "/checkout" ? "none" : "block",
            }}
            className="Navbar__Icons__Cart"
            onClick={() => {
              // @ts-ignore
              const cart: HTMLElement[] =
                document.getElementsByClassName("CartSide");
              // @ts-ignore
              const root: HTMLElement = document.getElementById("root");

              if (width > 800) {
                cart[0].style.width = "35rem";
              } else {
                cart[0].style.width = "100vw";
                root.style.overflowY = "hidden";
              }
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <div
              style={{
                backgroundColor:
                  location.pathname === "/" ? "white" : "#151313",
                color: location.pathname === "/" ? "#151313" : "white",
              }}
            >
              {getEntireCart().length}
            </div>
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
              const root: HTMLElement = document.getElementById("root");

              // @ts-ignore
              const nav: HTMLElement =
                document.getElementsByClassName("Navbar__Small")[0];

              if (smallNavOpen) {
                root.style.overflowY = "scroll";

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
                root.style.overflowY = "hidden";

                rectOne.style.transform = "rotate(45deg)";
                rectTwo.style.transform = "rotate(-45deg)";

                rectOne.style.top = "0.4rem";
                rectTwo.style.bottom = "0.4rem";

                rectOne.style.backgroundColor = "white";
                rectTwo.style.backgroundColor = "white";

                nav.style.width = "100vw";

                setSmallNavOpen(true);
              }
            }}
          >
            <div
              style={{
                backgroundColor:
                  location.pathname === "/" ? "white" : "#151313",
              }}
              className="Navbar__Icons__Rectangle__One"
            ></div>
            <div
              style={{
                backgroundColor:
                  location.pathname === "/" ? "white" : "#151313",
              }}
              className="Navbar__Icons__Rectangle__Two"
            ></div>
          </div>
        </div>
      </nav>

      <div className="Navbar__Small">
        <Link
          onClick={() => {
            // @ts-ignore
            const root: HTMLElement = document.getElementById("root");
            root.style.overflowY = "scroll";
          }}
          to={"/catalogue"}
        >
          CATALOGUE
        </Link>
        <Link
          onClick={() => {
            // @ts-ignore
            const root: HTMLElement = document.getElementById("root");
            root.style.overflowY = "scroll";
          }}
          to={"/collections"}
        >
          COLLECTIONS
        </Link>
        <Link
          onClick={() => {
            // @ts-ignore
            const root: HTMLElement = document.getElementById("root");
            root.style.overflowY = "scroll";
          }}
          to={"/archive"}
        >
          ARCHIVE
        </Link>
      </div>

      <CartSideMenu />
    </>
  );
};

export default Navbar;
