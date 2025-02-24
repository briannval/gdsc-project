import type React from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

import "./CustomForm.css";

interface PersonalInfoPageProps {
  formData: {
    name: string;
    email: string;
    gender: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  nextPage: () => void;
}

const PersonalInfoPage: React.FC<PersonalInfoPageProps> = ({
  formData,
  handleChange,
  nextPage,
}) => {
  return (
    <div className="formPage">
      <CustomInput
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        required
      />
      <CustomInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email address"
        required
      />
      <CustomSelect
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={[
          { value: "", label: "Select gender" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
          { value: "prefer-not-to-say", label: "Prefer not to say" },
        ]}
        required
      />
      <div className="buttonGroup">
        <button type="button" onClick={nextPage} className="nextButton">
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
