
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { useApp } from '../App';

const Home: React.FC = () => {
  const { user, login } = useApp();
  const navigate = useNavigate();

  const handleAuthAction = (route: string) => {
    if (user) {
      navigate(route);
    } else {
      login();
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-black overflow-hidden">
        {/* Background Animation/Image */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1529139574466-a30222ade8ce?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-4 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">
              NEW: AI Generated Fashion
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8">
              WEAR YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">IMAGINATION</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
              Jasons Wear powered by AI. Serving world wide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleAuthAction(AppRoute.CREATE)}
                className="bg-white text-black px-10 py-5 rounded-full text-lg font-black tracking-tight hover:bg-blue-600 hover:text-white transition-all text-center shadow-2xl hover:scale-105"
              >
                START CREATING
              </button>
              <button
                onClick={() => handleAuthAction(AppRoute.GALLERY)}
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full text-lg font-black tracking-tight hover:bg-white/10 transition-all text-center"
              >
                BROWSE GALLERY
              </button>
            </div>
          </div>
        </div>

        {/* Floating T-Shirt Mockup */}
        <div className="hidden lg:block absolute right-[-10%] top-1/2 -translate-y-1/2 w-[50%] animate-pulse-slow">
           <img 
             src="https://www.freeiconspng.com/uploads/t-shirt-png-t-shirt-png-image-32.png" 
             alt="Floating Shirt" 
             className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform rotate-12"
             style={{ filter: 'brightness(0.9) contrast(1.1)' }}
           />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">AI Generation</h3>
              <p className="text-gray-500 leading-relaxed">Simply describe your idea and our Gemini-powered AI will create a one-of-a-kind design in seconds.</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <i className="fa-solid fa-shirt text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Premium Quality</h3>
              <p className="text-gray-500 leading-relaxed">We use the finest 100% ring-spun cotton and state-of-the-art DTG printing for vibrant, lasting results.</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
                <i className="fa-solid fa-bolt text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Fast Turnaround</h3>
              <p className="text-gray-500 leading-relaxed">Orders are printed and shipped within 2-3 business days. Worldwide tracking included on every order.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">Ready to wear your imagination?</h2>
            <button 
              onClick={() => handleAuthAction(AppRoute.CREATE)}
              className="inline-block bg-black text-white px-12 py-6 rounded-full font-black text-xl hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1"
            >
              CREATE NOW
            </button>
         </div>
      </section>
    </div>
  );
};

export default Home;
