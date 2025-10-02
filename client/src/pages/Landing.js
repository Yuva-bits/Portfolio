import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  console.log('Landing component is rendering - SIMPLE VERSION');
  
  // Simple fallback content first
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Hi, I'm Yuvashree Senthilmurugan</h1>
        <p className="text-2xl text-gray-300 mb-8">Full-Stack Software Developer | AI/ML Engineer</p>
        <p className="text-lg text-gray-400 mb-8">Landing page is working - complex content loading...</p>
        <div className="bg-red-500 text-white p-4 rounded">
          Landing Component Successfully Loaded!
        </div>
        <div className="mt-8">
          <Link 
            to="/projects"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View My Work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;