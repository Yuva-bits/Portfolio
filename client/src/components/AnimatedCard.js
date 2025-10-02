import React, { useState, useRef } from 'react';

const AnimatedCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hoverEffect = 'lift',
  glowEffect = false,
  tiltEffect = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tiltEffect) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const baseClasses = `
    relative rounded-xl overflow-hidden transition-all duration-500 ease-out
    transform-gpu will-change-transform
  `;

  const variantClasses = {
    default: `
      bg-gray-800 border border-gray-700 shadow-lg
      hover:border-gray-600
    `,
    glass: `
      bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20
      shadow-xl hover:bg-opacity-20
    `,
    gradient: `
      bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700
      shadow-lg hover:from-gray-700 hover:to-gray-800
    `,
    neon: `
      bg-gray-900 border-2 border-cyan-500 shadow-lg shadow-cyan-500/25
      hover:shadow-cyan-500/50
    `
  };

  const hoverEffectClasses = {
    lift: 'hover:-translate-y-2 hover:scale-105',
    scale: 'hover:scale-105',
    rotate: 'hover:rotate-1',
    none: ''
  };

  const tiltStyle = tiltEffect ? {
    transform: `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
    transformStyle: 'preserve-3d'
  } : {};

  return (
    <div
      ref={cardRef}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${hoverEffectClasses[hoverEffect]}
        ${className}
        ${glowEffect && isHovered ? 'shadow-2xl shadow-indigo-500/25' : ''}
      `}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Glow effect */}
      {glowEffect && (
        <div 
          className={`
            absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 
            opacity-0 transition-opacity duration-500 -z-10 blur-xl
            ${isHovered ? 'opacity-20' : ''}
          `}
        />
      )}

      {/* Shine effect */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
          opacity-0 transition-all duration-1000 -skew-x-12 translate-x-full
          ${isHovered ? 'opacity-10 translate-x-0' : ''}
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedCard; 