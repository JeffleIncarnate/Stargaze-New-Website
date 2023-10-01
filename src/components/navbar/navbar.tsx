import "./navbar.scss";

import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import CartSideMenu from "../cartSideMenu/cartSideMenu";
import { useShoppingCart } from "../../context/shoppingCartContext";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("This feature is still in development");

const Navbar = () => {
  const navigate = useNavigate();

  const { getEntireCart } = useShoppingCart();
  const { width } = useWindowDimensions();

  return (
    <>
      <Toaster />
      <nav className="Navbar">
        <div className="Navbar__Image">
          <img
            src="/icons/black.svg"
            alt="Stargaze Logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="Navbar__Links">
          <Link to={"/catalogue"}>CATALOGUE</Link>
          <Link to={"/collections"}>COLLECTIONS</Link>
          <Link to={"/archive"}>ARCHIVE</Link>
        </div>
        <div className="Navbar__Icons">
          <FontAwesomeIcon onClick={() => notify()} icon={faSearch} />
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
        </div>
      </nav>

      <CartSideMenu />
    </>
  );
};

export default Navbar;
