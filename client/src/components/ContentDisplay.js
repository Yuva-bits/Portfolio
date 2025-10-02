import React, { useState, useEffect, useRef } from 'react';
import AnimatedCard from './AnimatedCard';

const ContentDisplay = ({ content }) => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    if (!content) return;
    
    // Reset refs array when content changes
    sectionRefs.current = sectionRefs.current.slice(0, content.sections.length);
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleSections(prev => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const currentRefs = sectionRefs.current;
    currentRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      currentRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [content]);

  if (!content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-500 rounded-full mb-4 animate-zoom"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold gradient-heading mb-6">
            {content.title}
          </h1>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-10">
          {content.sections.map((section, index) => (
            <div
              key={section._id || index}
              ref={el => sectionRefs.current[index] = el}
              data-index={index}
              className={`animate-fade-in ${visibleSections.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 ease-out`}
            >
              <AnimatedCard hoverEffect="none">
                <div className="group relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]">
                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content - Add relative z-10 to keep content above effects */}
                  <div className="relative z-10">
                  {/* Section Title */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section Content */}
                  <div 
                    className="text-white"
                    style={{
                      lineHeight: '1.5',
                      fontSize: '18px',
                      textAlign: 'justify',
                      fontFamily: '"Barlow", "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: section.text
                        .replace(/<br\s*\/?>/gi, '')
                        .replace(/\n/g, '')
                        .replace(/<p>/g, '<p style="margin: 0 0 1rem 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                        .replace(/<h1>/g, '<h1 style="font-size: 1.8rem; font-weight: 600; margin: 1rem 0 0 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif;">')
                        .replace(/<h2>/g, '<h2 style="font-size: 1.6rem; font-weight: 600; margin: 1rem 0 0 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif;">')
                        .replace(/<h3>/g, '<h3 style="font-size: 1.4rem; font-weight: 600; margin: 1rem 0 0 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif;">')
                        .replace(/<ul>/g, '<ul style="margin: 0; padding: 0 0 0 1.5rem; color: white; list-style-type: disc; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                        .replace(/<ol>/g, '<ol style="margin: 0; padding: 0 0 0 1.5rem; color: white; list-style-type: decimal; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                        .replace(/<li>/g, '<li style="margin: 0; padding: 0; color: white; display: list-item; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                        .replace(/<strong>/g, '<strong style="color: white;">')
                        .replace(/<em>/g, '<em style="color: white;">')
                        .replace(/<u>/g, '<u style="color: white;">')
                        .replace(/<a[^>]*>/g, '<a style="color: #60a5fa; text-decoration: underline;">')
                    }}
                  />
                  
                  {/* Action Buttons */}
                  {(section.githubLink || section.documentationLink) && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                      {/* GitHub Link */}
                      {section.githubLink && (
                        <a 
                          href={section.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 border border-gray-600 hover:border-gray-500"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          View on GitHub
                        </a>
                      )}

                      {/* Documentation Link */}
                      {section.documentationLink && (
                        <a
                          href={section.documentationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 border border-transparent hover:border-green-400"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          View Documentation
                        </a>
                      )}
                    </div>
                  )}
                  </div>
                  </div>
              </AnimatedCard>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {content.sections.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg">
              No content available for this page.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDisplay; 