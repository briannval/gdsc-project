import React from "react";
import { useNavigate } from "react-router-dom";

interface CustomButtonProps {
  bgColor: string;
  textColor: string;
  text: string;
  width: string;
  redirect: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  bgColor,
  textColor,
  text,
  width,
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
        width: width,
        padding: "12px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
