import React from "react";

import TitlePage from "./main-sections/TitlePage";
import FeaturesPage from "./main-sections/FeaturesPage";
import HIWPage from "./main-sections/HIWPage";
import JoinPage from "./main-sections/JoinPage";
import AboutPage from "./main-sections/AboutPage";

const MainPage = () => {
  return (
    <>
      <TitlePage />
      <FeaturesPage />
      <HIWPage />
      <JoinPage />
      <AboutPage />
    </>
  );
};

export default MainPage;
