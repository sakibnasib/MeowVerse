import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Sarah P.",
    quote: "WhiskerWorld helped me track Mittens' meals and moods! She's happier than ever.",
    catName: "Mittens",
    image: "https://placekitten.com/101/101",
    rating: 5
  },
  {
    name: "Leo G.",
    quote: "Snowball's online profile is adorable. All my friends follow her now!",
    catName: "Snowball",
    image: "https://placekitten.com/102/102",
    rating: 5
  },
  {
    name: "Anika R.",
    quote: "This site taught me how to properly groom and feed Whiskers. Life saver!",
    catName: "Whiskers",
    image: "https://placekitten.com/103/103",
    rating: 5
  },
  {
    name: "Jamal K.",
    quote: "Before this site, I didn't even know my cat needed vet visits. Thanks!",
    catName: "Tiger",
    image: "https://placekitten.com/104/104",
    rating: 4
  },
  {
    name: "Emily C.",
    quote: "I love the cat tips section — so many fun facts and hacks!",
    catName: "Luna",
    image: "https://placekitten.com/105/105",
    rating: 5
  },
  {
    name: "Daniel W.",
    quote: "Felix gets more attention now than I do. Great platform!",
    catName: "Felix",
    image: "https://placekitten.com/106/106",
    rating: 5
  },
  {
    name: "Mina T.",
    quote: "I used the blog to litter-train my rescue. So helpful!",
    catName: "Chai",
    image: "https://placekitten.com/107/107",
    rating: 5
  },
  {
    name: "Kevin B.",
    quote: "This site is basically a social network for cats, and I love it.",
    catName: "Boots",
    image: "https://placekitten.com/108/108",
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            🐾 What Cat Parents Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from happy cat parents who found their perfect companions and care tips
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="testimonials-swiper"
            style={{
              '--swiper-pagination-color': '#db2777',
              '--swiper-pagination-bullet-inactive-color': '#f3e8ff',
              '--swiper-pagination-bullet-inactive-opacity': '0.5',
              '--swiper-navigation-color': '#db2777',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 mb-4 italic text-sm sm:text-base">
                    "{testimonial.quote}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                      onError={(e) => {
                        e.target.src = "https://placekitten.com/100/100";
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">Cat parent of {testimonial.catName}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev !text-pink-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-pink-50 transition-colors duration-300"></div>
          <div className="swiper-button-next !text-pink-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-pink-50 transition-colors duration-300"></div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Join thousands of happy cat parents
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg">
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;