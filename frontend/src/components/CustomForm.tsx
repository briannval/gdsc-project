import type React from "react";
import { useState } from "react";
import PersonalInfoPage from "./PersonalInfoPage";
import AcademicInfoPage from "./AcademicInfoPage";
import FeedbackPage from "./FeedbackPage";
import axios from "axios";
import { toast } from "react-toastify";

import "./CustomForm.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://0.0.0.0";

const API_ENDPOINT = `${BACKEND_URL}/waitlist/insert`;

// this for indexing (can be sorta ignored)
type FormData = { [key: string]: string | number; };
const requiredFormFields: string[] = ["name", "email", "faculty", "year", "major", "gender", "survey"];

// settings for pop ups
const toastSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

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

  const [_, setIsSubmitted] = useState(false);

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
    console.log("Form data:", formData);

    // have to cast it so i can index it with string arr (some goofy stuff)
    const castedFormData: FormData = (formData as FormData);
    for (const field of requiredFormFields) {
      // check if field is empty
      if (!castedFormData[field]) {
        console.log("Missing ", field, " field");
        toast.warning(`You are missing a required field`, (toastSettings as any));
        return;
      }
    }

    try {
      const response = await axios.post(API_ENDPOINT, formData);
      toast.success('Form submitted successfully!', (toastSettings as any));
      console.log("Success:", response.data);
    } catch (error) {
      toast.error('Looks like something went wrong. Try again!', (toastSettings as any));
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
