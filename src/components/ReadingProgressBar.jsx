import React, { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'rgba(255,255,255,0.05)',
      zIndex: 999999
    }}>
      <div style={{
        height: '100%',
        width: scrollProgress,
        background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
        transition: 'width 0.1s ease',
        boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
      }} />
    </div>
  );
}
