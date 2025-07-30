import React from "react";
import { FaHeart, FaUtensils, FaBath, FaSyringe, FaPaw, FaHome, FaAppleAlt, FaFish, FaWater, FaLeaf, FaClock, FaShieldAlt } from "react-icons/fa";

const tips = [
  // Care Tips
  {
    title: "Healthy Diet",
    icon: <FaUtensils className="text-pink-600 text-2xl" />,
    description: "Feed your cat high-protein, low-carb food. Avoid feeding them dog food or human snacks!",
    category: "care"
  },
  {
    title: "Regular Grooming",
    icon: <FaBath className="text-purple-600 text-2xl" />,
    description: "Brush your cat weekly (or more for long-haired breeds) to prevent matting and reduce shedding.",
    category: "care"
  },
  {
    title: "Vet Visits",
    icon: <FaSyringe className="text-blue-600 text-2xl" />,
    description: "Annual checkups and vaccinations are essential to keep your feline friend healthy.",
    category: "care"
  },
  {
    title: "Emotional Care",
    icon: <FaHeart className="text-red-600 text-2xl" />,
    description: "Play with your cat daily, respect their space, and provide cozy spots for naps and hiding.",
    category: "care"
  },
  {
    title: "Litter Training",
    icon: <FaPaw className="text-green-600 text-2xl" />,
    description: "Keep the litter box clean and in a quiet, consistent spot. Most cats learn this quickly!",
    category: "care"
  },
  {
    title: "Safe Environment",
    icon: <FaHome className="text-orange-600 text-2xl" />,
    description: "Keep toxic plants, string, and chemicals out of reach. Cats are curious and love to explore!",
    category: "care"
  },
  
  // Food Tips
  {
    title: "Protein-Rich Diet",
    icon: <FaFish className="text-pink-600 text-2xl" />,
    description: "Cats need 30-40% protein in their diet. Look for meat as the first ingredient in cat food.",
    category: "food"
  },
  {
    title: "Fresh Water Daily",
    icon: <FaWater className="text-blue-600 text-2xl" />,
    description: "Provide fresh, clean water daily. Consider a water fountain to encourage drinking.",
    category: "food"
  },
  {
    title: "Feeding Schedule",
    icon: <FaClock className="text-purple-600 text-2xl" />,
    description: "Feed kittens 3-4 times daily, adults 2 times. Stick to a consistent schedule.",
    category: "food"
  },
  {
    title: "Avoid Human Food",
    icon: <FaShieldAlt className="text-red-600 text-2xl" />,
    description: "Never feed chocolate, onions, garlic, grapes, or alcohol. These are toxic to cats.",
    category: "food"
  },
  {
    title: "Wet vs Dry Food",
    icon: <FaAppleAlt className="text-green-600 text-2xl" />,
    description: "Wet food provides hydration, dry food helps dental health. A mix of both is ideal.",
    category: "food"
  },
  {
    title: "Natural Treats",
    icon: <FaLeaf className="text-orange-600 text-2xl" />,
    description: "Offer small amounts of cooked chicken or fish as treats. Avoid raw meat.",
    category: "food"
  }
];

const CatCareTipsSection = () => {
  return (
    <section className="mt-10 rounded-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            🐾 Cat Care Tips
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Essential tips for keeping your feline friend healthy and happy
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {tip.category === 'care' ? 'Care' : 'Food'}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need more help with your cat's care?
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300">
            Contact Expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default CatCareTipsSection;
