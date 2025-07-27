import React from "react";
import { FaPaw } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Keep Your Cat Happy Indoors",
    image: "https://placekitten.com/400/250",
    date: "July 25, 2025",
    description: "Enrichment tips, play ideas, and cozy setups to keep your kitty purring all day long.",
  },
  {
    id: 2,
    title: "Why Do Cats Knock Things Over?",
    image: "https://placekitten.com/401/250",
    date: "July 22, 2025",
    description: "Science meets sass: a funny (and real) look at feline behavior.",
  },
  {
    id: 3,
    title: "Understanding Cat Body Language",
    image: "https://placekitten.com/402/250",
    date: "July 20, 2025",
    description: "From tail flicks to ear twitches — decode your cat's mysterious moves.",
  },
];

const meowFact = "😺 Did you know? Cats can make over 100 different vocal sounds!";

const DailyMeowSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20 mt-10">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-6">
        📰 Daily Meow
      </h2>

      {/* Meow of the Day */}
      <div className="bg-pink-100 border-l-8 border-pink-500 p-6 rounded-xl shadow mb-12 flex items-center gap-4 animate-fade-in">
        <FaPaw className="text-pink-600 text-3xl animate-bounce-slow" />
        <p className="text-lg text-gray-700 font-medium">{meowFact}</p>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-10 md:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-pink-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{post.description}</p>
              <button className="text-pink-600 font-semibold hover:underline">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyMeowSection;
