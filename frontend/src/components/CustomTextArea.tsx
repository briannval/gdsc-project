import type React from "react";
import type { TextareaHTMLAttributes } from "react";
import "./CustomForm.css";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="textareaContainer">
      <label className="label">{label}</label>
      <textarea className={`textarea ${className}`} {...props} />
    </div>
  );
};

export default CustomTextarea;
