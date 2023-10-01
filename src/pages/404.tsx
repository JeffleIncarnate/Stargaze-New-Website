import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import NotFound from "../components/404/404";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "404 | STRGZE";
  }, []);

  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Navbar />
        <NotFound />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default PageNotFound;
