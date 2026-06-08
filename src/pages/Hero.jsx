import React, { useState, useEffect } from 'react';
import { Icons } from '../Icons';

export default function Hero({ navigate }) {
  const words = ["Machine Learning", "Problem Solver", "Python Developer", "Data Engineer"];
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Stats animations
  const [leetCodeCount, setLeetCodeCount] = useState(0);
  const [cgpaCount, setCgpaCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const word = words[wordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentWord(word.substring(0, currentWord.length - 1));
        if (currentWord.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setCurrentWord(word.substring(0, currentWord.length + 1));
        if (currentWord.length === word.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [currentWord, isDeleting, wordIndex]);

  // Counters
  useEffect(() => {
    let start = null;
    const duration = 2000;
    
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      setLeetCodeCount(Math.floor(progress * 150));
      setCgpaCount((progress * 8.5).toFixed(1));
      setProjectsCount(Math.floor(progress * 3));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, []);

  return (
    <div className="fade-in" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      
      {/* Top Section */}
      <div style={{ marginTop: '5vh' }}>
        <div style={{ 
          color: 'var(--accent-cyan)', 
          letterSpacing: '0.3em', 
          fontSize: '0.8rem',
          marginBottom: '20px'
        }}>
          DATA SCIENCE STUDENT
        </div>
        
        <h1 className="glitch-anim" style={{ 
          fontSize: 'clamp(3rem, 8vw, 5rem)', 
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          Vetrivel A
        </h1>
        
        <div style={{ 
          color: 'var(--accent-purple)', 
          fontSize: '2.4rem', 
          minHeight: '3rem',
          fontFamily: 'Space Mono, monospace'
        }}>
          {currentWord}<span className="hero-cursor">|</span>
        </div>

        <p style={{ 
          color: 'var(--text-muted)', 
          maxWidth: '600px', 
          margin: '20px auto 48px auto', // 48px gap
          lineHeight: '1.6',
          fontSize: '1.1rem'
        }}>
          Building machine learning systems, analytics workflows, and scalable data pipelines to transform raw information into business intelligence.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          
          <div className="gradient-border-wrapper">
            <button 
              className="clickable btn-explore"
              onClick={() => navigate('Observatory')}
            >
              Explore Observatory <span className="arrow">→</span>
            </button>
          </div>
          
          <button 
            className="clickable"
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            📄 Resume
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '80px', 
        flexWrap: 'wrap',
        margin: '20px 0 60px 0'
      }}>
        {/* LeetCode */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {leetCodeCount}+
            <div style={{ display: 'flex', gap: '2px', height: '24px', alignItems: 'flex-end' }}>
              {[40, 60, 80, 100, 70].map((h, i) => (
                <div key={i} style={{ 
                  width: '6px', 
                  height: mounted ? `${h}%` : '0%', 
                  background: 'var(--accent-cyan)',
                  transition: `height 0.5s ease ${i * 0.1}s`
                }} />
              ))}
            </div>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: '10px' }}>LEETCODE PROBLEMS</div>
        </div>

        {/* CGPA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
          <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="64" height="64" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" strokeWidth="4" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--accent-amber)" strokeWidth="4" 
                strokeDasharray="175.9" 
                strokeDashoffset={mounted ? 175.9 - (175.9 * 0.85) : 175.9} 
                style={{ transition: 'stroke-dashoffset 2s ease-out' }} />
            </svg>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{cgpaCount}</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: '10px' }}>CGPA</div>
        </div>

        {/* Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', height: '64px' }}>
            {projectsCount}
            <div style={{ display: 'flex', gap: '4px', marginLeft: '10px' }}>
              {[0, 1, 2].map(i => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{
                    color: mounted ? 'var(--accent-purple)' : 'var(--border)',
                    transition: `color 0.3s ease ${i * 0.3}s`
                  }}>
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                </svg>
              ))}
            </div>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: '10px' }}>PROJECTS</div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ paddingBottom: '20px' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '10px' }}>Let's build something exceptional.</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Open to opportunities in Data Science, Machine Learning, and Engineering.</p>
        <button className="clickable" style={{
          padding: '12px 32px',
          background: 'var(--accent-purple)',
          color: 'white',
          border: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
          marginBottom: '30px'
        }}>
          ✉ Get in Touch
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: 'var(--text-muted)' }}>
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{Icons.github} GitHub</a>
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{Icons.linkedin} LinkedIn</a>
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{Icons.leetcode} LeetCode</a>
          <a href="#" className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{Icons.resume} Resume</a>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{ marginTop: '40px', animation: 'bounce 2s infinite' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          @keyframes blinkCursor {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .hero-cursor {
            color: var(--accent-purple);
            animation: blinkCursor 1s step-end infinite;
          }
          .gradient-border-wrapper {
            position: relative;
            padding: 1px;
            background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
            border-radius: 4px;
          }
          .btn-explore {
            padding: 12px 24px;
            background: var(--bg-base);
            color: white;
            font-size: 1rem;
            border: none;
            border-radius: 3px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .btn-explore:hover {
            background: rgba(124, 58, 237, 0.2);
          }
          .btn-explore .arrow {
            transition: transform 0.3s ease;
          }
          .btn-explore:hover .arrow {
            transform: translateX(4px);
          }
        `}} />
      </div>

    </div>
  );
}
