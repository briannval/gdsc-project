import type React from "react";
import CustomInput from "./CustomInput";

import "./CustomForm.css";

interface AcademicInfoPageProps {
  formData: {
    faculty: string;
    year: string;
    major: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const AcademicInfoPage: React.FC<AcademicInfoPageProps> = ({
  formData,
  handleChange,
  nextPage,
  prevPage,
}) => {
  return (
    <div className="formPage">
      <CustomInput
        label="Faculty"
        name="faculty"
        value={formData.faculty}
        onChange={handleChange}
        placeholder="Enter your faculty"
        required
      />
      <CustomInput
        label="Year"
        name="year"
        type="number"
        min="1"
        max="6"
        value={formData.year}
        onChange={handleChange}
        placeholder="Enter your current year"
        required
      />
      <CustomInput
        label="Major"
        name="major"
        value={formData.major}
        onChange={handleChange}
        placeholder="Enter your major"
        required
      />
      <div className="buttonGroup">
        <button type="button" onClick={prevPage} className="prevButton">
          Previous
        </button>
        <button type="button" onClick={nextPage} className="nextButton">
          Next
        </button>
      </div>
    </div>
  );
};

export default AcademicInfoPage;
