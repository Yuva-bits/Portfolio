import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import ParticleBackground from '../components/ParticleBackground';
import GlowingOrb from '../components/GlowingOrb';
import { getPageContent } from '../utils/api';

const Landing = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch featured projects data
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const projectsData = await getPageContent('projects');
        if (projectsData && projectsData.sections) {
          // Get first 3 projects for featured section
          setFeaturedProjects(projectsData.sections.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        // Fallback featured projects if API fails
        setFeaturedProjects([
          {
            title: "ML-Driven Malware and Anomaly Detection Platform",
            description: "Advanced cybersecurity platform using machine learning for real-time threat detection and anomaly analysis.",
            technologies: ["Python", "TensorFlow", "Azure", "Docker", "MongoDB"],
            github: "https://github.com/Yuva-bits/ML-Malware-Detection",
            order: 0
          },
          {
            title: "Adaptive Workforce System using Knowledge Graphs and Multi Agent System",
            description: "Intelligent workforce management system leveraging knowledge graphs and multi-agent architecture for optimal resource allocation.",
            technologies: ["Python", "Neo4j", "LangChain", "React", "FastAPI"],
            github: "https://github.com/Yuva-bits/Adaptive-Workforce-System",
            order: 1
          },
          {
            title: "HomeConnect",
            description: "Smart home automation platform with IoT integration and intelligent device management.",
            technologies: ["React", "Node.js", "IoT", "WebSocket", "MongoDB"],
            github: "https://github.com/Yuva-bits/HomeConnect",
            order: 2
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const skills = [
    {
      title: "Programming Languages and Libraries",
      icon: "💻",
      items: ["Python", "Java", "C", "C++", "JavaScript (Node.js)", "PowerShell", "TensorFlow", "Keras", "scikit-learn", "NumPy", "Pandas", "Jsoup", "Apache POI"]
    },
    {
      title: "Web and Frameworks", 
      icon: "🌐",
      items: ["React.js", "Express.js", "NestJS", "Flask", "Streamlit", "Bootstrap", "Tailwind CSS", "SAM2", "OpenAI CLIP"]
    },
    {
      title: "Databases and Data Stores",
      icon: "🗄️", 
      items: ["MongoDB", "SQLite", "MySQL", "Microsoft SQL Server", "Azure SQL", "Neo4j"]
    },
    {
      title: "AI / ML / Retrieval and NLP",
      icon: "🤖",
      items: ["LangChain", "Hugging Face", "Retrieval-Augmented Generation (RAG)", "Resume parsing and embedding workflows", "Model training pipelines", "Similarity search"]
    },
    {
      title: "Cloud, CI/CD and DevOps",
      icon: "☁️",
      items: ["Microsoft Azure", "Azure REST API", "Azure Data Factory", "Azure DevOps", "GitHub", "Jenkins", "Infrastructure as Code"]
    },
    {
      title: "Networking and Security",
      icon: "🔒",
      items: ["pfctl", "iptables", "OpenVPN", "WireGuard", "IKEv2/IPSec", "Cisco AnyConnect", "Wireshark", "Nmap", "Nikto", "Metasploit", "TCP/UDP/ICMP/ARP"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <TextReveal 
                  text="Hi, I'm Yuvashree Senthilmurugan" 
                  className="text-6xl font-bold text-white leading-tight"
                  delay={0}
                />
                <TextReveal 
                  text="Full-Stack Software Developer | AI/ML Engineer | Building Scalable Cloud and Cybersecurity Solutions"
                  className="text-2xl text-gray-200 font-bold"
                  delay={100}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/projects"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>View My Work</span>
                </Link>
                <Link 
                  to="/about"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  About Me
                </Link>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <GlowingOrb className="absolute inset-0" />
                <div className="relative w-full h-full bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="/Portfolio/profile.jpeg"
                    alt="Yuvashree Senthilmurugan"
                    className="h-full w-full object-cover rounded-xl"
                    style={{ objectPosition: "center top" }}
                    onError={(e) => {
                      console.log('Image failed to load, trying fallback paths...');
                      const fallbackPaths = [
                        `${window.location.origin}/profile.jpeg`,
                        `${process.env.PUBLIC_URL || ''}/profile.jpeg`,
                        '/profile.jpeg',
                        './profile.jpeg'
                      ];

                      let currentIndex = 0;
                      const tryNextPath = () => {
                        if (currentIndex < fallbackPaths.length) {
                          e.target.src = fallbackPaths[currentIndex];
                          console.log(`Trying fallback path: ${fallbackPaths[currentIndex]}`);
                          currentIndex++;
                        } else {
                          console.error('All image paths failed to load');
                        }
                      };

                      e.target.onerror = tryNextPath;
                      tryNextPath();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold gradient-heading mb-6">Technical Expertise</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/40 hover:border-gray-600/50 rounded-2xl p-8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 group relative overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl border border-gray-600/50 group-hover:border-blue-400/50 transition-colors duration-700">
                    {skill.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-blue-300 transition-colors duration-700">
                    {skill.title}
                  </h3>
                  
                  <div className="space-y-3">
                    {skill.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="bg-gray-700/30 rounded-lg px-3 py-2 text-base text-gray-300 group-hover:text-gray-200 transition-colors duration-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold gradient-heading mb-6">Featured Projects</h2>
          </div>
          
          {isLoading ? (
            <div className="text-center text-gray-400">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              Loading featured projects...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div 
                  key={index}
                  className="group relative bg-gray-800/20 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
                >
                  {/* Animated blur orbs */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-400/30 transition-colors duration-700"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-400/30 transition-colors duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-700">
                          {project.title}
                        </h3>
                        <div className="w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-700 mb-4"></div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-700">
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies && project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full group-hover:bg-gray-600/50 group-hover:text-gray-200 transition-colors duration-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        style={{ color: 'white' }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span style={{ color: 'white' }}>GitHub</span>
                      </a>
                      
                      <Link
                        to="/project-details"
                        onClick={() => {
                          sessionStorage.setItem('selectedProject', JSON.stringify(project));
                          window.scrollTo(0, 0);
                        }}
                        className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                      >
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/projects"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ color: 'white' }}
            >
              <span style={{ color: 'white' }}>Explore All Projects</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold gradient-heading mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can collaborate to build something amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:yuvashreesenthilmurugan@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </a>
            <Link 
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;