import Carousel from "../../components/Carousel";

import "./AboutPage.css";

const AboutPage = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1740007124901-6644ebaa3c08?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Image Caption 1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1740007124901-6644ebaa3c08?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Image Caption 2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1740007124901-6644ebaa3c08?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Image Caption 3",
    },
  ];

  return (
    <div className="container text-dark">
      <div className="section-heading-centre">
        <h1 className="heading-text">About UBC GDSC</h1>
        <h1 className="subheading-text">We Connect, Learn, & Grow.</h1>
      </div>
      <Carousel slides={slides} />
      <div className="description">
        The Google Developer Student Club (GDSC) at UBC is a student-led
        community dedicated to helping students grow their technical and
        professional skills. Supported by Google, we aim to bridge the gap
        between academia and industry by providing resources, mentorship, and
        opportunities to collaborate on real-world projects.
      </div>
      <div className="description">
        Our goal is to create an inclusive environment where students from all
        backgrounds can explore technology, develop problem-solving skills, and
        connect with like-minded peers. Whether you're looking to learn
        something new, work on impactful projects, or build a strong network,
        GDSC UBC provides the support to help you succeed.
      </div>
      <div className="description">
        Join us to be part of a community that encourages learning, innovation,
        and personal growth.
      </div>
    </div>
  );
};

export default AboutPage;
