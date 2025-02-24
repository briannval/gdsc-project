import type React from "react";
import CustomInput from "./CustomInput";
import "./CustomForm.css";

interface FeedbackPageProps {
  formData: {
    annoyance: string;
    improvement: string;
    survey: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevPage: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({
  formData,
  handleChange,
  prevPage,
  handleSubmit,
}) => {
  return (
    <div className="formPage">
      <CustomInput
        label="What annoys you about current advising the most?"
        name="annoyance"
        value={formData.annoyance}
        onChange={handleChange}
        placeholder="Type here"
        type="text"
      />
      <CustomInput
        label="If you could add one fix to advising, what would it be?"
        name="improvement"
        value={formData.improvement}
        onChange={handleChange}
        placeholder="Type here"
        type="text"
      />
      <CustomInput
        label="How did you hear about this?"
        name="survey"
        value={formData.survey}
        onChange={handleChange}
        placeholder="Type here"
        required
      />
      <div className="buttonGroup">
        <button type="button" onClick={prevPage} className="prevButton">
          Previous
        </button>
        <button type="submit" onClick={handleSubmit} className="submitButton">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
