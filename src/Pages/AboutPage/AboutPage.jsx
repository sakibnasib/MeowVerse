// import React from "react";

// const AboutPage = () => {
//   return (
//     <section className="bg-rose-50 text-gray-800 py-20 px-6 md:px-24 w-11/12 mx-auto">
//       <div className="max-w-5xl mx-auto text-center">
//         <h1 className="text-5xl font-bold text-pink-600 mb-6">🐾 About MeowVerse</h1>
//         <p className="text-lg text-gray-600 mb-10">
//           At <strong>MeowVerse</strong>, we believe every cat deserves a home full of love,
//           care, and a touch of internet fame. Whether you’re a first-time cat parent
//           or a lifelong feline fan, we’re here to make your journey purr-fect.
//         </p>

//         <div className="grid md:grid-cols-2 gap-12 text-left">
//           <div>
//             <h2 className="text-2xl font-semibold text-pink-500 mb-4">😻 Our Mission</h2>
//             <p>
//               We aim to create a joyful, informative, and fun space for cat lovers.
//               From daily meows and blogs to care tips and adorable photo galleries,
//               our platform connects you to your inner cat-whisperer.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold text-pink-500 mb-4">🌍 Who We Serve</h2>
//             <p>
//               Our community includes new pet parents, seasoned cat whisperers,
//               shelters, and cat rescue volunteers from around the world. Everyone’s welcome here!
//             </p>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold text-pink-500 mb-4">📚 What You'll Find</h2>
//             <ul className="list-disc list-inside space-y-1 text-gray-700">
//               <li>Helpful Cat Care Tips</li>
//               <li>Adorable Cat Galleries</li>
//               <li>Daily Meow Facts</li>
//               <li>Cat Blogs, Memes & More</li>
//               <li>Parent Reviews & Stories</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold text-pink-500 mb-4">💌 Join Us!</h2>
//             <p>
//               Be part of the WhiskerWorld family — share your cat’s story,
//               learn something new, and connect with cat lovers just like you.
//               Because in our world, cats rule... and drool.
//             </p>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default AboutPage;


import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              🐾 About MeowVerse
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At <strong className="text-white">MeowVerse</strong>, we believe every cat deserves a home full of love,
              care, proper nutrition, and a touch of internet fame. Whether you're a first-time cat parent
              or a lifelong feline fan, we're here to make your journey purr-fect.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Mission Card */}
            <motion.div 
              className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  😻
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                We aim to create a joyful, informative, and fun space for cat lovers.
                From daily meows and blogs to care tips, nutrition guides, and adorable photo galleries,
                our platform connects you to your inner cat-whisperer and helps you provide the best care.
              </p>
            </motion.div>

            {/* Who We Serve Card */}
            <motion.div 
              className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  🌍
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Who We Serve</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our community includes new pet parents, seasoned cat whisperers,
                shelters, cat rescue volunteers, and nutrition-conscious cat owners from around the world. Everyone's welcome here!
              </p>
            </motion.div>

            {/* What You'll Find Card */}
            <motion.div 
              className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  📚
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">What You'll Find</h2>
              </div>
              <ul className="space-y-3 text-gray-600 text-lg">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Helpful Cat Care Tips
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Cat Food & Nutrition Guides
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Adorable Cat Galleries
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Daily Meow Facts
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Cat Blogs, Memes & More
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Parent Reviews & Stories
                </li>
              </ul>
            </motion.div>

            {/* Join Us Card */}
            <motion.div 
              className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-3xl shadow-xl p-8 lg:p-10 transform hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  💌
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Join Us!</h2>
              </div>
              <p className="text-pink-100 text-lg leading-relaxed mb-6">
                Be part of the WhiskerWorld family — share your cat's story,
                learn about proper nutrition, discover new care tips, and connect with cat lovers just like you.
                Because in our world, cats rule... and drool.
              </p>
              <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors duration-300 transform hover:scale-105">
                Get Started Today
              </button>
            </motion.div>
          </div>

          {/* Cat Food & Nutrition Section */}
          <motion.div 
            className="mt-20 bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl mr-4">
                  🍽️
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Cat Food & Nutrition</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                We're passionate about helping you provide the best nutrition for your feline friends. 
                From kitten food to senior cat diets, we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl">
                <div className="text-4xl mb-4">🐱</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Kitten Nutrition</h3>
                <p className="text-gray-600">Essential nutrients for growing kittens and proper development</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
                <div className="text-4xl mb-4">😺</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Adult Cat Food</h3>
                <p className="text-gray-600">Balanced nutrition for healthy adult cats and active lifestyles</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="text-4xl mb-4">🐈</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Senior Cat Care</h3>
                <p className="text-gray-600">Specialized diets for senior cats and health management</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Cats</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Cat Stories</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
              <div className="text-gray-600">Food Reviews</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-pink-600 mb-2">50+</div>
              <div className="text-gray-600">Cat Breeds</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;



