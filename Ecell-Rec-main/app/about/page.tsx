"use client";
import React from "react";
import Image from "next/image";

const about = [
  {
    imageSrc: "/raghu-sir-1.jpg",
    name: "Raghu Kalidindi",
    title: "Chairman, Raghu Educational Society",
    description: "Leading the vision and strategic direction of our educational institution with decades of experience in academic excellence.",
    expertise: "Strategic Leadership",
    color: "from-emerald-500 to-teal-600"
  },
  {
    imageSrc: "/RamaDevi-Kalidindi-1.jpg",
    name: "Rama Devi Kalidindi",
    title: "Secretary, Raghu Educational Society",
    description: "Overseeing administrative excellence and ensuring the highest standards of educational quality across all institutions.",
    expertise: "Administrative Excellence",
    color: "from-purple-500 to-pink-600"
  },
  {
    imageSrc: "/Rahul-Kalidindi-1.jpg",
    name: "Rahul Kalidindi",
    title: "Director, Raghu Educational Society",
    description: "Driving innovation and modern educational practices to prepare students for the challenges of tomorrow.",
    expertise: "Innovation & Growth",
    color: "from-blue-500 to-indigo-600"
  },
  {
    imageSrc: "/principal.jpg",
    name: "Dr. Ch. Srinivasu",
    title: "Principal, Raghu Educational Institution",
    description: "Providing academic leadership and fostering an environment of learning, research, and student development.",
    expertise: "Academic Leadership",
    color: "from-orange-500 to-red-600"
  },
  {
    imageSrc: "/kiranspecial.png",
    name: "Dr. G. Kiran Kumar",
    title: "Faculty Coordinator of ECELL REC",
    description: "Mentoring students in entrepreneurship and guiding the E-Cell initiatives towards success and innovation.",
    expertise: "Entrepreneurship",
    color: "from-green-500 to-emerald-600"
  },
  {
    imageSrc: "/ramesh-sir.jpg",
    name: "Dr. Ramesh Babu",
    title: "Coordinator - Entrepreneur Innovation Startup Committee (ESIC)",
    description: "Leading startup initiatives and fostering entrepreneurial spirit among students through innovative programs.",
    expertise: "Startup Ecosystem",
    color: "from-violet-500 to-purple-600"
  },
];

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-block mb-8">
          <h1 className="text-3xl flex md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 justify-center">Advisory Board</h1>
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Meet our distinguished advisory board members who guide and inspire our entrepreneurial journey, 
            bringing decades of experience and expertise to shape the future of E-CELL REC.
          </p>
        </div>
      </div>

      {/* Advisory Board Members Grid */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {about.map((member, index) => (
            <div 
              key={index} 
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Modern Card */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Top Gradient Accent */}
                <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>
                {/* Card Content */}
                <div className="relative p-8">
                  {/* Image Section */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {/* Image Container with Border */}
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group-hover:scale-105 transition-transform duration-500">
                        <Image 
                          src={member.imageSrc} 
                          alt={member.name} 
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {/* Expertise Badge */}
                      <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${member.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500`}>
                        {member.expertise}
                      </div>
                    </div>
                  </div>
                  {/* Text Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <h4 className={`text-lg font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4`}>
                      {member.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {member.description}
                    </p>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                </div>
                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-8 py-4 shadow-lg border border-blue-100">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">
              Guiding Innovation • Fostering Excellence • Building Futures
            </span>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
