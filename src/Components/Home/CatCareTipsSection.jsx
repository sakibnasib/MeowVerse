import React from "react";
import { FaHeart, FaUtensils, FaBath, FaSyringe, FaPaw, FaHome } from "react-icons/fa";

const tips = [
 {
    title: "Healthy Diet",
    icon: <FaUtensils className="text-pink-600 text-3xl" />,
    description: "Feed your cat high-protein, low-carb food. Avoid feeding them dog food or human snacks!",
  },
  {
    title: "Regular Grooming",
    icon: <FaBath className="text-pink-600 text-3xl" />,
    description: "Brush your cat weekly (or more for long-haired breeds) to prevent matting and reduce shedding.",
  },
  {
    title: "Vet Visits",
    icon: <FaSyringe className="text-pink-600 text-3xl" />,
    description: "Annual checkups and vaccinations are essential to keep your feline friend healthy.",
  },
  {
    title: "Emotional Care",
    icon: <FaHeart className="text-pink-600 text-3xl" />,
    description: "Play with your cat daily, respect their space, and provide cozy spots for naps and hiding.",
  },
  {
    title: "Litter Training",
    icon: <FaPaw className="text-pink-600 text-3xl" />,
    description: "Keep the litter box clean and in a quiet, consistent spot. Most cats learn this quickly!",
  },
  {
    title: "Safe Environment",
    icon: <FaHome className="text-pink-600 text-3xl" />,
    description: "Keep toxic plants, string, and chemicals out of reach. Cats are curious and love to explore!",
  },
];

const CatCareTipsSection = () => {
  return (
    <section className="mt-10 bg-gradient-to-r from-pink-50 to-rose-100 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
        🐾 Cat Care Tips & Resources
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600 text-sm">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatCareTipsSection;
