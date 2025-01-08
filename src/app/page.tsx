'use client';
import Image from 'next/image';

// pages/index.tsx
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

export default function Page() {
  const slides = [
    { image: '/1.jpg' },
    { image: '/2.jpg' },
    { image: '/3.jpg' },
    { image: '/4.jpg' },
  ];
  const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }, [current, length]);

    if (!Array.isArray(slides) || slides.length <= 0) {
      return null;
    }

    return (
      <div className="imageSlider">
        <IoIosArrowBack
          className="imageSlider-arrow left"
          size="30"
          onClick={prevSlide}
        />
        <IoIosArrowForward
          className="imageSlider-arrow right"
          size="30"
          onClick={nextSlide}
        />
        {slides.map((slide, index) => (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <Image
                src={slide.image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* 내비게이션 */}
      <Navigation />
      {/* 본문 */}
      <ImageSlider slides={slides} />
      <Footer />
    </div>
  );
}
