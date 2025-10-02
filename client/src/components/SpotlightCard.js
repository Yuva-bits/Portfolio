import React, { useState, useRef, useEffect } from 'react';

const SpotlightCard = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(99, 102, 241, 0.3)',
  spotlightSize = 300,
  borderColor = 'rgba(99, 102, 241, 0.5)',
  ...props 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-500 group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: isHovered 
          ? `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%), linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.8))`
          : 'linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.7))',
        borderColor: isHovered ? borderColor : 'rgba(55, 65, 81, 0.5)',
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px ${borderColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
      {...props}
    >
      {/* Animated border gradient */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${borderColor}, transparent, ${borderColor})`,
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          animation: isHovered ? 'spin 3s linear infinite' : 'none'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Subtle inner glow */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 60%)`
        }}
      />
      
      {/* Additional sparkle effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(2px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.8), transparent 50%)`
        }}
      />
    </div>
  );
};

export default SpotlightCard; 