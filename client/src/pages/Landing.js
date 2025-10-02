import React from 'react';

const Landing = () => {
  // Very basic test - just render something simple
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1f2937', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '2rem',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ color: '#3b82f6', marginBottom: '1rem' }}>
          🚀 Landing Page Test
        </h1>
        <p style={{ color: '#d1d5db', marginBottom: '2rem' }}>
          React is working! This is a basic test.
        </p>
        <div style={{ 
          backgroundColor: '#ef4444', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          ✅ Landing Component Successfully Loaded!
        </div>
        <p style={{ color: '#9ca3af' }}>
          If you can see this, React is rendering correctly.
        </p>
      </div>
    </div>
  );
};

export default Landing;