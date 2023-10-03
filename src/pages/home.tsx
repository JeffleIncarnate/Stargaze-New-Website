import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Splash from "../components/splash/splash";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home | STRGZE";
  }, []);

  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Splash />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default HomePage;
