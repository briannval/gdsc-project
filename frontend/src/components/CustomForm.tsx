import type React from "react";
import { useState } from "react";
import PersonalInfoPage from "./PersonalInfoPage";
import AcademicInfoPage from "./AcademicInfoPage";
import FeedbackPage from "./FeedbackPage";
import axios from "axios";

import "./CustomForm.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://0.0.0.0";
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || "8000";

const API_ENDPOINT = `${BACKEND_URL}:${BACKEND_PORT}/waitlist/insert`;

const CustomForm: React.FC = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    faculty: "",
    year: 0,
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
      year: 0,
      major: "",
      annoyance: "",
      improvement: "",
      survey: "",
    });
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const response = await axios.post(API_ENDPOINT, formData);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
