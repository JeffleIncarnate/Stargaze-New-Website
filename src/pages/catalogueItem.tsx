import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import CatalogueItem from "../components/catalogueItem/catalogueItem";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const CatalogueItemPage = () => {
  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Navbar />
        <CatalogueItem />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default CatalogueItemPage;
