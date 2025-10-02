import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Landing from './pages/Landing';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';


// ScrollToTop component to handle scroll position on route changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
};

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Landing />} />
      <Route path="/education" element={<Education />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project-details" element={<ProjectDetails />} />

      <Route path="/about" element={<Home />} />
    </Routes>
  );
};

// Main App component
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router basename="/Portfolio">
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-gray-900">
        {/* Navigation */}
        <nav className={`bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-10 transition-all duration-500 ${scrolled ? 'py-2 bg-opacity-100 backdrop-blur-xl' : 'py-4 bg-opacity-95'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <Link 
                    to="/" 
                    className="text-2xl font-bold text-gray-100 hover:text-primary transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <span className="gradient-heading animate-fade-in">Portfolio</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                  <NavLink 
                    to="/projects" 
                    className={({ isActive }) => 
                      `nav-link ${isActive 
                        ? "border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}`
                    }
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Projects
                  </NavLink>
                  <NavLink 
                    to="/experience" 
                    className={({ isActive }) => 
                      `nav-link ${isActive 
                        ? "border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}`
                    }
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Experience
                  </NavLink>
                  <NavLink 
                    to="/education" 
                    className={({ isActive }) => 
                      `nav-link ${isActive 
                        ? "border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}`
                    }
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Education
                  </NavLink>
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                      `nav-link ${isActive 
                        ? "border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}`
                    }
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    About
                  </NavLink>
                </div>
              </div>
              
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {!mobileMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div 
              className="sm:hidden animate-fade-in bg-gray-900 border-t border-gray-800" 
              id="mobile-menu"
            >
              <div className="pt-2 pb-3 space-y-1">
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-800 border-indigo-500 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-1"
                      : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-1"
                  }
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Projects
                </NavLink>
                <NavLink
                  to="/experience"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-800 border-indigo-500 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-2"
                      : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-2"
                  }
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Experience
                </NavLink>
                <NavLink
                  to="/education"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-800 border-indigo-500 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-3"
                      : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-3"
                  }
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Education
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-800 border-indigo-500 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-4"
                      : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium animate-slide-in animate-delay-4"
                  }
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  About
                </NavLink>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        {/* Footer */}
        <footer className="py-12 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <Link 
                  to="/" 
                  className="text-2xl font-bold gradient-heading"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Portfolio
                </Link>
                <p className="text-gray-400 mt-2">
                  &copy; {new Date().getFullYear()} Yuvashree Senthilmurugan. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="https://www.linkedin.com/in/yuvashree-senthilmurugan-86495b1bb/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors social-icon">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors social-icon">
                  <span className="sr-only">Email</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 