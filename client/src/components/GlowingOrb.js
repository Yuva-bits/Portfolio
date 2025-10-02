import React, { useState, useEffect } from 'react';

const GlowingOrb = ({ 
  size = 'md',
  color = 'indigo',
  intensity = 'medium',
  animation = 'pulse',
  className = '',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (animation === 'breathe') {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animation]);

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-40 h-40'
  };

  const colorVariants = {
    indigo: {
      base: 'bg-indigo-500',
      glow: 'shadow-indigo-500/50',
      ring: 'ring-indigo-400/30'
    },
    purple: {
      base: 'bg-purple-500',
      glow: 'shadow-purple-500/50',
      ring: 'ring-purple-400/30'
    },
    cyan: {
      base: 'bg-cyan-500',
      glow: 'shadow-cyan-500/50',
      ring: 'ring-cyan-400/30'
    },
    pink: {
      base: 'bg-pink-500',
      glow: 'shadow-pink-500/50',
      ring: 'ring-pink-400/30'
    },
    emerald: {
      base: 'bg-emerald-500',
      glow: 'shadow-emerald-500/50',
      ring: 'ring-emerald-400/30'
    },
    orange: {
      base: 'bg-orange-500',
      glow: 'shadow-orange-500/50',
      ring: 'ring-orange-400/30'
    }
  };

  const intensityClasses = {
    low: 'shadow-lg',
    medium: 'shadow-xl',
    high: 'shadow-2xl',
    extreme: 'shadow-2xl drop-shadow-2xl'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    ping: 'animate-ping',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    breathe: '',
    none: ''
  };

  const getBreathingScale = () => {
    if (animation !== 'breathe') return 1;
    const scale = 1 + Math.sin(animationPhase * 0.1) * 0.1;
    return scale;
  };

  const getBreathingOpacity = () => {
    if (animation !== 'breathe') return 1;
    const opacity = 0.7 + Math.sin(animationPhase * 0.1) * 0.3;
    return opacity;
  };

  const colorConfig = colorVariants[color] || colorVariants.indigo;

  return (
    <div 
      className={`
        relative rounded-full cursor-pointer transition-all duration-300
        ${sizeClasses[size]}
        ${colorConfig.base}
        ${colorConfig.glow}
        ${intensityClasses[intensity]}
        ${animationClasses[animation]}
        ${isHovered ? 'scale-110' : ''}
        ${className}
      `}
      style={{
        transform: animation === 'breathe' ? `scale(${getBreathingScale()})` : undefined,
        opacity: animation === 'breathe' ? getBreathingOpacity() : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      {/* Inner glow */}
      <div className={`
        absolute inset-2 rounded-full opacity-60
        ${colorConfig.base}
        blur-sm
      `} />
      
      {/* Outer ring */}
      <div className={`
        absolute inset-0 rounded-full ring-4
        ${colorConfig.ring}
        ${isHovered ? 'ring-8' : ''}
        transition-all duration-300
      `} />
      
      {/* Core light */}
      <div className={`
        absolute inset-4 rounded-full opacity-80
        ${colorConfig.base}
        ${isHovered ? 'inset-2' : ''}
        transition-all duration-300
      `} />
      
      {/* Sparkle effect */}
      {isHovered && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-300" />
          <div className="absolute top-1/2 left-1 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-600" />
        </>
      )}
    </div>
  );
};

export default GlowingOrb; 