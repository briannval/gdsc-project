import React from "react";
import { useNavigate } from "react-router-dom";

import "./CustomButton.css";

interface CustomButtonProps {
  bgColor: string;
  textColor: string;
  text: string;
  redirect: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  bgColor,
  textColor,
  text,
  redirect,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirect.startsWith("#")) {
      const section = document.querySelector(redirect);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else if (redirect) {
      navigate(redirect);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      className="custom-button"
    >
      {text}
    </button>
  );
};

export default CustomButton;
