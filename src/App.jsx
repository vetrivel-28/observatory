import React, { useState, useEffect, useRef } from 'react';
import './index.css';

import Hero from './pages/Hero';
import Observatory from './pages/Observatory';
import Skills from './pages/Skills';
import Profiles from './pages/Profiles';
import Achievements from './pages/Achievements';
import Experience from './pages/Experience';
import Projects from './pages/Projects';

// --- Custom Cursor ---
function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows exactly
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };
    
    // Ring lerps toward mouse
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animate);
    };
    
    // Hover effect on clickable elements
    const onMouseEnter = () => {
      ring.style.width = '44px';
      ring.style.height = '44px';
      ring.style.borderColor = '#7c3aed';
      dot.style.background = '#7c3aed';
      // Scale corner brackets
      ring.querySelectorAll('.bracket').forEach(b => {
        b.style.borderColor = '#7c3aed';
      });
    };
    
    const onMouseLeave = () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = '#06b6d4';
      dot.style.background = '#06b6d4';
      ring.querySelectorAll('.bracket').forEach(b => {
        b.style.borderColor = '#06b6d4';
      });
    };
    
    // Click effect — data science fragment burst
    const onClick = (e) => {
      const fragments = ['0.87', 'fit()', 'SQL', 'df[]', '∑', 'μ', 'σ²', '→', 'ETL', 'NaN'];
      for (let i = 0; i < 6; i++) {
        const frag = document.createElement('div');
        frag.textContent = fragments[Math.floor(Math.random() * fragments.length)];
        const angle = (i / 6) * Math.PI * 2;
        const distance = 40 + Math.random() * 20;
        frag.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          color: #06b6d4;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition: all 0.8s ease-out;
          opacity: 1;
        `;
        document.body.appendChild(frag);
        requestAnimationFrame(() => {
          frag.style.transform = `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%)`;
          frag.style.opacity = '0';
        });
        setTimeout(() => frag.remove(), 900);
      }
      
      // Scan line
      const scan = document.createElement('div');
      scan.style.cssText = `
        position: fixed;
        left: 0; top: 0; width: 100%; height: 1px;
        background: rgba(255,255,255,0.35);
        z-index: 99998;
        pointer-events: none;
        transform: translateY(${e.clientY}px);
        transition: transform 0.2s linear, opacity 0.3s ease;
      `;
      document.body.appendChild(scan);
      requestAnimationFrame(() => {
        scan.style.transform = `translateY(${window.innerHeight}px)`;
        scan.style.opacity = '0';
      });
      setTimeout(() => scan.remove(), 400);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClick);
    
    const clickables = document.querySelectorAll('button, a, [role="button"], [onClick], [style*="cursor: pointer"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });
    
    const raf = requestAnimationFrame(animate);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Cursor dot — follows exactly */}
      <div
        id="cursor-dot"
        style={{
          position: 'fixed',
          width: '5px',
          height: '5px',
          background: '#06b6d4',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s',
        }}
      />

      {/* Cursor ring — crosshair with corner brackets, lerps behind */}
      <div
        id="cursor-ring"
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      >
        {/* Horizontal crosshair line */}
        <div style={{
          position: 'absolute', top: '50%', left: 0,
          width: '100%', height: '1px',
          background: '#06b6d4', transform: 'translateY(-50%)',
        }} />
        {/* Vertical crosshair line */}
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          height: '100%', width: '1px',
          background: '#06b6d4', transform: 'translateX(-50%)',
        }} />
        {/* 4 corner brackets */}
        {[
          { top: 0, left: 0, borderTop: '2px solid #06b6d4', borderLeft: '2px solid #06b6d4' },
          { top: 0, right: 0, borderTop: '2px solid #06b6d4', borderRight: '2px solid #06b6d4' },
          { bottom: 0, left: 0, borderBottom: '2px solid #06b6d4', borderLeft: '2px solid #06b6d4' },
          { bottom: 0, right: 0, borderBottom: '2px solid #06b6d4', borderRight: '2px solid #06b6d4' },
        ].map((style, i) => (
          <div key={i} className="bracket" style={{
            position: 'absolute', width: '8px', height: '8px',
            transition: 'border-color 0.2s', ...style,
          }} />
        ))}
      </div>
    </>
  );
}

// --- Star Field Canvas ---
function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      moving: Math.random() > 0.98,
      speed: Math.random() * 0.5 + 0.1
    }));

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        if (star.moving) {
          star.x -= star.speed;
          if (star.x < 0) star.x = width;
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas id="star-canvas" ref={canvasRef} />;
}

const SQL_QUERIES = {
  Home: "SELECT * FROM portfolio WHERE owner = 'vetrivel_a';",
  Observatory: "SELECT * FROM data_observatory WHERE status = 'active';",
  Projects: "SELECT name, accuracy, stack FROM projects WHERE deployed = true;",
  Skills: "SELECT skill, proficiency FROM skills WHERE domain = 'data_science';",
  Profiles: "SELECT platform, url FROM profiles WHERE status = 'connected';",
  Achievements: "SELECT title, award FROM hackathons ORDER BY year DESC;",
  Experience: "SELECT role, impact FROM experience WHERE type = 'internship';",
};

const ACCENT_COLORS = {
  Home: '#7c3aed',
  Observatory: '#06b6d4',
  Projects: '#7c3aed',
  Skills: '#06b6d4',
  Profiles: '#7c3aed',
  Achievements: '#f59e0b',
  Experience: '#f59e0b',
};

function TransitionOverlay({ isVisible, targetPage, progress }) {
  const [typedQuery, setTypedQuery] = useState('');
  const [showTables, setShowTables] = useState(false);
  
  const query = SQL_QUERIES[targetPage] || 
    `SELECT * FROM ${targetPage} WHERE active = true;`;
  const accent = ACCENT_COLORS[targetPage] || '#06b6d4';
  
  useEffect(() => {
    if (!isVisible) {
      setTypedQuery('');
      setShowTables(false);
      return;
    }
    
    // Show tables after 100ms
    setTimeout(() => setShowTables(true), 100);
    
    // Type the SQL query character by character
    let i = 0;
    setTypedQuery('');
    const typeInterval = setInterval(() => {
      if (i < query.length) {
        setTypedQuery(query.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 600 / query.length); // type full query in 600ms
    
    return () => clearInterval(typeInterval);
  }, [isVisible, query]);
  
  if (!isVisible) return null;
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#080c14',
      zIndex: 99990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      animation: 'transitionFadeIn 0.15s ease forwards',
    }}>
      
      {/* Database Schema Diagram */}
      {showTables && (
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          animation: 'schemaFadeIn 0.3s ease forwards',
        }}>
          
          {/* Table 1 */}
          <div style={{
            border: `1px solid ${accent}50`,
            borderRadius: '6px',
            overflow: 'hidden',
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            minWidth: '160px',
          }}>
            <div style={{
              background: `${accent}20`,
              borderBottom: `1px solid ${accent}40`,
              padding: '6px 12px',
              color: accent,
              letterSpacing: '0.1em',
            }}>
              {targetPage || 'data'}
            </div>
            {[
              'id  INT  PK',
              'name  VARCHAR',
              'status  BOOL',
              'created_at  TS',
            ].map((col, i) => (
              <div key={i} style={{
                padding: '4px 12px',
                color: i === 0 ? '#f59e0b' : '#94a3b8',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                animation: `rowSlide 0.2s ease forwards`,
                animationDelay: `${i * 60}ms`,
                opacity: 0,
              }}>
                {col}
              </div>
            ))}
          </div>

          {/* FK Relationship Line SVG */}
          <svg width="60" height="80" style={{ marginTop: '30px' }}>
            <line
              x1="0" y1="20" x2="60" y2="20"
              stroke={accent} strokeWidth="1"
              strokeDasharray="4 3"
              style={{ animation: 'drawLine 0.4s ease forwards' }}
            />
            <circle cx="0" cy="20" r="3" fill={accent} />
            <circle cx="60" cy="20" r="3" fill={accent} />
          </svg>

          {/* Table 2 */}
          <div style={{
            border: `1px solid rgba(124,58,237,0.4)`,
            borderRadius: '6px',
            overflow: 'hidden',
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            minWidth: '160px',
          }}>
            <div style={{
              background: 'rgba(124,58,237,0.15)',
              borderBottom: '1px solid rgba(124,58,237,0.3)',
              padding: '6px 12px',
              color: '#7c3aed',
              letterSpacing: '0.1em',
            }}>
              metadata
            </div>
            {[
              'ref_id  INT  FK',
              'key  VARCHAR',
              'value  TEXT',
              'updated_at  TS',
            ].map((col, i) => (
              <div key={i} style={{
                padding: '4px 12px',
                color: i === 0 ? '#f59e0b' : '#94a3b8',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                animation: `rowSlide 0.2s ease forwards`,
                animationDelay: `${(i + 4) * 60}ms`,
                opacity: 0,
              }}>
                {col}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SQL Query Typewriter */}
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '13px',
        color: '#64748b',
        maxWidth: '520px',
        textAlign: 'center',
        minHeight: '20px',
      }}>
        <span style={{ color: '#7c3aed' }}>{'> '}</span>
        <span style={{ color: '#94a3b8' }}>{typedQuery}</span>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '14px',
          background: accent,
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'blink 0.7s step-end infinite',
        }} />
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '320px',
        height: '2px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: `linear-gradient(90deg, #7c3aed, ${accent})`,
          borderRadius: '2px',
          transition: 'width 0.05s linear',
          boxShadow: `0 0 8px ${accent}80`,
        }} />
      </div>

      {/* Status label */}
      <div style={{
        color: accent,
        fontSize: '10px',
        fontFamily: 'Space Mono, monospace',
        letterSpacing: '0.2em',
      }}>
        LOADING {(targetPage || 'page').toUpperCase().replace('_', ' ')}...
      </div>

    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');
  const [transitionProgress, setTransitionProgress] = useState(0);

  const navigate = (page) => {
    if (isTransitioning || page === currentPage) return;
    
    setTransitionTarget(page);
    setIsTransitioning(true);
    setTransitionProgress(0);
    
    // Animate progress bar 0 to 100 over 1000ms
    const startTime = Date.now();
    const duration = 1000;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setTransitionProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
    
    // Change page at 600ms (midpoint)
    setTimeout(() => setCurrentPage(page), 600);
    
    // Hide overlay at 1200ms
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionProgress(0);
    }, 1200);
  };

  return (
    <>
      <CustomCursor />
      <StarCanvas />
      
      <TransitionOverlay
        isVisible={isTransitioning}
        targetPage={transitionTarget}
        progress={transitionProgress}
      />
      
      {currentPage === 'Home' && <Hero navigate={navigate} />}
      {currentPage === 'Observatory' && <Observatory navigate={navigate} />}
      {currentPage === 'Skills' && <Skills navigate={navigate} />}
      {currentPage === 'Profiles' && <Profiles navigate={navigate} />}
      {currentPage === 'Achievements' && <Achievements navigate={navigate} />}
      {currentPage === 'Experience' && <Experience navigate={navigate} />}
      {currentPage === 'Projects' && <Projects navigate={navigate} />}
    </>
  );
}
