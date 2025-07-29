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
    <div className="w-full mx-auto px-4 py-10 ">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">🐾 Cat Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog._id}
            className="bgrose-100 rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-pink-500 mb-2">{blog.title}</h2>
              <h3 className="text-xl font-semibold text-pink-500 mb-2">{blog.slug}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.excerpt}</p>
              <hr/>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.content}</p>
              <p className="text-xs text-gray-400">{new Date(blog.date).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
