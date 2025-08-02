"use client";
import React from "react";

const startupGuides = [
  {
    id: "ideation",
    title: "Ideation & Problem Validation",
    description: "Transform your ideas into validated business opportunities",
    icon: "💡",
    color: "from-blue-500 to-cyan-600",
    content: [
      "Identifying real problems worth solving",
      "Customer pain point analysis",
      "Idea validation techniques",
      "Competitive landscape research",
      "Unique value proposition development"
    ],
    tools: ["Customer interviews", "Surveys", "Problem validation frameworks", "Idea mapping tools"],
    resources: ["Lean Startup methodology", "Design Thinking", "Jobs-to-be-done framework"]
  },
  {
    id: "market-research",
    title: "Market Research & Analysis",
    description: "Understand your market, customers, and competitive landscape",
    icon: "🔍",
    color: "from-green-500 to-emerald-600",
    content: [
      "Target market identification",
      "Customer persona development",
      "Market size estimation (TAM, SAM, SOM)",
      "Competitive analysis",
      "Market trends and opportunities"
    ],
    tools: ["Google Trends", "SEMrush", "SimilarWeb", "SurveyMonkey", "Typeform"],
    resources: ["Market research reports", "Industry databases", "Government statistics"]
  },
  {
    id: "business-model",
    title: "Business Model & Planning",
    description: "Design a sustainable and scalable business model",
    icon: "📊",
    color: "from-purple-500 to-violet-600",
    content: [
      "Business model canvas development",
      "Revenue model design",
      "Cost structure analysis",
      "Key partnerships identification",
      "Value chain mapping"
    ],
    tools: ["Business Model Canvas", "Lean Canvas", "Value Proposition Canvas", "Financial modeling tools"],
    resources: ["Business model patterns", "Revenue model examples", "Strategic planning frameworks"]
  },
  {
    id: "legal-structure",
    title: "Legal & Business Structure",
    description: "Establish proper legal foundation and business structure",
    icon: "⚖️",
    color: "from-orange-500 to-red-600",
    content: [
      "Business entity selection (LLC, Corp, etc.)",
      "Intellectual property protection",
      "Employment and contractor agreements",
      "Regulatory compliance",
      "Tax considerations"
    ],
    tools: ["LegalZoom", "Rocket Lawyer", "Clerky", "Gust Launch"],
    resources: ["Legal templates", "Compliance checklists", "IP protection guides"]
  },
  {
    id: "mvp-development",
    title: "MVP Development & Testing",
    description: "Build and validate your minimum viable product",
    icon: "🚀",
    color: "from-indigo-500 to-blue-600",
    content: [
      "MVP feature prioritization",
      "Rapid prototyping techniques",
      "User testing methodologies",
      "Feedback collection and iteration",
      "Product-market fit validation"
    ],
    tools: ["Figma", "InVision", "UserTesting", "Hotjar", "Google Analytics"],
    resources: ["MVP development guides", "User testing best practices", "Product iteration frameworks"]
  },
  {
    id: "funding-financials",
    title: "Funding & Financial Management",
    description: "Secure funding and establish financial discipline",
    icon: "💰",
    color: "from-yellow-500 to-amber-600",
    content: [
      "Funding options and strategies",
      "Financial planning and forecasting",
      "Investor pitch deck creation",
      "Cash flow management",
      "Financial metrics and KPIs"
    ],
    tools: ["QuickBooks", "Xero", "Pitch Deck templates", "Financial modeling software"],
    resources: ["Funding guides", "Pitch deck examples", "Financial planning templates"]
  },
  {
    id: "product-tech",
    title: "Product & Technology Development",
    description: "Scale your product and build robust technology infrastructure",
    icon: "⚙️",
    color: "from-teal-500 to-cyan-600",
    content: [
      "Technology stack selection",
      "Development methodologies",
      "Quality assurance and testing",
      "Security and compliance",
      "Scalability planning"
    ],
    tools: ["GitHub", "Jira", "AWS/Azure/GCP", "Docker", "CI/CD tools"],
    resources: ["Tech stack guides", "Development best practices", "Security frameworks"]
  },
  {
    id: "marketing-growth",
    title: "Marketing & Growth Strategy",
    description: "Acquire customers and drive sustainable growth",
    icon: "📈",
    color: "from-pink-500 to-rose-600",
    content: [
      "Growth hacking strategies",
      "Digital marketing channels",
      "Content marketing and SEO",
      "Social media and community building",
      "Customer acquisition and retention"
    ],
    tools: ["Google Ads", "Facebook Ads", "Mailchimp", "HubSpot", "Hootsuite"],
    resources: ["Growth hacking playbooks", "Marketing automation guides", "SEO best practices"]
  },
  {
    id: "operations-scaling",
    title: "Operations & Scaling",
    description: "Build efficient operations and scale your business",
    icon: "🏗️",
    color: "from-gray-500 to-slate-600",
    content: [
      "Team building and hiring",
      "Process optimization",
      "Customer support systems",
      "International expansion",
      "Exit strategy planning"
    ],
    tools: ["Slack", "Asana", "Zendesk", "HR management systems", "Process automation tools"],
    resources: ["Hiring guides", "Process optimization frameworks", "Scaling playbooks"]
  }
];

