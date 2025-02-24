"use client";

import { useState } from "react";
import "./carousel.css";

interface CarouselProps {
  slides: {
    image: string;
    caption: string;
  }[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <button
        className="carousel-button prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="carousel-icon"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="carousel-content">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
            aria-hidden={index !== currentSlide}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.caption}
              className="carousel-image"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-button next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="carousel-icon"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="carousel-caption">{slides[currentSlide].caption}</div>
    </div>
  );
}
