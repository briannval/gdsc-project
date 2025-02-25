import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import TitlePage from "./main-sections/TitlePage";
import FeaturesPage from "./main-sections/FeaturesPage";
import HIWPage from "./main-sections/HIWPage";
import JoinPage from "./main-sections/JoinPage";
import AboutPage from "./main-sections/AboutPage";
import Footer from "../components/Footer";

import "./MainPage.css";

const MainPage = () => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rootStyles = getComputedStyle(document.documentElement);
          const sections = [
            {
              id: "features",
              color: rootStyles.getPropertyValue("--background-dark"),
            },
            {
              id: "hiw",
              color: rootStyles.getPropertyValue("--background-medium"),
            },
            {
              id: "join",
              color: rootStyles.getPropertyValue("--background-light"),
            },
            {
              id: "about",
              color: rootStyles.getPropertyValue("--background-white"),
            },
          ];

          let newColor = document.body.style.backgroundColor;

          for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) {
              const top = el.getBoundingClientRect().top;
              if (top <= window.innerHeight * 0.8) {
                newColor = section.color;
              }
            }
          }

          if (document.body.style.backgroundColor !== newColor) {
            document.body.style.backgroundColor = newColor;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
    </>
  );
};

export default MainPage;
