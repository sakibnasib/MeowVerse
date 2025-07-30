// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import Loaer from '../../Components/Loaer/Loaer';


// const BlogPage = () => {
//   const { data: blogs = [], isLoading, isError } = useQuery({
//     queryKey: ['blogs'],
//     queryFn: async () => {
//       const res = await axios.get('http://localhost:3000/blog');
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loaer/>;
//   if (isError) return <div className="text-center text-red-500 py-10">Failed to load blogs.</div>;

//   return (
//     <div className="w-11/12 mx-auto  px-4 py-10 ">
//       <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">🐾 Cat Blog</h1>

//       <div className=" grid grid-cols-1  gap-6">
//         {blogs.map((blog, i) => (
//           <motion.div
//             key={blog._id}
//             className="bgrose-100 rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//           >
//             <div className="p-5">
//               <h2 className="text-2xl font-semibold text-pink-500 mb-2">{blog.title}</h2>
//               <h3 className="text-xl font-semibold text-pink-500 mb-2">{blog.slug}</h3>
//               <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.excerpt}</p>
//               <hr/>
//               <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.content}</p>
//               <p className="text-xs text-gray-400">{new Date(blog.date).toLocaleDateString()}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogPage;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loaer from '../../Components/Loaer/Loaer';

const BlogPage = () => {
  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/blog');
      return res.data;
    },
  });

  if (isLoading) return <Loaer/>;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load blogs.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🐾 Cat Blog
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-pink-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover amazing stories, tips, and adventures from the feline world
          </motion.p>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Blog Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-pink-600">🐱 Cat Story</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                    {new Date(blog.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h2>
                  <h3 className="text-sm font-medium text-pink-500 mb-3 bg-pink-50 px-3 py-1 rounded-full inline-block">
                    {blog.slug}
                  </h3>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {blog.content}
                    </p>
                  </div>
                </div>

                {/* Read More Button */}
                {/* <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="group/btn bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    Read More
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🐱</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-500">Check back soon for amazing cat stories!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
