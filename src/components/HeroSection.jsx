/** @format */

// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-8 py-12">
        <div className="text-center py-16 md:py-24">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Take Control of Your
            <span className="text-blue-600 block"> Finances</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Professional finance management tool that replicates your Excel
            workflow. Track income, expenses, team payments, and savings goals
            with ease.
          </p>

          {/* CTA Buttons
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors">
              Get Started Free
            </button>
            <button className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors">
              View Demo
            </button>
          </div> */}
        </div>       
      </div>
    </section>
  );
};

export default HeroSection;
