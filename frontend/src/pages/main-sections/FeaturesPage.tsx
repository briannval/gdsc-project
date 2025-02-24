import React from "react";

import FeaturesMenu from "../../components/FeaturesMenu";

import "./FeaturesPage.css";

const FeaturesPage = () => {
  return (
    <div className="container">
      <div className="section-heading-centre">
        <h1 className="heading-text">Features</h1>
        <h1 className="subheading-text">
          Everything you need to navigate UBC—fast, accurate, and personalized
          just for you.
        </h1>
      </div>
      <FeaturesMenu />
    </div>
  );
};

export default FeaturesPage;