const actionableInsights = [
  {
    title: "Start Small, Think Big",
    description: "Begin with a focused MVP and validate before scaling. Don't try to build everything at once.",
    icon: "🎯"
  },
  {
    title: "Customer-First Approach",
    description: "Always start with customer problems, not solutions. Validate assumptions early and often.",
    icon: "👥"
  },
  {
    title: "Build in Public",
    description: "Share your journey, build community, and get feedback. Transparency builds trust and attracts customers.",
    icon: "📢"
  },
  {
    title: "Focus on Unit Economics",
    description: "Understand your customer acquisition cost (CAC) and lifetime value (LTV) from day one.",
    icon: "📊"
  },
  {
    title: "Iterate Rapidly",
    description: "Fail fast, learn faster. Use data to drive decisions and pivot when necessary.",
    icon: "🔄"
  }
];

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-block mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Startup Guides
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Your comprehensive roadmap from idea to successful startup. Whether you&apos;re a first-time founder, 
            solo entrepreneur, or early-stage startup, these guides will help you navigate every phase of 
            your entrepreneurial journey with confidence and clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">🎯 First-time Founders</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">🚀 Solo Entrepreneurs</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">💼 Early-stage Startups</span>
          </div>
        </div>
      </div>

      {/* Startup Journey Timeline */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {startupGuides.map((guide, index) => (
            <div 
              key={guide.id} 
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Guide Card */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Top Gradient Accent */}
                <div className={`h-2 bg-gradient-to-r ${guide.color}`}></div>
                
                {/* Card Content */}
                <div className="relative p-8">
                  {/* Icon and Title */}
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{guide.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-600">{guide.description}</p>
                    </div>
                  </div>

                  {/* Content Points */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Key Topics:</h4>
                    <ul className="space-y-2">
                      {guide.content.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="text-blue-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools and Resources */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Essential Tools:</h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.tools.map((tool, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Resources:</h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.resources.map((resource, idx) => (
                          <span key={idx} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    {guide.id === "ideation" ? (
                      <a 
                        href="https://www.lennysnewsletter.com/p/validating-your-startup-idea" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <button className={`w-full bg-gradient-to-r ${guide.color} text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                          Explore Guide
                        </button>
                      </a>
                    ) : (
                      <button className={`w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg cursor-not-allowed opacity-75 transition-all duration-300`}>
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Insights Section */}
      <div className="container mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Actionable Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key principles and tips to keep in mind as you navigate your startup journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actionableInsights.map((insight, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-3xl mb-4">{insight.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{insight.title}</h3>
              <p className="text-gray-600 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of entrepreneurs and get access to detailed guides, templates, and expert insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScRBIOsgeAuOJIh80YbwD0G1z55cqAkH75E6lviqr1HytEDNg/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Get Started Today
              </button>
            </a>
            <a 
              href="https://chat.whatsapp.com/Cp2S3wtpE7UHp5dR7BK7Am" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300">
                Join Community
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-6 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">
              Building the Future • One Startup at a Time
            </span>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page; 