import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import TitlePage from "./main-sections/TitlePage";
import FeaturesPage from "./main-sections/FeaturesPage";
import HIWPage from "./main-sections/HIWPage";
import JoinPage from "./main-sections/JoinPage";
import AboutPage from "./main-sections/AboutPage";
import Footer from "../components/Footer";

import "./MainPage.css";

const MainPage = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollTop / docHeight;
      setScrollPercent(scrollRatio);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const color1 = { r: 1, g: 33, b: 69 }; // dark
  const color2 = { r: 1, g: 33, b: 69 }; // dark
  const color3 = { r: 33, g: 82, b: 137 }; // medium
  const color4 = { r: 64, g: 131, b: 204 }; // light
  const color5 = { r: 255, g: 255, b: 255 }; // white
  
  // thresholds at which the color starts changing
  const threshold1 = 0.4;
  const threshold2 = 0.65;
  const threshold3 = 0.83;

  // a bit jank but the first threshold it doesnt transiotion between anything 
  // 0 -> 0.4 its all solid color (cause of image)
  // 0.4 -> 0.65 is dark -> medium
  // 0.65 -> 0.8 is medium -> light
  // 0.8 -> 1 is light -> white

  const getBackgroundColor = () => {
    let r, g, b;

    if (scrollPercent < threshold1) {
      // Transition between color1 and color2
      const ratio = scrollPercent / threshold1;
      r = Math.floor(color1.r + (color2.r - color1.r) * ratio);
      g = Math.floor(color1.g + (color2.g - color1.g) * ratio);
      b = Math.floor(color1.b + (color2.b - color1.b) * ratio);
    } else if (scrollPercent >= threshold1 && scrollPercent < threshold2) {
      // Transition between color2 and color3
      const ratio = (scrollPercent - threshold1) / (threshold2 - threshold1);
      r = Math.floor(color2.r + (color3.r - color2.r) * ratio);
      g = Math.floor(color2.g + (color3.g - color2.g) * ratio);
      b = Math.floor(color2.b + (color3.b - color2.b) * ratio);
    } else if (scrollPercent < threshold3) {
      // Transition between color3 and color4
      const ratio = (scrollPercent - threshold2) / (threshold3 - threshold2);
      r = Math.floor(color3.r + (color4.r - color3.r) * ratio);
      g = Math.floor(color3.g + (color4.g - color3.g) * ratio);
      b = Math.floor(color3.b + (color4.b - color3.b) * ratio);
    } else {
      // Transition between color4 and color5
      const ratio = (scrollPercent - threshold3) / (1 - threshold3);
      r = Math.floor(color4.r + (color5.r - color4.r) * ratio);
      g = Math.floor(color4.g + (color5.g - color4.g) * ratio);
      b = Math.floor(color4.b + (color5.b - color4.b) * ratio);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      style={{
        backgroundColor: getBackgroundColor(),
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <TitlePage />
      <section id="features">
        <FeaturesPage />
      </section>
      <section id="hiw">
        <HIWPage />
      </section>
      <section id="join">
        <JoinPage />
      </section>
      <section id="about">
        <AboutPage />
      </section>
      <Footer />
    </div>
  );
};

export default MainPage;
