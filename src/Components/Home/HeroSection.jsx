import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const catImages = [
  "https://i.ibb.co/v6ZYpVQT/closeup-shot-one-ginger-cat-hugging-licking-other-isolated-white-wall.jpg",
  "https://i.ibb.co/4RMGyTgX/cute-cat-spending-time-indoors.jpg",
  "https://i.ibb.co/cKXTwWJZ/little-cat-sitting-grass.jpg",
];

const HeroSection = () => {
  return (
    <section className="h-[90vh] py-16 bg-pink-50 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
      
      {/* Text Section */}
      <div className="md:w-2/4 text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          Welcome to <span className="text-pink-600">MeowVerse</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-md">
          Discover adorable cats, share stories, and create your own feline's profile. Because every whisker matters. 🐾
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-full shadow hover:bg-pink-700 transition">
            Explore Cats
          </button>
        </div>
      </div>

      {/* Slider Section */}
      <div className="md:w-2/4 w-full  max-w-md">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className=""
        >
          {catImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Cute cat ${index + 1}`}
                className="w-full  object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
