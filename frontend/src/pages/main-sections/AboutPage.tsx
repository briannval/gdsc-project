import Carousel from "../../components/Carousel";

import "./AboutPage.css";
import sweet_img from "../../assets/SWEet-11.jpg";
import devfest_img from "../../assets/gdsc-devfest.jpg";

const AboutPage = () => {
  const slides = [
    {
      image: sweet_img,
      caption: "Secure That SWEet Internship Event",
    },
    {
      image: devfest_img,
      caption: "DevFest Event",
    },
  ];

  return (
    <div className="container text-dark">
      <div className="section-heading-centre">
        <h1 className="heading-text">About UBC GDSC</h1>
        <h1 className="subheading-text">We Connect, Learn, & Grow.</h1>
      </div>
      <Carousel slides={slides} />
      <div className="about-description">
        The Google Developer Student Club (GDSC) at UBC is a student-led
        community dedicated to helping students grow their technical and
        professional skills. Supported by Google, we aim to bridge the gap
        between academia and industry by providing resources, mentorship, and
        opportunities to collaborate on real-world projects.
      </div>
      <div className="about-description">
        Our goal is to create an inclusive environment where students from all
        backgrounds can explore technology, develop problem-solving skills, and
        connect with like-minded peers. Whether you're looking to learn
        something new, work on impactful projects, or build a strong network,
        GDSC UBC provides the support to help you succeed.
      </div>
      <div className="about-description">
        Join us to be part of a community that encourages learning, innovation,
        and personal growth.
      </div>
    </div>
  );
};

export default AboutPage;
