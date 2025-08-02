import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const navigationItems = [
    {
      title: "Quick Links",
      items: [
        { title: "Home", href: "/" },
        { title: "About Us", href: "/#about" },
        { title: "Events", href: "/events" },
        { title: "Team", href: "/#team" },
        { title: "Resources", href: "/#resources" },
      ],
    },
    {
      title: "About",
      items: [
        { title: "Mission", href: "/#mission" },
        { title: "Vision", href: "/#vision" },
        { title: "History", href: "/#about" },
        { title: "Achievements", href: "/#about" },
      ],
    },
    {
      title: "Get Involved",
      items: [
        { title: "Join Us", href: "/#team" },
        { title: "Volunteer", href: "/#team" },
        { title: "Sponsorship", href: "/#about" },
        { title: "Contact", href: "/#about" },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative w-16 h-16">
                  <Image 
                    src="/icons/whitelogo.png" 
                    alt="E-CELL REC" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    E-CELL REC
                  </h3>
                  <p className="text-sm text-gray-300">Entrepreneurship Cell</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed max-w-sm">
                Empowering innovative minds and fostering entrepreneurial spirit among students at Raghu Engineering College.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="group relative p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="group relative p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/ecell_.rec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/e-cell-rec-vizag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Navigation Sections */}
            {navigationItems.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-purple-500/30 pb-2">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                      >
                        <svg className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-6 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-500/20">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Location</p>
                  <p className="text-white font-medium">Raghu Engineering College, Dakamarri, Visakhapatnam</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-500/20">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Email</p>
                  <p className="text-white font-medium">ecell@raghuengg.edu.in</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-500/20">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Phone</p>
                  <p className="text-white font-medium">+91 98480 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 bg-black/30">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-300 text-sm">
                  © 2024 E-CELL REC. All rights reserved.
                </p>
              </div>
              
              <div className="flex space-x-6 text-sm">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -translate-y-16 -translate-x-16"></div>
    </footer>
  );
}
