import React from "react";

import "./JoinPage.css";
import CustomForm from "../../components/CustomForm";

const JoinPage = () => {
  return (
    <div className="join-container">
      <div className="join-column">
        <div className="gdsc-logo"></div>
      </div>
      <div className="join-column">
        <h1 className="heading-text">Convinced?</h1>
        <h2 className="subheading-text">
          Join our waitlist to get early access!
        </h2>
        <CustomForm />
      </div>
    </div>
  );
};

export default JoinPage;
