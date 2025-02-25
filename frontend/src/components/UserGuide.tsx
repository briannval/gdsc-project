import type React from "react";
import "./UserGuide.css";

interface UserGuide {
  number: string;
  title: string;
  description: string;
  details: string;
  image: string;
}

const features: UserGuide[] = [
  {
    number: "1",
    title: "Ask your question and get instant answers.",
    description:
      "Need to know the last day to drop a course? Wondering about the requirements for a double major? Just type your question, and we’ll do the rest.",
    details:
      "Our AI-powered search engine understands both simple and complex academic queries. Whether you're looking for deadlines, program details, or housing info, you'll get the most accurate and up-to-date answers in seconds.",
    image:
      "https://images.unsplash.com/photo-1740007124901-6644ebaa3c08?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "2",
    title: "Receive AI-powered, structured responses.",
    description:
      "No more digging through long PDFs or outdated pages—get clear, summarized answers instantly.",
    details:
      "Our system uses web scraping and an LLM trained on UBC data to provide precise, well-structured responses. You’ll see key information at a glance, with links to official sources if you want to read further.",
    image:
      "https://images.unsplash.com/photo-1740007124901-6644ebaa3c08?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "3",
    title: "Explore personalized recommendations.",
    description:
      "Thinking about adding a minor? Unsure which program fits your goals? We help you make informed decisions.",
    details:
      "Our platform not only provides raw information but also helps you compare options. Get feasibility insights, workload expectations, and career impact analysis—all tailored to your needs.",
    image:
      "https://images.unsplash.com/photo-1740007124901-6644ebaa3c08?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "4",
    title: "Stay updated with the latest UBC information.",
    description:
      "UBC policies and deadlines change—our platform keeps up so you don’t have to.",
    details:
      "We regularly update our data by scraping official UBC sources, ensuring you always get the most recent and accurate information about academics, housing, and fees.",
    image:
      "https://images.unsplash.com/photo-1740007124901-6644ebaa3c08?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const UserGuide: React.FC = () => {
  return (
    <div className="features-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-item">
          <div className="feature-number">{feature.number}</div>
          <div className="feature-content">
            <div className="feature-text">
              <h2>{feature.title}</h2>
              <p className="description">{feature.description}</p>
              <div className="details">
                {feature.details.split("\n").map((detail, i) => (
                  <p key={i} className="detail-item">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
            <div className="feature-image">
              <img
                src={feature.image || "/placeholder.svg"}
                alt={`Feature ${feature.number}: ${feature.title}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGuide;
