import "./checkout.scss";

import { useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../checkoutForm/checkoutForm";
import { useShoppingCart } from "../../context/shoppingCartContext";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import ComingSoon from "../comingSoon/comingSoon";

const Checkout = () => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  const { getEntireCart } = useShoppingCart();

  const navigate = useNavigate();

  useEffect(() => {
    if (getEntireCart().length === 0) {
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PAYMENT_API}/config`).then(
      async (response) => {
        const { publishableKey } = await response.json();

        setStripePromise(loadStripe(publishableKey));
      }
    );
  }, []);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(getEntireCart());
    console.log(raw);

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_PAYMENT_API}/create-payment-intent`,
      requestOptions
    ).then(async (response) => {
      const { clientSecret } = await response.json();

      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <main className="Checkout">
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="Checkout__Spinner"
        >
          <HashLoader color="#363030" size={200} />
        </motion.div>
      )}
    </main>
  );
};

export default Checkout;
