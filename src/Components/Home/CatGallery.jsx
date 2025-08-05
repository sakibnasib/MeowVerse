
import React, { useState } from 'react';
import { FaHeart, FaEye, FaFilter, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { url: "https://i.ibb.co/G4SztCCL/download-14-cat1.jpg", category: "Cute" },
  { url: "https://i.ibb.co/WvgNTwgX/download-14-cat2.jpg", category: "Sleeping" },
  { url: "https://i.ibb.co/wrB4L85W/download-14-cat3.jpg", category: "Angry" },
  { url: "https://i.ibb.co/nsfB66rD/download-14-cat4.jpg", category: "Zoomies" },
  { url: "https://i.ibb.co/vxLYrp20/images-2-cat8.jpg", category: "Cute" },
  { url: "https://i.ibb.co/wNg7xpkY/download-14-cat7.jpg", category: "Sleeping" },
  { url: "https://i.ibb.co/N8f4qvq/download-14-cat6.jpg", category: "Angry" },
  { url: "https://i.ibb.co/kVVLht15/download-14-cat5.jpg", category: "Zoomies" },
];

const categories = ["All", "Cute", "Sleeping", "Angry", "Zoomies"];

const CatGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <section className="min-h-screen rounded-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
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
              📸
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
              Cat Gallery
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover adorable moments captured in our feline photo collection
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-pink-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredImages.map((img, index) => (
              <motion.div
                key={`${img.url}-${selectedCategory}`}
                className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative h-64 sm:h-72">
                  <img
                    src={img.url}
                    alt={img.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {img.category}
                        </span>
                        <div className="flex gap-2">
                          <button className="bg-white/90 backdrop-blur-sm text-pink-500 hover:text-pink-600 p-2 rounded-full transition-colors duration-300">
                            <FaHeart className="w-4 h-4" />
                          </button>
                          <button className="bg-white/90 backdrop-blur-sm text-purple-500 hover:text-purple-600 p-2 rounded-full transition-colors duration-300">
                            <FaEye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🐱</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Images Found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </motion.div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.category}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-colors duration-300"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {selectedImage.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CatGallery;
  