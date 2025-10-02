import React, { useState, useEffect, useRef } from 'react';

const TextReveal = ({ 
  text, 
  animation = 'typewriter',
  delay = 0,
  speed = 50,
  className = '',
  onComplete,
  trigger = 'mount', // 'mount', 'scroll', 'hover'
  ...props 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleAnimation = () => {
      if (isAnimating) return;
      
      setIsAnimating(true);
      setIsVisible(true);
      
      timeoutRef.current = setTimeout(() => {
        if (animation === 'typewriter') {
          let index = 0;
          const interval = setInterval(() => {
            if (index <= text.length) {
              setDisplayedText(text.slice(0, index));
              index++;
            } else {
              clearInterval(interval);
              setIsAnimating(false);
              setDisplayedText(text);
              if (onComplete) onComplete();
            }
          }, speed);
        } else if (animation === 'fade') {
          setDisplayedText(text);
          setTimeout(() => {
            setIsAnimating(false);
            if (onComplete) onComplete();
          }, 1000);
        } else if (animation === 'slideUp') {
          setDisplayedText(text);
          setTimeout(() => {
            setIsAnimating(false);
            if (onComplete) onComplete();
          }, 1200);
        } else if (animation === 'wave') {
          setDisplayedText(text);
          setTimeout(() => {
            setIsAnimating(false);
            if (onComplete) onComplete();
          }, text.length * 100);
        } else {
          setDisplayedText(text);
          setIsAnimating(false);
        }
      }, delay);
    };

    if (trigger === 'mount') {
      handleAnimation();
    } else if (trigger === 'scroll') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isAnimating) {
            handleAnimation();
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [trigger, animation, delay, text, speed, onComplete, isAnimating]);



  const handleMouseEnter = () => {
    if (trigger === 'hover' && !isAnimating) {
      setIsAnimating(true);
      setIsVisible(true);
      
      timeoutRef.current = setTimeout(() => {
        if (animation === 'typewriter') {
          let index = 0;
          const interval = setInterval(() => {
            if (index <= text.length) {
              setDisplayedText(text.slice(0, index));
              index++;
            } else {
              clearInterval(interval);
              setIsAnimating(false);
              setDisplayedText(text);
              if (onComplete) onComplete();
            }
          }, speed);
        } else if (animation === 'fade') {
          setDisplayedText(text);
          setTimeout(() => {
            setIsAnimating(false);
            if (onComplete) onComplete();
          }, 1000);
        } else if (animation === 'slideUp') {
          setDisplayedText(text);
          setTimeout(() => {
            setIsAnimating(false);
            if (onComplete) onComplete();
          }, 1200);
        } else if (animation === 'wave') {
          setDisplayedText(text);
          setTimeout(() => {
            setIsAnimating(false);
            if (onComplete) onComplete();
          }, text.length * 100);
        } else {
          setDisplayedText(text);
          setIsAnimating(false);
        }
      }, delay);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getAnimationClasses = () => {
    switch (animation) {
      case 'typewriter':
        return `
          opacity-100
          ${isAnimating ? 'border-r-2 border-indigo-500' : ''}
        `;
      case 'fade':
        return `
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${!isAnimating ? '' : 'transition-all duration-1000 ease-out'}
        `;
      case 'slideUp':
        return `
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
          ${!isAnimating ? '' : 'transition-all duration-1200 ease-out'}
        `;
      case 'wave':
        return `opacity-100`;
      default:
        return 'opacity-100';
    }
  };

  const renderWaveText = () => {
    if (animation !== 'wave') {
      return displayedText;
    }

    return text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block"
        style={{
          animation: isAnimating ? `bounce 1s ease-in-out ${index * 100}ms` : 'none'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <span
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {animation === 'wave' ? renderWaveText() : displayedText}
    </span>
  );
};

export default TextReveal; 