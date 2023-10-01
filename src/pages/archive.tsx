import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import ComingSoon from "../components/comingSoon/comingSoon";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const ArchivePage = () => {
  useEffect(() => {
    document.title = "Archive | STRGZE";
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

export default ArchivePage;
