import "./checkoutForm.scss";

import { useState } from "react";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { CartItem, useShoppingCart } from "../../context/shoppingCartContext";
import { items } from "../../data/items";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import { motion } from "framer-motion";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getEntireCart, getTotal } = useShoppingCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      // @ts-ignore
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  let totalCost = getTotal();
  totalCost += totalCost * 0.15;

  return (
    <main className="Pay">
      <motion.div
        className="Pay__Left"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="Pay__Left__Items">
          {getEntireCart().map((item) => (
            <CheckoutFormItem item={item} />
          ))}
        </div>

        <div className="Pay__Left__Titles">
          <h2>Shipping: FREE</h2>
          <h2>Total Cost Inc GST: ${totalCost}</h2>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="Pay__Right"
        onSubmit={handleSubmit}
      >
        <LinkAuthenticationElement className="Pay__Right__Email" />
        <PaymentElement className="Pay__Right__Card" />
        <AddressElement
          className="Pay__Right__Shipping"
          options={{ mode: "shipping", fields: { phone: "always" } }}
        />
        <button disabled={isLoading} className="Pay__Right__PayButton">
          <span id="button-text">
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faCircleNotch} spin /> Loading...
              </>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div className="Pay__Right__Message">{message}</div>}
      </motion.form>
    </main>
  );
};

interface ICheckoutFormItem {
  item: CartItem;
}

const CheckoutFormItem = ({ item }: ICheckoutFormItem) => {
  return (
    <div className="Pay__Left__Item">
      <div className="Pay__Left__Item__Image">
        <img src={items[item.id.toString() as keyof typeof items].img} alt="" />
        <div>
          <p>{item.quantity}</p>
        </div>
      </div>

      <div>
        <h2>{items[item.id.toString() as keyof typeof items].name}</h2>
        <p>{item.size.charAt(0).toUpperCase() + item.size.slice(1)}</p>
      </div>
    </div>
  );
};

export default CheckoutForm;
