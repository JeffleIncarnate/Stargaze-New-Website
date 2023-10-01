import { useEffect } from "react";

import Marquee from "../components/marquee/marquee";
import Navbar from "../components/navbar/navbar";
import Completion from "../components/completion/completion";
import Footer from "../components/footer/footer";

import AnimatedPage from "../components/animatedPage/animatedPage";

const CompletionPage = () => {
  useEffect(() => {
    document.title;
  }, []);

  return (
    <AnimatedPage>
      <Marquee />
      <Navbar />
      <Completion />
      <Footer />
    </AnimatedPage>
  );
};

export default CompletionPage;
