"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import EcellNew from "./images/ecellverynew.png";
import IICLogo from "./images/iic.png";
import RaghuLogo from "./images/raghu.png";
import Mydoc from "./Mydoc";
import { Vision } from "@/app/pages/Vision";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BentoGridSecondDemo } from "./pages/BentoGridSecondDemo";
import { Testimonials } from "./pages/testimonials";
import EventsVideo from './pages/EventsVideo';
import Team from "./team-cmp/Team";
import Footer from "./pages/Footer";
import TeamCard from "./team-cmp/TeamCard";
import About from "./about/page";
import BlurFade from "./BlurFadeCollage";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showDock, setShowDock] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position to show/hide dock
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current || !testimonialsRef.current) return;

      const scrollY = window.scrollY;
      const aboutTop = aboutRef.current.offsetTop;
      const testimonialsBottom = testimonialsRef.current.offsetTop + testimonialsRef.current.offsetHeight;

      // Show dock when scroll position is between about section and testimonials section
      const shouldShow = scrollY >= aboutTop - 100 && scrollY <= testimonialsBottom + 100;
      setShowDock(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Image src="/loadingpage.gif" alt="Loading..." width={192} height={192} className="w-48 h-48" />
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION - Redesigned */}
      <section className="relative min-h-screen flex flex-col items-center justify-center w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-[url('/background-image.jpg')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-white bg-opacity-60" />
        </div>
        {/* Animated Blurred Circles in Background */}
        <div className="pointer-events-none select-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-2xl animate-pulse-slow delay-500" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-2xl animate-pulse-slow delay-1000 -translate-x-1/2" />
        </div>
        {/* LOGOS ROW: left, center, right with animation */}
        <div className="absolute top-0 left-0 z-20 w-full flex flex-row justify-between items-start px-4 gap-2">
          {/* Left logo */}
          <div className="w-24 sm:w-40 md:w-56 h-auto flex items-center justify-start mt-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Image src={EcellNew} alt="Ecell Logo" className="object-contain" priority />
          </div>
          {/* Center logo */}
          <div className="w-24 sm:w-40 md:w-56 h-auto flex items-center justify-center mt-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Image src={RaghuLogo} alt="Raghu Logo" className="object-contain" priority />
          </div>
          {/* Right logo */}
          <div className="w-24 sm:w-40 md:w-56 h-auto flex items-center justify-end mt-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Image src={IICLogo} alt="IIC Logo" className="object-contain" priority />
          </div>
        </div>
        {/* Content with animation */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-4 sm:px-6 py-10 sm:py-16 gap-6 sm:gap-8 mt-20 sm:mt-32">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-2 sm:mb-4 text-center animate-fade-in-up" style={{
            letterSpacing: '6px',
            animationDelay: '0.8s',
            background: 'linear-gradient(135deg, #1a232e 0%, #2d3748 25%, #4a5568 50%, #2d3748 75%, #1a232e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 8px 16px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)',
            fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '900',
            lineHeight: '1.1'
          }}>
            E-CELL REC
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#2d3748] mb-4 sm:mb-6 leading-tight text-center animate-fade-in-up" style={{
            animationDelay: '1s',
            fontFamily: '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '400',
            lineHeight: '1.5',
            letterSpacing: '0.2px',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Since its inception, E-Cell REC has served as a <span className="font-semibold text-[#1a232e]">launchpad for entrepreneurial minds</span>, nurturing <span className="font-semibold text-[#1a232e]">creativity, leadership, and innovation</span>. With a mission to guide, inspire, and transform students into <span className="font-semibold text-[#1a232e]">impactful entrepreneurs</span>, E-Cell REC continues to build a thriving startup culture on campus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <Link href="/News">
              <button className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#1a232e] hover:bg-[#2d3748] text-base sm:text-lg font-bold text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a232e] transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                News
              </button>
            </Link>
            <Link href="/registration">
              <button className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#1a232e] hover:bg-[#2d3748] text-base sm:text-lg font-bold text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a232e] transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                Register
              </button>
            </Link>
          </div>

        </div>
        {/* Down Arrow with bounce animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
          <span className="text-3xl sm:text-4xl text-[#1a232e]">↓</span>
        </div>
        {/* Custom Animations */}
        <style jsx global>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          @keyframes pulseSlow {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .animate-pulse-slow {
            animation: pulseSlow 4s ease-in-out infinite;
          }
          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(16px); }
          }
          .animate-bounce-slow {
            animation: bounceSlow 2s infinite;
          }
        `}</style>
      </section>

      {/* Dock Navigation - Only visible from About to Testimonials */}
      {showDock && (
        <div className="fixed bottom-2 sm:bottom-10 w-full flex justify-center z-10 transition-all duration-500 ease-in-out">
          <Mydoc />
        </div>
      )}

      {/* About Section */}
      <div ref={aboutRef} className="flex flex-col items-center justify-center mx-auto mb-10 sm:mb-40 px-2" id="about">
        <About />
      </div>

      {/* Vision Component */}
      <div className="flex flex-col items-center justify-center mx-auto mb-10 sm:mb-40 px-2" id="vision">
        <Vision />
      </div>

      {/* Mission */}


      {/* Events */}
      <div className="mb-20 sm:mb-64 m-2 sm:m-44" id="events">
        <h1 className="text-3xl flex md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 justify-center">Explore Past Events</h1>
        <EventsVideo />
        <div className="flex justify-center p-4 sm:p-10" onClick={() => window.location.href = "https://esummit-rec.vercel.app/"}>
          <RainbowButton>Visit E-SUMMIT&apos;25 site</RainbowButton>
        </div>
      </div>

      {/* Highlights */}
      <div className="m-2 sm:m-5">
        <h1 className="text-3xl flex md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 justify-center">Highlights</h1>
        <BlurFade />
        <div className="flex justify-center p-4 sm:p-10" onClick={() => window.location.href = "/former-team"}>
          <RainbowButton>Our Core Team</RainbowButton>
        </div>
      </div>

      {/* Resources */}
      <div id="resources" className="mt-20 sm:mt-40 px-2">
        <h1 className="text-3xl flex md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 justify-center">Resources</h1>
        <BentoGridSecondDemo />
      </div>

      {/* Faculty Coordinator */}
      {/* Faculty Coordinator */}
      <div id="team" className="mt-20 sm:mt-40 px-2">
        <h1 className="text-3xl flex md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 justify-center">Faculty Coordinator</h1>
        <div className="flex justify-center">
          <TeamCard
            key={20}
            role={""}
            name={"Dr. G. Kiran Kumar"}
            imageUrl="/kirankumar.png"
            socialLinks={[]}
          />
        </div>
      </div>

      {/* Team */}
      <div id="team" className="mt-40">
        <Team TeamContainer={"CurrentTeam"} />
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent my-40" />




      {/* Testimonials */}
      <div ref={testimonialsRef} className="mt-4 items-center justify-center mx-auto px-2 ">
        <div id="Testimonials">
          <Testimonials />
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <div className="w-full h-10 bg-black text-white flex items-center justify-center font-mono overflow-hidden text-xs sm:text-base">
        <span className="scrolling-text">Developed By WebTech Team © ECELL REC</span>
      </div>
    </>
  );
}
