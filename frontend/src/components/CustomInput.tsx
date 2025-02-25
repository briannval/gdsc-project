import type React from "react";
import type { InputHTMLAttributes } from "react";
import "./CustomForm.css";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  className = "",
  placeholder = "",
  ...props
}) => {
  return (
    <div className="inputContainer">
      <div className="labelContainer">
        <label className="label">{label}</label>
        <label className="required">{props.required ? "*" : ""}</label>
      </div>
      <input
        className={`input ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
