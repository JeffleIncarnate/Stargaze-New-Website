import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import Catalogue from "../components/catalogue/catalogue";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const CataloguePage = () => {
  useEffect(() => {
    document.title = "Catalogue | STRGZE";
  }, []);

  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Navbar />
        <Catalogue />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default CataloguePage;
