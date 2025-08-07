import React from "react";
import { FaPaw, FaHeart, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Keep Your Cat Happy Indoors",
    image: "https://i.ibb.co/G3kmngqT/download-14-yugeyiuw.jpg",
    date: "July 25, 2025",
    description: "Enrichment tips, play ideas, and cozy setups to keep your kitty purring all day long.",
    category: "Cat Care",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Why Do Cats Knock Things Over?",
    image: "https://i.ibb.co/C3nbz5qL/download-14-67.jpg",
    date: "July 22, 2025",
    description: "Science meets sass: a funny (and real) look at feline behavior.",
    category: "Behavior",
    readTime: "3 min read"
  },
  {
    id: 3,
    title: "Understanding Cat Body Language",
    image: "https://i.ibb.co/N6ztL1fH/images-2-345678.jpg",
    date: "July 20, 2025",
    description: "From tail flicks to ear twitches — decode your cat's mysterious moves.",
    category: "Behavior",
    readTime: "7 min read"
  },
];

const meowFact = "😺 Did you know? Cats can make over 100 different vocal sounds!";

const DailyMeowSection = () => {
  return (
    <section className="mt-10 rounded-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl mr-4">
              📰
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
              Daily Meow
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Your daily dose of feline wisdom, care tips, and adorable stories
          </p>
        </motion.div>

        {/* Meow of the Day */}
        <motion.div 
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl animate-bounce">
                <FaPaw className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Meow of the Day</h3>
              <p className="text-lg lg:text-xl text-pink-100 leading-relaxed">
                {meowFact}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                
                {/* Read Time Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    {post.date}
                  </span>
                  <button className="text-pink-500 hover:text-pink-600 transition-colors">
                    <FaHeart className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                {/* Read More Button */}
                {/* <button className="group/btn bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Read More
                  <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 lg:p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Get Daily Meows in Your Inbox!</h3>
            <p className="text-purple-100 text-lg mb-6">
              Never miss a purr-fect story or cat care tip. Subscribe to our daily newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-full ring-white/50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyMeowSection;
