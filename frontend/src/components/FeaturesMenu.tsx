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
    id: "financial",
    title: "Navigate financial details",
    subtext: "Understand tuition, fees, and financial aid options.",
    icon: "💰",
  },
  {
    id: "ai-chat",
    title: "Chat with personalized AI",
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
            <div className="placeholder-content">
              Set your weekly hours and timezone preferences here
            </div>
          )}
          {selectedItem === "course-guidance" && (
            <div className="placeholder-content">
              Set your weekly hours and timezone preferences here
            </div>
          )}
          {selectedItem === "financial" && (
            <div className="placeholder-content">
              Connect your video conferencing tools like Zoom, Teams, or Google
              Meet
            </div>
          )}
          {selectedItem === "ai-chat" && (
            <div className="placeholder-content">
              Create and customize different types of events
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
