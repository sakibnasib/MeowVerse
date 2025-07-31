import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

const catImages = [
  "https://i.ibb.co/v6ZYpVQT/closeup-shot-one-ginger-cat-hugging-licking-other-isolated-white-wall.jpg",
  "https://i.ibb.co/4RMGyTgX/cute-cat-spending-time-indoors.jpg",
  "https://i.ibb.co/cKXTwWJZ/little-cat-sitting-grass.jpg",
];

const HeroSection = () => {
  return (
    <section className="min-h-screen  rounded-3xl bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
                  Welcome to{" "}
                  <span className="text-pink-600">MeowVerse</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 max-w-lg lg:max-w-xl">
                  Discover adorable cats, find the perfect cat food, and create your own feline's profile. 
                  Because every whisker matters. 🐾
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to='/allCats'
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
                  aria-label="Explore available cats for adoption"
                >
                  Explore Cats
                </Link>
                <Link to='/allfoods' 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
                  aria-label="Browse cat food products"
                >
                  Browse Cat Food
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-6">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600">500+</div>
                  <div className="text-xs sm:text-sm text-gray-500">Happy Cats</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">200+</div>
                  <div className="text-xs sm:text-sm text-gray-500">Food Products</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600">50+</div>
                  <div className="text-xs sm:text-sm text-gray-500">Cat Breeds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          <div className="w-full lg:w-1/2 max-w-sm sm:max-w-md lg:max-w-lg">
            <div className="relative">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{ 
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="rounded-2xl shadow-xl overflow-hidden"
                style={{
                  '--swiper-pagination-color': '#db2777',
                  '--swiper-pagination-bullet-inactive-color': '#f3e8ff',
                  '--swiper-pagination-bullet-inactive-opacity': '0.5',
                }}
              >
                {catImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative">
                      <img
                        src={src}
                        alt={`Cute cat ${index + 1}`}
                        className="w-full h-64 sm:h-72 md:h-80 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Live Badge */}
              
            </div>
          </div>
        </div>

        {/* Quick Features */}
       
      </div>
    </section>
  );
};

export default HeroSection;



