"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export function BentoGridSecondDemo() {
  return (
    <div className="w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {items.map((item, i) => {
            const CardContent = (
              <div
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  item.className === "md:col-span-2" ? "lg:col-span-2" : ""
                }`}
              >
                {/* Card Background */}
                <div className="relative bg-white rounded-2xl overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      {item.title === "Startup Guides" ? (
                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                          Explore Now
                        </button>
                      ) : (
                        <button className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-75 transition-all duration-300">
                          Coming Soon
                        </button>
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        item.title === "Startup Guides" 
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 group-hover:rotate-12" 
                          : "bg-gradient-to-r from-gray-400 to-gray-500 opacity-75"
                      }`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-2xl transition-all duration-500"></div>
                </div>
              </div>
            );

            return item.title === "Startup Guides" ? (
              <Link key={i} href="/startup-guides" className="block cursor-pointer">
                {CardContent}
              </Link>
            ) : (
              <div key={i} className="cursor-default">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const items = [
  {
    title: "Startup Guides",
    description: "Navigate the journey of launching your business with step-by-step resources and insights.",
    className: "md:col-span-2",
    imageSrc: "/resources/startupGuides.png",
    category: "Guides"
  },
  {
    title: "Entrepreneurship Tools",
    description: "Empower your startup with cutting-edge tools for growth and efficiency.",
    className: "md:col-span-1",
    imageSrc: "/resources/EntrepreneurshipTools.png",
    category: "Tools"
  },
  {
    title: "Templates",
    description: "Access ready-to-use templates for business plans, pitches, and more.",
    className: "md:col-span-1",
    imageSrc: "/resources/templates.png",
    category: "Templates"
  },
  {
    title: "Networking Resources",
    description: "Build meaningful connections to fuel your entrepreneurial success.",
    className: "md:col-span-2",
    imageSrc: "/resources/networkingResources.jpg",
    category: "Networking"
  },
];

export default BentoGridSecondDemo;
