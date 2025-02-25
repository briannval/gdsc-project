import "./TitlePage.css";
import CustomButton from "../../components/CustomButton";

const TitlePage = () => {
  return (
    <div className="title-bg">
      <div className="container">
        <div className="landing-content">
          <h1 className="heading-text">UBC Navigator</h1>
          <h2 className="subheading-text">
            Your AI-powered guide to UBC academics, housing, and fees.
          </h2>
          <div className="button-container">
            <CustomButton
              bgColor="var(--google-yellow)"
              textColor="var(--text-color-dark)"
              text="Join the Wailist"
              width="200px"
              redirect="#join"
            />
            <CustomButton
              bgColor="var(--pale-blue)"
              textColor="var(--text-color-dark)"
              text="Learn More"
              width="200px"
              redirect="#features"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
