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
          fontSize: '2.2rem', 
          fontWeight: '600',
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
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '8px',
              color: '#f1f5f9',
              background: 'transparent',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              textDecoration: 'none',
              fontFamily: 'Space Mono, monospace',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            📄 Resume
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '80px', 
        margin: '48px auto 0',
        maxWidth: '700px',
      }}>
        {/* LeetCode */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px', padding: '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px', padding: '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px', padding: '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
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
        <div style={{
          width: '60px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)',
          margin: '40px auto',
        }} />
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

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
          {/* BOX 1 - WhatsApp */}
          <div onClick={() => window.open("https://wa.me/919876543210","_blank")}
            style={{
              display:'flex', alignItems:'center', gap:'12px',
              padding:'0 20px', width:'200px', minWidth:'200px', maxWidth:'200px', height:'64px',
              background:'rgba(37,211,102,0.1)',
              border:'1px solid rgba(37,211,102,0.3)',
              borderRadius:'12px', cursor:'pointer',
              transition:'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background='rgba(37,211,102,0.2)';
              e.currentTarget.style.borderColor='rgba(37,211,102,0.6)';
              e.currentTarget.style.transform='translateY(-2px)';
              e.currentTarget.style.boxShadow='0 8px 20px rgba(37,211,102,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background='rgba(37,211,102,0.1)';
              e.currentTarget.style.borderColor='rgba(37,211,102,0.3)';
              e.currentTarget.style.transform='translateY(0)';
              e.currentTarget.style.boxShadow='none';
            }}
          >
            {/* WhatsApp SVG icon in #25D166, 22px */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#25D166" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path fill="#25D166" d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.857l6.158-1.453A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.5-5.191-1.375l-.371-.22-3.857.91.972-3.751-.242-.386A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{color:'white',fontWeight:'bold',fontSize:'14px'}}>WhatsApp</div>
              <div style={{color:'#64748b',fontSize:'11px'}}>Chat directly</div>
            </div>
          </div>

          {/* BOX 2 - LinkedIn */}
          <div onClick={() => window.open("https://linkedin.com/in/vetrivel-a","_blank")}
            style={{
              display:'flex', alignItems:'center', gap:'12px',
              padding:'0 20px', width:'200px', minWidth:'200px', maxWidth:'200px', height:'64px',
              background:'rgba(10,102,194,0.1)',
              border:'1px solid rgba(10,102,194,0.3)',
              borderRadius:'12px', cursor:'pointer',
              transition:'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background='rgba(10,102,194,0.2)';
              e.currentTarget.style.borderColor='rgba(10,102,194,0.6)';
              e.currentTarget.style.transform='translateY(-2px)';
              e.currentTarget.style.boxShadow='0 8px 20px rgba(10,102,194,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background='rgba(10,102,194,0.1)';
              e.currentTarget.style.borderColor='rgba(10,102,194,0.3)';
              e.currentTarget.style.transform='translateY(0)';
              e.currentTarget.style.boxShadow='none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A66C2' }}>
              {Icons.linkedin}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{color:'white',fontWeight:'bold',fontSize:'14px'}}>LinkedIn</div>
              <div style={{color:'#64748b',fontSize:'11px'}}>Let's connect</div>
            </div>
          </div>
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
