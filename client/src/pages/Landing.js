import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import ParticleBackground from '../components/ParticleBackground';

const Landing = () => {
  console.log('Landing component is rendering');
  
  const [featuredProjects, setFeaturedProjects] = useState([]);
  
  // Fetch featured projects data
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        // Simple fetch without complex API
        const response = await fetch('/Portfolio/data/projects.json');
        if (response.ok) {
          const data = await response.json();
          const featured = data.sections.slice(0, 3);
          setFeaturedProjects(featured);
          console.log('Featured projects loaded:', featured);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      }
    };
    
    fetchFeaturedProjects();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <ParticleBackground 
        particleCount={80}
        particleColor="#6366f1"
        particleSize={3}
        animationSpeed={0.5}
        interactive={true}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 py-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/5 to-transparent"></div>
          <svg className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 blur-3xl opacity-20" xmlns="http://www.w3.org/2000/svg" width="100%" height="580">
            <defs>
              <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path fill="url(#a)" d="M 0 0 C 473 223 822 330 1440 431 L 1440 580 L 0 580 L 0 0 Z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 z-10 max-w-7xl">
          {/* Centered Hero Text */}
          <div className="text-center py-12 lg:py-16">
            <div className="space-y-6">
            <TextReveal
              text="Hi, I'm Yuvashree Senthilmurugan"
                animation="fade"
                delay={0}
                className="text-4xl md:text-6xl font-bold gradient-heading leading-tight"
              trigger="mount"
            />
              
            <TextReveal
                text="Full-Stack Software Developer | AI/ML Engineer | Building Scalable Cloud & Cybersecurity Solutions"
              animation="fade"
                delay={100}
                className="text-base lg:text-lg xl:text-xl text-gray-200 font-bold leading-tight max-w-6xl mx-auto block px-4"
              trigger="mount"
            />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pt-8 pb-16">
            {/* Left Column - Description and Buttons */}
            <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center">
              <div className="space-y-6">
                <div className="max-w-2xl mx-auto lg:mx-0">
                  <p 
                    className="text-lg text-gray-300 leading-relaxed"
                    style={{ textAlign: 'justify' }}
                  >
                    I design and deliver intelligent software solutions that combine full-stack engineering, AI/ML, cloud, and cybersecurity. My focus is on transforming complex data into actionable insights and building scalable, user-focused systems that drive efficiency, strengthen security, and enable smarter decision-making. I bridge technical depth with business impact, helping organizations innovate faster, smarter, and at scale.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link 
                    to="/projects"
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-block"
                  >
                    <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  View My Work
                    </button>
                </Link>
                  <Link 
                    to="/about"
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-block"
                  >
                    <button className="w-full sm:w-auto px-8 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-gray-500/50 backdrop-blur-sm">
                  About Me
                    </button>
                </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transform rotate-2"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 shadow-2xl">
                  <div className="rounded-xl overflow-hidden relative aspect-[4/3]">
                    <img 
                      src="/Portfolio/profile.jpeg"
                  alt="Yuvashree Senthilmurugan" 
                      className="w-full h-full object-cover rounded-lg"
                      style={{ objectPosition: "center center" }}
                />
                  </div>
                </div>
                {/* Decorative Glowing Orbs */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500/30 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/30 rounded-full blur-sm animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-cyan-500/20 rounded-full blur-sm animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <a href="#skills" className="animate-bounce">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section id="skills" className="py-24 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold gradient-heading mb-6">Technical Expertise</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and expertise across multiple domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Programming Languages and Libraries */}
            <div className="group relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden">
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-3">Programming Languages and Libraries</h3>
                <div className="w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mb-3"></div>
              </div>
              <p className="relative z-10 text-gray-400 group-hover:text-gray-200 text-sm mb-6 leading-relaxed transition-colors duration-300">Core programming languages and development libraries</p>
              <div className="relative z-10 space-y-2 text-gray-300 text-sm leading-relaxed">
                {['Python • Java • C • C++', 'JavaScript • Node.js • PowerShell', 'TensorFlow • Keras • scikit-learn', 'NumPy • Pandas • Jsoup • Apache POI'].map((skill, index) => (
                  <div key={index} className="px-2 py-1 bg-gray-700/30 rounded-lg">{skill}</div>
                ))}
              </div>
            </div>

            {/* Web and Frameworks */}
            <div className="group relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden">
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-3">Web and Frameworks</h3>
                <div className="w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mb-3"></div>
              </div>
              <p className="relative z-10 text-gray-400 group-hover:text-gray-200 text-sm mb-6 leading-relaxed transition-colors duration-300">Modern web development frameworks and technologies</p>
              <div className="relative z-10 space-y-2 text-gray-300 text-sm leading-relaxed">
                {['React.js • Express.js • NestJS', 'Flask • Streamlit • Bootstrap', 'Tailwind CSS • SAM2 • OpenAI CLIP'].map((skill, index) => (
                  <div key={index} className="px-2 py-1 bg-gray-700/30 rounded-lg">{skill}</div>
                ))}
              </div>
            </div>

            {/* Databases and Data Stores */}
            <div className="group relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden">
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-3">Databases and Data Stores</h3>
                <div className="w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mb-3"></div>
              </div>
              <p className="relative z-10 text-gray-400 group-hover:text-gray-200 text-sm mb-6 leading-relaxed transition-colors duration-300">Database technologies and data management</p>
              <div className="relative z-10 space-y-2 text-gray-300 text-sm leading-relaxed">
                {['MongoDB • SQLite • MySQL', 'Microsoft SQL Server • Azure SQL', 'Neo4j'].map((skill, index) => (
                  <div key={index} className="px-2 py-1 bg-gray-700/30 rounded-lg">{skill}</div>
                ))}
              </div>
            </div>

            {/* AI / ML / Retrieval and NLP */}
            <div className="group relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden">
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-3">AI / ML / Retrieval and NLP</h3>
                <div className="w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mb-3"></div>
              </div>
              <p className="relative z-10 text-gray-400 group-hover:text-gray-200 text-sm mb-6 leading-relaxed transition-colors duration-300">Artificial intelligence and machine learning technologies</p>
              <div className="relative z-10 space-y-2 text-gray-300 text-sm leading-relaxed">
                {['LangChain • Hugging Face • RAG', 'Resume parsing and embedding workflows', 'Model training pipelines • similarity search'].map((skill, index) => (
                  <div key={index} className="px-2 py-1 bg-gray-700/30 rounded-lg">{skill}</div>
                ))}
              </div>
            </div>

            {/* Cloud, CI/CD and DevOps */}
            <div className="group relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden">
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-3">Cloud, CI/CD and DevOps</h3>
                <div className="w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mb-3"></div>
              </div>
              <p className="relative z-10 text-gray-400 group-hover:text-gray-200 text-sm mb-6 leading-relaxed transition-colors duration-300">Cloud platforms and development operations</p>
              <div className="relative z-10 space-y-2 text-gray-300 text-sm leading-relaxed">
                {['Microsoft Azure • Azure REST API', 'Azure Data Factory • Azure DevOps', 'GitHub • Jenkins • Infrastructure as Code'].map((skill, index) => (
                  <div key={index} className="px-2 py-1 bg-gray-700/30 rounded-lg">{skill}</div>
                ))}
              </div>
                </div>

            {/* Networking and Security */}
            <div className="group relative flex flex-col items-center text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden">
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-3">Networking and Security</h3>
                <div className="w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mb-3"></div>
                </div>
              <p className="relative z-10 text-gray-400 group-hover:text-gray-200 text-sm mb-6 leading-relaxed transition-colors duration-300">Cybersecurity and network technologies</p>
              <div className="relative z-10 space-y-2 text-gray-300 text-sm leading-relaxed">
                {['pfctl • iptables • OpenVPN', 'WireGuard • IKEv2/IPSec • Cisco AnyConnect', 'Wireshark • Nmap • Nikto • Metasploit', 'TCP/UDP/ICMP/ARP'].map((skill, index) => (
                  <div key={index} className="px-2 py-1 bg-gray-700/30 rounded-lg">{skill}</div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <a href="#featured-projects" className="animate-bounce">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-24 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold gradient-heading mb-6">Featured Projects</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore my latest work showcasing innovative solutions across AI/ML, cybersecurity, and full-stack development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <div 
                key={project._id || index} 
                className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-4">
                    {project.title}
                  </h3>
                  
                  {project.description && (
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="relative z-10 mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-blue-200 rounded-full text-xs font-medium border border-blue-700/30 hover:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-purple-800/50 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 rounded-full text-xs font-medium border border-gray-600/30">
                            +{project.technologies.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 flex gap-3">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm"
                        style={{ color: 'white' }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span style={{ color: 'white' }}>GitHub</span>
                      </a>
                    )}
                    <Link
                      to="/project-details"
                      onClick={() => {
                        sessionStorage.setItem('selectedProject', JSON.stringify(project));
                        window.scrollTo(0, 0);
                      }}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/projects" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ color: 'white' }}
              onClick={() => window.scrollTo(0, 0)}
            >
              <span style={{ color: 'white' }}>Explore All Projects</span>
              <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
        <div className="container mx-auto px-6 text-center max-w-7xl">
          <h2 className="text-4xl font-bold gradient-heading mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            I'm currently available for freelance work or full-time opportunities. If you're interested in working together, let's connect!
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="mailto:contact@example.com">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Get In Touch
              </button>
            </a>
            <a href="https://www.linkedin.com/in/yuvashree-senthilmurugan-86495b1bb/" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 border border-gray-600 hover:border-gray-500">
              LinkedIn Profile
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing; 