import React from "react";

import "./HIWPage.css";
import UserGuide from "../../components/UserGuide";

const HIWPage = () => {
  return (
    <div className="container">
      <div className="section-heading-left">
        <h1 className="heading-text">How It Works</h1>
        <h1 className="subheading-text">
          Easily Navigate UBC's Systems with AI-Powered Insights
        </h1>
      </div>
      <UserGuide />
    </div>
  );
};

export default HIWPage;
