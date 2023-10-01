import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import ComingSoon from "../components/comingSoon/comingSoon";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const CollectionsPage = () => {
  useEffect(() => {
    document.title = "Collections | STRGZE";
  }, []);

  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Navbar />
        <ComingSoon />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default CollectionsPage;
