import "./cartSideMenu.scss";

import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faTrash,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { CartItem, useShoppingCart } from "../../context/shoppingCartContext";
import toast, { Toaster } from "react-hot-toast";

import { items } from "../../data/items";

const notify = () =>
  toast("Removed Item From Cart", {
    duration: 2000,
    position: "top-center",

    icon: "😭",
  });

const CartSideMenu = () => {
  const { getTotal, getEntireCart } = useShoppingCart();
  let cartContents = getEntireCart();

  const navigate = useNavigate();

  return (
    <>
      <Toaster />
      <div className="CartSide">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="CartSide__Close"
          onClick={() => {
            const cart = document.getElementsByClassName("CartSide");

            (cart[0]! as any).style.width = "0vw";
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </motion.div>

        <h2 className="CartSide__Heading">Cart</h2>

        <div className="CartSide__Items">
          <AnimatePresence>
            {cartContents.length !== 0 ? (
              cartContents.map((item) => (
                <CartSideMenuItem item={item} key={crypto.randomUUID()} />
              ))
            ) : (
              <section>Your cart is empty</section>
            )}
          </AnimatePresence>
        </div>

        <div className="CartSide__Totals">
          {cartContents.length !== 0 && (
            <div>
              <h2>SUBTOTAL</h2>
              <p>${getTotal()}.00 NZD</p>
            </div>
          )}

          <button
            onClick={() => navigate("/cart")}
            style={{
              backgroundColor: getTotal() !== 0 ? "black" : "grey",
              cursor: getTotal() !== 0 ? "pointer" : "not-allowed",
            }}
            disabled={getTotal() !== 0 ? false : true}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};

interface CartSideMenuItemProps {
  item: CartItem;
}

const CartSideMenuItem = ({ item }: CartSideMenuItemProps) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="CartSide__Item"
    >
      <div className="CartSide__Item__Image">
        <img src={items[item.id.toString() as keyof typeof items].img} alt="" />
      </div>

      <div className="CartSide__Item__Details">
        <h2>{items[item.id.toString() as keyof typeof items].name}</h2>
        <p>{item.size.charAt(0).toUpperCase() + item.size.slice(1)}</p>
        <p>
          $
          {item.quantity *
            items[item.id.toString() as keyof typeof items].price}
          .00 NZD
        </p>

        <div className="CartSide__Item__Details__Buttons">
          <button
            onClick={() => {
              decreaseCartQuantity(item.id, item.size);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <p>{item.quantity}</p>

          <button
            onClick={() => {
              increaseCartQuantity(item.id, item.size);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className="CartSide__Item__Remove">
        <FontAwesomeIcon
          onClick={() => {
            removeFromCart(item.id, item.size);
            notify();
          }}
          icon={faTrash}
          className="CartSide__Item__Remove__Trash"
        />
      </div>
    </motion.div>
  );
};

export default CartSideMenu;
