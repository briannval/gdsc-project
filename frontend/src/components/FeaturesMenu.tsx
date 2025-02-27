import { useState } from "react";
import "./FeaturesMenu.css";

interface MenuItem {
  id: string;
  title: string;
  subtext: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  {
    id: "deadlines",
    title: "Manage your deadlines",
    subtext: "Keep track of important academic dates and submissions.",
    icon: "📅",
  },
  {
    id: "course-guidance",
    title: "Receive course guidance",
    subtext: "Get personalized advice on course selection and study planning.",
    icon: "📖",
  },
  {
    id: "news",
    title: "Stay in the loop with campus news",
    subtext: "See whats new on campus and don't miss out any events.",
    icon: "📰",
  },
  {
    id: "ai-chat",
    title: "Get instant answers to your questions",
    subtext: "Get instant help and support from an AI assistant.",
    icon: "🤖",
  },
];

export default function FeaturesMenu() {
  const [selectedItem, setSelectedItem] = useState<string>("deadlines");

  return (
    <div className="menu-container">
      <div className="menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${selectedItem === item.id ? "active" : ""}`}
            onClick={() => setSelectedItem(item.id)}
          >
            <div className="menu-item-header">
              <span className="icon">{item.icon}</span>
              <span className="title">{item.title}</span>
            </div>
            <div
              className={`subtext-container ${
                selectedItem === item.id ? "open" : ""
              }`}
            >
              <div className="subtext">{item.subtext}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="preview">
        <div className="preview-card">
          {selectedItem === "deadlines" && (
            <>
              <div className="question">
                When is the last day to add or drop a course this semester?
              </div>
              <div className="question">
                What's the application deadline for science co-op application?
              </div>
              <div className="question">
                What is the due date for tuition payments?
              </div>
              <div className="question">
                How long do I have to withdraw from a course without it affecting my GPA?
              </div>
            </>
          )}
          {selectedItem === "course-guidance" && (
            <>
              <div className="question">
                What are teh second year required courses for Computer Science?
              </div>
              <div className="question">
                What are the prerequisites for CPSC 210?
              </div>
              <div className="question">
                When does course registration open for this year?
              </div>
              <div className="question">
                Show me all required courses for Computer Science major
              </div>
            </>
          )}
          {selectedItem === "news" && (
            <>
              <div className="question">
                Is tomorrow a snow day?
              </div>
              <div className="question">
                What are the upcoming career fairs on campus?
              </div>
              <div className="question">
                What are the recent news on campus?
              </div>
              <div className="question">
                What sport games are happening on campus this weekend?
              </div>
            </>
          )}
          {selectedItem === "ai-chat" && (
            <>
              <div className="question">
                See frequently asked questions by other students to save even more time
              </div>
              <div className="question">
                Where do I declare my major?
              </div>
              <div className="question">
                Where to check my transfer credits?
              </div>
              <div className="question">
                How do I request my official transcript?
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
