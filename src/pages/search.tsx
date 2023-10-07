import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import Search from "../components/search/search";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const SearchPage = () => {
  useEffect(() => {
    document.title = "Search | STRGZE";
  }, []);

  return (
    <>
      <AnimatedPage>
        <Marquee />
        <Navbar />
        <Search />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default SearchPage;
