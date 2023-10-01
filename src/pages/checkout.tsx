import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import Checkout from "../components/checkout/checkout";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const CheckoutPage = () => {
  useEffect(() => {
    document.title = "Pay | STRGZE";
  }, []);

  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Navbar />
        <Checkout />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default CheckoutPage;
