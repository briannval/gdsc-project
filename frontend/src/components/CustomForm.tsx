import type React from "react";
import { useState } from "react";
import PersonalInfoPage from "./PersonalInfoPage";
import AcademicInfoPage from "./AcademicInfoPage";
import FeedbackPage from "./FeedbackPage";

import "./CustomForm.css";

const CustomForm: React.FC = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    faculty: "",
    year: "",
    major: "",
    annoyance: "",
    improvement: "",
    survey: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextPage = () => setPage((prev) => Math.min(prev + 1, 3));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setPage(1);
    setFormData({
      name: "",
      email: "",
      gender: "",
      faculty: "",
      year: "",
      major: "",
      annoyance: "",
      improvement: "",
      survey: "",
    });
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
    setIsSubmitted(true);
    setTimeout(() => {
      resetForm();
    }, 1000);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {page === 1 && (
        <PersonalInfoPage
          formData={formData}
          handleChange={handleChange}
          nextPage={nextPage}
        />
      )}
      {page === 2 && (
        <AcademicInfoPage
          formData={formData}
          handleChange={handleChange}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      {page === 3 && (
        <FeedbackPage
          formData={formData}
          handleChange={handleChange}
          prevPage={prevPage}
          handleSubmit={handleSubmit}
        />
      )}
    </form>
  );
};

export default CustomForm;
