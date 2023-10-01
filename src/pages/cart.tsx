import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import BigCart from "../components/bigCart/bigCart";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const CartPage = () => {
  useEffect(() => {
    document.title = "Cart | STRGZE";
  }, []);

  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Navbar />
        <BigCart />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default CartPage;
