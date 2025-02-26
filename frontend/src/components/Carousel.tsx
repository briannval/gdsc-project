"use client";

import { useState, useEffect } from "react";
import "./Carousel.css";

interface CarouselProps {
  slides: {
    image: string;
    caption: string;
  }[];
  interval?: number;
}

export default function Carousel({ slides, interval = 4000 }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(goToNext, interval);
    return () => clearInterval(slideInterval);
  }, [currentSlide, interval]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.caption}
              className="carousel-image"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
      <div className="carousel-caption">{slides[currentSlide].caption}</div>
    </div>
  );
}
