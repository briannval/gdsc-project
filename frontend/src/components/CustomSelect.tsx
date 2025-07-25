import type React from "react";
import type { SelectHTMLAttributes } from "react";

import "./CustomForm.css";

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  className = "",
  ...props
}) => {
  return (
    <div className="inputContainer">
      <div className="labelContainer">
        <label className="label">{label}</label>
        <label className="required">{props.required ? "*" : ""}</label>
      </div>
      <select className={`input select ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
