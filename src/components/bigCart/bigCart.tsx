import "./bigCart.scss";

import { CartItem, useShoppingCart } from "../../context/shoppingCartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { items } from "../../data/items";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const BigCart = () => {
  const { getEntireCart, getTotal } = useShoppingCart();
  const cartItems = getEntireCart();

  const navigate = useNavigate();

  return (
    <main className="Cart">
      <div className="Cart__Headers">
        <div className="Cart__Headers__Product">
          <h2>Product</h2>
        </div>

        <div className="Cart__Headers__Price">
          <h2>Price</h2>
        </div>

        <div className="Cart__Headers__Quantity">
          <h2>Quantity</h2>
        </div>

        <div className="Cart__Headers__Quantity">
          <h2>Total</h2>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {cartItems.length !== 0 ? (
          <>
            {cartItems.map((item) => (
              <BigCartItem item={item} key={crypto.randomUUID()} />
            ))}

            <div className="Cart__ContinueShopping">
              <button>CONTINUE SHOPPING</button>
            </div>

            <div className="Cart__Subtotal">
              <h2>SUBTOTAL</h2>
              <h2>{formatCurrency(getTotal())}</h2>
            </div>

            <div className="Cart__Checkout">
              <button onClick={() => navigate("/checkout")}>CHECKOUT</button>
            </div>
          </>
        ) : (
          <div className="Cart__Empty">
            <h2>Your cart is empty</h2>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

interface BigCartItemProps {
  item: CartItem;
}

const BigCartItem = ({ item }: BigCartItemProps) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="Cart__Item"
    >
      <div className="Cart__Item__Product">
        <img src={items[item.id.toString() as keyof typeof items].img} alt="" />

        <div className="Cart__Item__Product__Name">
          <h2>{items[item.id.toString() as keyof typeof items].name}</h2>
          <p>{item.size.charAt(0).toUpperCase() + item.size.slice(1)}</p>
        </div>
      </div>

      <div className="Cart__Item__Price">
        <p>
          {formatCurrency(
            items[item.id.toString() as keyof typeof items].price
          )}
        </p>
      </div>

      <div className="Cart__Item__Quantity">
        <div>
          <button onClick={() => decreaseCartQuantity(item.id, item.size)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <p>{item.quantity}</p>
          <button onClick={() => increaseCartQuantity(item.id, item.size)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <button
          onClick={() => {
            removeFromCart(item.id, item.size);
          }}
        >
          Remove
        </button>
      </div>

      <div className="Cart__Item__Total">
        <p>
          {formatCurrency(
            item.quantity *
              items[item.id.toString() as keyof typeof items].price
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default BigCart;
